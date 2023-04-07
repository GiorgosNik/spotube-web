import * as React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { theme } from "../theme";
import { DropdownMenu } from "./DropdownMenu";
import { StyledTextField } from "../styledComponents/StyledTextField";
import { StyledArrowIconButton } from "../styledComponents/StyledArrowIconButton";

import {
  Button,
  CssBaseline,
  Stack,
  Box,
  Container,
  Collapse,
  ThemeProvider,
} from "@mui/material";

function validateLinkFormat(str) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return pattern.test(str);
}

export default function DownloadInput(props) {
  var [checked, setChecked] = React.useState(false);
  var [playlist_link, setPlaylistLink] = React.useState("");
  var [inputErrorMessage, setInputErrorMessage] = React.useState("");

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
      return true;
    }
  };

  const sendDownloadRequest = () => {
    if (validateURL()) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playlist_link: playlist_link,
          user_id: props.uniqueUserID,
        }),
      };
      console.log("Request...");
      console.log(requestOptions.body);
      fetch("https://jsonplaceholder.typicode.com/posts", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.id === 101) {
            console.log("Response...");
            console.log(data);
            props.setDownloadActive(true);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <StyledTextField
          error={!(inputErrorMessage === "")}
          inputProps={{ spellCheck: "false" }}
          helperText={inputErrorMessage}
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
    </ThemeProvider>
  );
}
