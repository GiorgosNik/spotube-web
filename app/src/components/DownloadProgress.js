import * as React from "react";
import { theme } from "../theme";
import LoadingCircle from "./LoadingCircle";
import ProgressBar from "./ProgressBar";
import { mountedStyle, unmountedStyle } from "../animations.js";
import { fetchStatus } from "../requests/api";

import {
  Button,
  CssBaseline,
  Stack,
  Box,
  Container,
  ThemeProvider,
} from "@mui/material";

export default function DownloadProgress(props) {
  let [downloadStarted, setDownloadStarted] = React.useState(false);

  const handleCancelClick = () => {
    props.setDownloadActive(false);
  };

  const handleStartDownload = () => {
    setDownloadStarted(true);
    setProgress(0);
  };

  const [progress, setProgress] = React.useState(0);

  const  getDownloadStatus  = async () => {
    const response = await fetchStatus(props.uniqueUserID);
    console.log(response);
          // setDownloadStarted(true);
          // setProgress(data.status);
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      getDownloadStatus();
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <Box
          sx={{
            height: "120px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {downloadStarted === false && (
            <div style={downloadStarted ? unmountedStyle : mountedStyle}>
              <LoadingCircle />
            </div>
          )}
          {downloadStarted && (
            <div style={downloadStarted ? mountedStyle : unmountedStyle}>
              <ProgressBar progress={progress} />
            </div>
          )}
        </Box>
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
