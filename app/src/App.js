import * as React from "react";
import { theme } from "./theme";
import DownloadInput from "./components/DownloadInput";
import DownloadProgress from "./components/DownloadProgress";
import { v4 as uuid } from "uuid";
import { mountedStyle, unmountedStyle } from "./animations.js";
import { Typewriter } from "react-simple-typewriter";

import {
  CssBaseline,
  Box,
  Typography,
  Container,
  ThemeProvider,
} from "@mui/material";

export default function DownloadPage() {
  const [uniqueUserID] = React.useState(uuid());
  let [downloadActive, setDownloadActive] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CssBaseline backgroundColor="#2c2b30" />
      <main>
        <Box
          sx={{
            backgroundColor: "#2c2b30",
            backgroundImage: `radial-gradient(at -120% -1000%, #d6d6d6 10%, #2c2b30 90%)`,
            pt: 3,
            minHeight: "100vh",
          }}
        >
          <Container maxWidth="sm">
            <Box
              sx={{
                color: theme.palette.secondary.main,
                fontSize: "4em",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              <Typewriter
                words={["Spotube"]}
                cursor
                cursorStyle="_"
                typeSpeed={100}
                delaySpeed={1000}
                margin= 'auto 0'

              />
            </Box>
            <Typography
              variant="h5"
              align="center"
              color="primary.contrastText"
              paragraph
            >
              The Spotify Downloader
            </Typography>
            {downloadActive === false && (
              <div style={downloadActive ? unmountedStyle : mountedStyle}>
                <DownloadInput
                  setDownloadActive={setDownloadActive}
                  uniqueUserID={uniqueUserID}
                />
              </div>
            )}
            {downloadActive === true && (
              <div style={downloadActive ? mountedStyle : unmountedStyle}>
                <DownloadProgress
                  setDownloadActive={setDownloadActive}
                  uniqueUserID={uniqueUserID}
                />
              </div>
            )}
          </Container>
        </Box>

        <Container maxWidth="md"></Container>
      </main>
    </ThemeProvider>
  );
}
