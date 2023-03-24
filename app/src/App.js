import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import MusicVideoIcon from "@mui/icons-material/MusicVideo";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Spotube
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

let playlist_link = "Test"

function set_playlist_link(url){
  playlist_link = url
}

export default function Album() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar style={{ background: "#181818" }}>
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
            backgroundColor: "#000000",
            backgroundImage: `linear-gradient(160deg, #000000 0%, #166D3B 100%)`,
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="#f8f4f4"
              gutterBottom
            >
              Spotube
            </Typography>
            <Typography variant="h5" align="center" color="#f8f4f4" paragraph>
              The main message.
            </Typography>
            <TextField
              label="Link To Playlist"
              variant="outlined"
              onChange={(e) => set_playlist_link(e.target.value)}
              fullWidth
              autoComplete="off"
              inputProps={{ style: { fontSize: 15 } }}
              InputLabelProps={{ style: { fontSize: 15, color: "GrayText" } }}
            />
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button style={{ background: "#181818" }} variant="contained">
                Main call to action
              </Button>
              <Button variant="outlined">Secondary action</Button>
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
