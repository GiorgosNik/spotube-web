import * as React from "react";
import MusicVideoIcon from "@mui/icons-material/MusicVideo";
import { theme } from "./theme";
import DownloadInput from "./components/DownloadInput";
import DownloadProgress from "./components/DownloadProgress";
import { v4 as uuid } from "uuid";
import { mountedStyle, unmountedStyle } from "./animations.js";

import {
  AppBar,
  CssBaseline,
  Box,
  Toolbar,
  Typography,
  Container,
  ThemeProvider,
} from "@mui/material";

export default function DownloadPage() {
  const [uniqueUserID] = React.useState(uuid());
  var [downloadActive, setDownloadActive] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar style={{ background: "#2c2b30", height: "6vh" }}>
          <MusicVideoIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Spotube
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Box
          sx={{
            backgroundColor: "#2c2b30",
            backgroundImage: `radial-gradient(at -120% -1000%, #d6d6d6 10%, #2c2b30 90%)`,
            pt: 8,
            height: "93.2vh",
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="secondary"
              gutterBottom
            >
              Spotube
            </Typography>

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
