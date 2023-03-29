import * as React from "react";
import MusicVideoIcon from "@mui/icons-material/MusicVideo";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { theme } from "./theme";
import { DropdownMenu } from "./components/dropdown_menu";
import { StyledTextField } from "./components/styled_text_field";

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

let playlist_link = "";

function set_playlist_link(url) {
  playlist_link = url;
}

export default function DownloadPage() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
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

            <StyledTextField
              label="Link To Playlist"
              variant="outlined"
              onChange={(e) => set_playlist_link(e.target.value)}
              fullWidth
              autoComplete="off"
              InputProps={{ style: { color: "white" } }}
            />

            <Stack direction="column" spacing={2} justifyContent="center">
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button color="dark_button" variant="contained">
                  Download Playlist
                </Button>

                <Button color="light_button" variant="outlined">
                  Validate Playlist
                </Button>
                <StyledArrowIconButton onClick={handleChange}>
                  <KeyboardArrowDownIcon />
                </StyledArrowIconButton>
              </Stack>

              <Container>
                <Collapse in={checked}>{DropdownMenu}</Collapse>
              </Container>
            </Stack>
          </Container>
        </Box>

        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
        </Container>
      </main>
    </ThemeProvider>
  );
}
