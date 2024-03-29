import * as React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { theme } from "../theme";
import DropdownMenu from "./DropdownMenu";
import { StyledTextField } from "../styledComponents/StyledTextField";
import { StyledArrowIconButton } from "../styledComponents/StyledArrowIconButton";
import { validateLinkFormat } from "../utils/urlValidator";
import { downloadRequest } from "../requests/api";
import PropTypes from "prop-types";

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
  DownloadInput.propTypes = {
    uniqueUserID: PropTypes.string.isRequired,
    setDownloadActive: PropTypes.func.isRequired,
  };

  let [checked, setChecked] = React.useState(false);
  let [playlist_link, setPlaylistLink] = React.useState("");
  let [inputErrorMessage, setInputErrorMessage] = React.useState("");
  let [downloadLyrics, setDownloadLyrics] = React.useState(true);
  let [normalizeAudio, setNormalizeAudio] = React.useState(false);

  const handleArrowButtonClick = () => {
    setChecked((prev) => !prev);
  };

  const validateURL = () => {
    if (playlist_link.trim() === "") {
      setInputErrorMessage("The playlist URL cannot be empty");
      return false;
    } else if (!validateLinkFormat(playlist_link)) {
      setInputErrorMessage("Invalid URL");
      return false;
    } else {
      setInputErrorMessage("");
      return true;
    }
  };

  const sendDownloadRequest = async () => {
    if (validateURL()) {
      try {
        await downloadRequest(playlist_link, props.uniqueUserID, downloadLyrics, normalizeAudio);
        props.setDownloadActive(true);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <StyledTextField
          error={inputErrorMessage !== ""}
          inputProps={{ spellCheck: "false" }}
          helperText={inputErrorMessage}
          label="Link To Playlist"
          variant="outlined"
          onChange={(e) => {
            setPlaylistLink(e.target.value);
            setInputErrorMessage("");
          }}
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
            <Collapse in={checked}>
              <DropdownMenu
                setDownloadLyrics={setDownloadLyrics}
                downloadLyrics={downloadLyrics}
                setNormalizeAudio={setNormalizeAudio}
                normalizeAudio={normalizeAudio}
              />
            </Collapse>
          </Container>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
