import * as React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { theme } from "../theme";
import { DropdownMenu } from "./DropdownMenu";
import { StyledTextField } from "./StyledTextField";
import { StyledArrowIconButton } from "./StyledArrowIconButton";

import {
  Button,
  CssBaseline,
  Stack,
  Box,
  Container,
  Collapse,
  ThemeProvider,
} from "@mui/material";

export default function DownloadInput(props) {
  var [checked, setChecked] = React.useState(false);
  var [playlist_link, setPlaylistLink] = React.useState("");
  var [downloadActive] = React.useState(false);

  const handleArrowButtonClick = () => {
    setChecked((prev) => !prev);
  };

  const sendDownloadRequest = () => {
    props.setDownloadActive(true);
    props.handleDownloadStart(playlist_link);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {downloadActive === false ? (
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
                onClick={sendDownloadRequest}
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
    </ThemeProvider>
  );
}
