import {
    Switch,
    styled,
    alpha,
  } from "@mui/material";


const StyledSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: theme.palette.secondary.light,
      '&:hover': {
        backgroundColor: alpha(theme.palette.secondary.light, theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: theme.palette.secondary.main,
    },
  }));

export { StyledSwitch };
