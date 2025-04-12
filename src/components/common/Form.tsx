import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import type { FormProps } from "interfaces/common";
import CustomButton from "./CustomButton";

const Form = ({
  type,
  register,
  handleSubmit,
  handleImageChange,
  formLoading,
  onFinishHandler,
  propertyImage,
}: FormProps) => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        {type} a Property
      </Typography>

      <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#fcfcfc">
        <form
          style={{
            marginTop: "20px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
          onSubmit={handleSubmit(onFinishHandler)}
        >
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d", // Ensure form helper text is visible
              }}
            >
              Enter property name
            </FormHelperText>
            <TextField
              fullWidth
              required
              id="outlined-basic"
              variant="outlined"
              {...register("title", { required: true })}
              sx={{
                backgroundColor: "#fff", // White background for visibility
                color: "#11142d",        // Dark text color for input text
                "& .MuiInputBase-root": {
                  borderColor: "#11142d", // Dark border for contrast
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#11142d", // Border color of the input field
                },
                "& .MuiInputLabel-root": {
                  color: "#11142d", // Label color
                },
              }}
            />
          </FormControl>
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d", // Ensure form helper text is visible
              }}
            >
              Enter Description
            </FormHelperText>
            <TextareaAutosize
              minRows={5}
              required
              placeholder="Write description"
              style={{
                width: "100%",
                background: "#fff",    // Ensure background is white
                fontSize: "16px",
                borderColor: "#11142d", // Dark border for contrast
                borderRadius: 6,
                padding: 10,
                color: "#11142d",       // Dark text color
              }}
              {...register("description", { required: true })}
            />
          </FormControl>

          <Stack direction="row" gap={4}>
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0",
                  fontSize: 16,
                  color: "#11142d", // Ensure form helper text is visible
                }}
              >
                Select Property Type
              </FormHelperText>
              <Select
                variant="outlined"
                color="primary"
                displayEmpty
                required
                defaultValue="apartment"
                {...register("propertyType", {
                  required: true,
                })}
                sx={{
                  backgroundColor: "#fff", // White background for visibility
                  color: "#11142d",        // Dark text color
                  borderColor: "#11142d",  // Dark border for contrast
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#11142d", // Border color of the select field
                  },
                  "& .MuiInputLabel-root": {
                    color: "#11142d", // Label color
                  },
                }}
              >
                <MenuItem value="apartment">Apartment</MenuItem>
                <MenuItem value="villa">Villa</MenuItem>
                <MenuItem value="farmhouse">Farmhouse</MenuItem>
                <MenuItem value="condos">Condos</MenuItem>
                <MenuItem value="townhouse">Townhouse</MenuItem>
                <MenuItem value="duplex">Duplex</MenuItem>
                <MenuItem value="studio">Studio</MenuItem>
                <MenuItem value="chalet">Chalet</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0",
                  fontSize: 16,
                  color: "#11142d", // Ensure form helper text is visible
                }}
              >
                Enter property price
              </FormHelperText>
              <TextField
                fullWidth
                required
                id="outlined-basic"
                color="primary"
                type="number"
                variant="outlined"
                {...register("price", { required: true })}
                sx={{
                  backgroundColor: "#fff", // White background for visibility
                  color: "#11142d",        // Dark text color for input text
                  "& .MuiInputBase-root": {
                    borderColor: "#11142d", // Dark border for contrast
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#11142d", // Border color of the input field
                  },
                  "& .MuiInputLabel-root": {
                    color: "#11142d", // Label color
                  },
                }}
              />
            </FormControl>
          </Stack>

          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d", // Ensure form helper text is visible
              }}
            >
              Enter Location
            </FormHelperText>
            <TextField
              fullWidth
              required
              id="outlined-basic"
              color="primary"
              variant="outlined"
              {...register("location", { required: true })}
              sx={{
                backgroundColor: "#fff", // White background for visibility
                color: "#11142d",        // Dark text color for input text
                "& .MuiInputBase-root": {
                  borderColor: "#11142d", // Dark border for contrast
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#11142d", // Border color of the input field
                },
                "& .MuiInputLabel-root": {
                  color: "#11142d", // Label color
                },
              }}
            />
          </FormControl>

          <Stack direction="column" gap={1} justifyContent="center" mb={2}>
            <Stack direction="row" gap={2}>
              <Typography
                color="#11142d"
                fontSize={16}
                fontWeight={500}
                my="10px"
              >
                Property Photo
              </Typography>

              <Button
                component="label"
                sx={{
                  width: "fit-content",
                  color: "#2ed480",
                  textTransform: "capitalize",
                  fontSize: 16,
                }}
              >
                Upload *
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleImageChange(e.target.files![0]);
                  }}
                />
              </Button>
            </Stack>
            <Typography
              fontSize={14}
              color="#808191"
              sx={{ wordBreak: "break-all" }}
            >
              {propertyImage?.name}
            </Typography>
          </Stack>

          <CustomButton
            type="submit"
            title={formLoading ? "Submitting..." : "Submit"}
            backgroundColor="#475be8"
            color="#fcfcfc"
          />
        </form>
      </Box>
    </Box>
  );
};

export default Form;
