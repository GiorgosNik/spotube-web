import { theme } from "../theme";
import { TextField, styled } from "@mui/material";

const StyledTextField = styled(TextField)({
  "& label": {
    color: theme.palette.primary.light,
  },
  "& InputProps": {
    style: { color: theme.palette.primary.light },
  },
  "& label.Mui-focused": {
    color: theme.palette.secondary.main,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: theme.palette.primary.light,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.primary.light,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.secondary.main,
    },'&:hover fieldset': {
      borderColor: theme.palette.secondary.main,
    },
  },
});

export { StyledTextField };
