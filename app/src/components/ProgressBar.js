import * as React from "react";
import { StyledBorderProgressBar } from "../styledComponents/StyledBorderProgressBar";
import PropTypes from "prop-types";

import { Typography, Stack, Box } from "@mui/material";

function convertHMS(value) {
  const sec = parseInt(value, 10);
  let hours = Math.floor(sec / 3600);
  let minutes = Math.floor((sec - hours * 3600) / 60);
  let seconds = sec - hours * 3600 - minutes * 60;
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
}

export default function ProgressBar(props) {
  return (
    <Stack direction="column" spacing={2} justifyContent="center">
      <StyledBorderProgressBar variant="determinate" value={props.progress} />
      {props.progress === 0 && (
        <Typography align="center" color="primary.contrastText" paragraph>
          Downloading Playlist...
        </Typography>
      )}
      {props.progress !== 0 && (
        <Box>
          <Typography align="center" color="primary.contrastText" paragraph>
            {props.progress.toFixed(2)}% Complete. {convertHMS(props.eta)}{" "}
            Seconds Remaining
          </Typography>
          <Typography align="center" color="primary.contrastText" paragraph>
            {props.succeeded} Songs Downloaded | {props.failed} Songs Failed |{" "}
            {props.total - (props.succeeded + props.failed)} Songs Remaining
          </Typography>
        </Box>
      )}
      {props.total === process.env.SONG_NUMBER_LIMIT && (
        <Box>
          <Typography align="center" color="primary.contrastText" paragraph>
            The downloader is limited to {process.env.SONG_NUMBER_LIMIT} songs per playlist.
          </Typography>
        </Box>
      )}
    </Stack>
  );
}

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  succeeded: PropTypes.number.isRequired,
  failed: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  eta: PropTypes.string.isRequired,
};
