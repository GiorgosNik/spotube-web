import * as React from "react";
import { theme } from "../theme";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";

import { Box, Typography, Stack } from "@mui/material";

export default function LoadingCircle(props) {
  const size = 100;

  return (
    <Stack direction="column" spacing={2} justifyContent="center">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ position: "relative" }}>
          <CircularProgress
            variant="determinate"
            sx={{
              color: theme.palette.primary.light,
            }}
            size={size}
            thickness={0}
            {...props}
            value={100}
          />
          <CircularProgress
            variant="indeterminate"
            disableShrink
            sx={{
              color: theme.palette.secondary.main,
              animationDuration: "1050ms",
              position: "absolute",
              left: 0,
              [`& .${circularProgressClasses.circle}`]: {
                strokeLinecap: "round",
              },
            }}
            size={size}
            thickness={4}
            {...props}
          />
        </Box>
      </div>
      <Typography align="center" color="primary.contrastText" paragraph>
        Waiting for download to start...
      </Typography>
    </Stack>
  );
}
