import { Box, Container, Typography, Paper } from "@mui/material";
import { SignIn } from "@clerk/clerk-react";
import { yariga } from "../assets";

export const Login: React.FC = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #dfe9f3, #ffffff)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 420,
          width: "100%",
          padding: 4,
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box mb={2}>
          <img
            src={yariga}
            alt="Yariga Logo"
            style={{
              width: "60px",
              height: "auto",
            }}
          />
        </Box>

        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: "#111", textAlign: "center" }}
        >
          Welcome Back!
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#666", mb: 3, textAlign: "center" }}
        >
          Please sign in to continue
        </Typography>

        <SignIn
          redirectUrl="/"
          appearance={{
            elements: {
              card: {
                boxShadow: "none",
                border: "none",
                width: "100%",
              },
              formButtonPrimary: {
                backgroundColor: "#475be8",
                color: "#fff",
                borderRadius: "8px",
                fontWeight: "600",
                padding: "12px",
                "&:hover": {
                  backgroundColor: "#1e3fbe",
                },
              },
              formFieldInput: {
                borderRadius: "8px",
                padding: "10px 14px",
                border: "1px solid #ccc",
              },
              formFieldLabel: {
                fontWeight: "500",
              },
              headerTitle: {
                display: "none", // hide Clerk's default header title
              },
              footer: {
                display: "none", // optional: hide Clerk branding
              },
            },
          }}
        />
      </Paper>
    </Box>
  );
};
