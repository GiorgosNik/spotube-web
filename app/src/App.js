import * as React from "react";
import MusicVideoIcon from "@mui/icons-material/MusicVideo";
import { theme } from "./theme";
import DownloadInput from "./components/DownloadInput";
import { v4 as uuid } from "uuid";

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
  // var [playlist_link, setPlaylistLink] = React.useState("");
  const [uniqueUserID] = React.useState(uuid());
  var [downloadActive, setDownloadActive] = React.useState(false);

  function handleDownloadStart(playlistLink) {
    console.log(uniqueUserID);
    console.log(playlistLink);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar style={{ background: "#2c2b30" }}>
          <MusicVideoIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Spotube
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            backgroundColor: "#2c2b30",
            backgroundImage: `radial-gradient(at -120% -1000%, #d6d6d6 10%, #2c2b30 90%)`,
            pt: 8,
            pb: "100%",
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

            {downloadActive === false ? (
              <DownloadInput
                setDownloadActive={setDownloadActive}
                handleDownloadStart={handleDownloadStart}
              />
            ) : null}
          </Container>
        </Box>

        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
        </Container>
      </main>
    </ThemeProvider>
  );
}
