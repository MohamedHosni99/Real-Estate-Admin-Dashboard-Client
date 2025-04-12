import { useEffect, useMemo, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import ChatBubbleOutline from "@mui/icons-material/ChatBubbleOutline";
import PeopleAltOutlined from "@mui/icons-material/PeopleAltOutlined";
import StarOutlineRounded from "@mui/icons-material/StarOutlineRounded";
import VillaOutlined from "@mui/icons-material/VillaOutlined";

import {
  Refine,
  ReadyPage,
  type LegacyAuthProvider as AuthProvider,
} from "@refinedev/core";
import {
  ErrorComponent,
  useNotificationProvider,
  RefineSnackbarProvider,
} from "@refinedev/mui";

import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";
import axios from "axios";

import { useUser, useClerk } from "@clerk/clerk-react";
import { Header, Layout, Sider, Title } from "components/layout";
import { ColorModeContextProvider } from "contexts";

import {
  AgentProfile,
  Agents,
  AllProperties,
  CreateProperty,
  EditProperty,
  Home,
  Login,
  MyProfile,
  PropertyDetails,
} from "pages";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

function App() {
  const { user, isSignedIn, isLoaded } = useUser();
  const { signOut, session } = useClerk();
  const [authChecked, setAuthChecked] = useState(false);

  // Sync authentication state with local storage
  useEffect(() => {
    const handleAuthSync = async () => {
      if (!isLoaded) return;

      if (isSignedIn && user && session) {
        try {
          const token = await session.getToken();
          if (!token) {
            throw new Error("No session token available");
          }

          // Check if user data needs update
          const existingUser = localStorage.getItem("user");
          const currentUser = existingUser ? JSON.parse(existingUser) : null;
          
          if (!currentUser?.userid) {
            const response = await axios.post(
              `${process.env.REACT_APP_API_URL}/api/v1/users`,
              {
                name: user.fullName,
                email: user.primaryEmailAddress?.emailAddress,
                avatar: user.imageUrl,
                externalId: user.id,
              }
            );

            localStorage.setItem(
              "user",
              JSON.stringify({
                name: user.fullName,
                email: user.primaryEmailAddress?.emailAddress,
                avatar: user.imageUrl,
                userid: response.data._id,
              })
            );
          }

          localStorage.setItem("token", token);
          setAuthChecked(true);
        } catch (error) {
          console.error("Authentication sync failed:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setAuthChecked(true);
        }
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setAuthChecked(true);
      }
    };

    handleAuthSync();
  }, [isSignedIn, user, session, isLoaded]);

  const authProvider = useMemo<AuthProvider>(() => ({
    login: async () => Promise.resolve(),
    logout: async () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      await signOut();
      return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: async () => {
      const token = localStorage.getItem("token");
      return token && isSignedIn ? Promise.resolve() : Promise.reject();
    },
    getPermissions: async () => null,
    getUserIdentity: async () => {
      const userData = localStorage.getItem("user");
      if (userData) return Promise.resolve(JSON.parse(userData));
      return Promise.reject("No user found");
    },
  }), [isSignedIn, signOut]);

  if (!isLoaded || !authChecked) {
    return <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '24px'
    }}>Loading...</div>;
  }

  if (!isSignedIn) {
    return <Login />;
  }

  return (
    <ColorModeContextProvider>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <Refine
          dataProvider={dataProvider(`${process.env.REACT_APP_API_URL}/api/v1`)}
          notificationProvider={useNotificationProvider}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          resources={[
            {
              name: "properties",
              list: AllProperties,
              show: PropertyDetails,
              create: CreateProperty,
              edit: EditProperty,
              icon: <VillaOutlined />,
            },
            {
              name: "agents",
              list: Agents,
              show: AgentProfile,
              icon: <PeopleAltOutlined />,
            },
            {
              name: "reviews",
              list: Home,
              icon: <StarOutlineRounded />,
            },
            {
              name: "messages",
              list: Home,
              icon: <ChatBubbleOutline />,
            },
            {
              name: "my-profile",
              options: { label: "My Profile " },
              list: MyProfile,
              icon: <AccountCircleOutlined />,
            },
          ]}
          Title={Title}
          Sider={Sider}
          Layout={Layout}
          Header={Header}
          legacyRouterProvider={routerProvider}
          legacyAuthProvider={authProvider}
          LoginPage={Login}
          DashboardPage={Home}
        />
      </RefineSnackbarProvider>
    </ColorModeContextProvider>
  );
}

export default App;
