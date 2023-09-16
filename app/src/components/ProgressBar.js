import * as React from "react";
import { StyledBorderProgressBar } from "../styledComponents/StyledBorderProgressBar";

import {Typography, Stack } from "@mui/material";

export default function ProgressBar(props) {
  return (
    <Stack direction="column" spacing={2} justifyContent="center">
      <StyledBorderProgressBar variant="determinate" value={props.progress} />
      <Typography align="center" color="primary.contrastText" paragraph>
        Downloading Playlist...
      </Typography>
    </Stack>
  );
}
