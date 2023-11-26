import * as React from "react";
import { theme } from "../theme";
import LoadingCircle from "./LoadingCircle";
import ProgressBar from "./ProgressBar";
import { mountedStyle, unmountedStyle } from "../animations.js";
import { fetchStatus, fetchArchive } from "../requests/api";
import PropTypes from "prop-types";

import {
  Button,
  CssBaseline,
  Stack,
  Box,
  Container,
  ThemeProvider,
} from "@mui/material";

export default function DownloadProgress(props) {
  DownloadProgress.propTypes = {
    uniqueUserID: PropTypes.string.isRequired,
    setDownloadActive: PropTypes.func.isRequired,
  };

  let [downloadStarted, setDownloadStarted] = React.useState(false);

  const handleCancelClick = () => {
    props.setDownloadActive(false);
  };

  const handleDownloadArchive = async () => {
    window.open(`${process.env.REACT_APP_API_BASE_URL}/songs/${props.uniqueUserID}`, "_blank");
  };

  const [progress, setProgress] = React.useState(0);

  const getDownloadStatus = async () => {
    if (progress !== 100) {
      const response = await fetchStatus(props.uniqueUserID);
      setDownloadStarted(true);
      setProgress(response.data["progressPercentage"]);
    }
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
              onClick={handleDownloadArchive}
            >
              Download Archive
            </Button>
          </Stack>
          <Container></Container>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
