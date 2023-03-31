import * as React from "react";
import MusicVideoIcon from "@mui/icons-material/MusicVideo";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { theme } from "./theme";
import { DropdownMenu } from "./components/dropdown_menu";
import { StyledTextField } from "./components/styled_text_field";
import { v4 as uuid } from "uuid";

import {
  AppBar,
  Button,
  CssBaseline,
  Stack,
  Box,
  Toolbar,
  Typography,
  Container,
  IconButton,
  Collapse,
  styled,
  ThemeProvider,
} from "@mui/material";

const StyledArrowIconButton = styled(IconButton)({
  color: theme.palette.secondary.light,
  "&:hover": {
    color: theme.palette.secondary.main,
  },
});

export default function DownloadPage() {
  var [checked, setChecked] = React.useState(false);
  var [playlist_link, setPlaylistLink] = React.useState("");
  const [unique_user_id] = React.useState(uuid());
  var [download_active, setDownloadActive] = React.useState(false);

  const handleArrowButtonClick = () => {
    setChecked((prev) => !prev);
  };

  const send_download_request = () => {
    setDownloadActive(true);
    console.log(download_active);
    console.log(playlist_link);
    console.log(unique_user_id);
  };

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

            {download_active == false ? (
              <Box>
                <StyledTextField
                  label="Link To Playlist"
                  variant="outlined"
                  onChange={(e) => setPlaylistLink(e.target.value)}
                  fullWidth
                  autoComplete="off"
                  InputProps={{ style: { color: theme.palette.primary.light } }}
                />

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
                      onClick={send_download_request}
                    >
                      Download Playlist
                    </Button>

                    <Button color="light_button" variant="outlined">
                      Validate Playlist
                    </Button>
                    <StyledArrowIconButton onClick={handleArrowButtonClick}>
                      <KeyboardArrowDownIcon />
                    </StyledArrowIconButton>
                  </Stack>

                  <Container>
                    <Collapse in={checked}>{DropdownMenu}</Collapse>
                  </Container>
                </Stack>
              </Box>
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
