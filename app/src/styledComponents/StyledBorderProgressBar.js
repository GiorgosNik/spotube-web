import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const StyledBorderProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  marginTop:"3em",
  marginBottom:"2em",
  width: "100%",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.primary.light,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.secondary.main,
  },
}));

export { StyledBorderProgressBar };