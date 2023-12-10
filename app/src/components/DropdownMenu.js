import * as React from "react";
import { theme } from "../theme";
import { StyledSwitch } from "../styledComponents/StyledSwitch";
import PropTypes from 'prop-types'

import {
  FormControlLabel,
  FormGroup,
  Box,
  Container,
  styled,
  ThemeProvider,
} from "@mui/material";

export default function DropdownMenu(props) {
  DropdownMenu.propTypes = {
    downloadLyrics: PropTypes.bool.isRequired,
    setDownloadLyrics: PropTypes.func.isRequired,
    normalizeAudio: PropTypes.bool.isRequired,
    setNormalizeAudio: PropTypes.func.isRequired,
  };

  const handleDownloadLyricsSwitch = () => {
    props.setDownloadLyrics(!props.downloadLyrics);
  };

  const handleNormalizeAudioSwitch = () => {
    props.setNormalizeAudio(!props.normalizeAudio);
  };

  const StyledFormControlLabel = styled(FormControlLabel)({
    color: theme.palette.secondary.main,
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          border: 1,
          backgroundColor: "primary.dark",
          borderColor: "secondary.main",
          borderRadius: 1.5,
        }}
      >
        <Container maxWidth="lg">
          <FormGroup>
            <StyledFormControlLabel
              control={
                <StyledSwitch
                  checked={props.downloadLyrics}
                  onChange={() => {
                    handleDownloadLyricsSwitch();
                  }}
                />
              }
              label="Download Lyrics"
            />
            <StyledFormControlLabel
              control={
                <StyledSwitch
                  checked={props.normalizeAudio}
                  onChange={() => handleNormalizeAudioSwitch()}
                />
              }
              label="Normalize Audio"
            />
          </FormGroup>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
