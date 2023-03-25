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
import TextField from "@mui/material/TextField";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@mui/material/Collapse";

import { styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#d6d6d6",
      main: "#2c2b30",
      dark: "#181818",
      contrastText: "#f8f4f4",
    },
    secondary: {
      light: "#f8f4f4",
      main: "#f58f7c",
    },
    dark_button: {
      light: "#d6d6d6",
      main: "#181818",
      dark: "#2c2b30",
      contrastText: "#f58f7c",
    },
    light_button: {
      main: "#f58f7c",
    },
  },
});

const StyledTextField = styled(TextField)({
  "& label": {
    color: "white",
  },
  "& InputProps": {
    style: { color: "white" },
  },
  "& label.Mui-focused": {
    color: theme.palette.secondary.main,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.secondary.main,
    },
  },
});

const dropdown_menu = (
  <Box
    component="svg"
    sx={{ width: 100, height: 100, backgroundColor: "red" }}
  ></Box>
);

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

export default function Album() {
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
            pb: 100,
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
            <Box
              sx={{
                "& > :not(style)": {
                  display: "flex",
                  justifyContent: "space-around",
                  height: 120,
                  width: 250,
                },
              }}
            >
              <div>
                <Collapse in={checked}>{dropdown_menu}</Collapse>
              </div>
            </Box>
          </Container>
        </Box>

        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
        </Container>
      </main>
    </ThemeProvider>
  );
}
