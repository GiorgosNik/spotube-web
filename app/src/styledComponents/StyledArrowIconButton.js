import {styled, IconButton  } from "@mui/material";

const StyledArrowIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.secondary.light,
  "&:hover": {
    color: theme.palette.secondary.main,
  },
}));

export { StyledArrowIconButton };
