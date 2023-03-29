import { theme } from "../theme";
import { TextField, styled } from "@mui/material";

const StyledTextField = styled(TextField)({
  "& label": {
    color: "white",
  },
  "& InputProps": {
    style: { color: "white" },
  },
  "& label.Mui-focused": {
    color: theme.palette.secondary.main,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.secondary.main,
    },
  },
});

export { StyledTextField };
