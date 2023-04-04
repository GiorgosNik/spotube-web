import * as React from "react";
import { theme } from "../theme";
import { StyledBorderProgressBar } from "../styledComponents/StyledBorderProgressBar";
import StyledLoadingCircle from "./LoadingCircleComponent";

import {
  Button,
  CssBaseline,
  Stack,
  Box,
  Container,
  ThemeProvider,
} from "@mui/material";

export default function DownloadProgress(props) {
  var [downloadStarted, setDownloadStarted] = React.useState(false);

  const handleCancelClick = () => {
    props.setDownloadActive(false);
  };

  const handleStartDownload = () => {
    setDownloadStarted(true);
    setProgress(0);
  };

  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 10 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        {downloadStarted === false ? <StyledLoadingCircle /> : null}
        {downloadStarted === true ? (
          <StyledBorderProgressBar variant="determinate" value={progress} />
        ) : null}
        <Stack direction="column" spacing={2} justifyContent="center">
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button
              color="dark_button"
              variant="contained"
              onClick={handleCancelClick}
            >
              Cancel Download
            </Button>
            <Button
              color="light_button"
              variant="outlined"
              onClick={handleStartDownload}
            >
              [DEBUG] Start Download
            </Button>
          </Stack>
          <Container></Container>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
