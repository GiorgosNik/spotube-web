import * as React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { theme } from "../theme";
import { DropdownMenu } from "./DropdownMenu";
import { StyledArrowIconButton } from "../styledComponents/StyledArrowIconButton";
import { StyledBorderProgressBar } from "../styledComponents/StyledBorderProgressBar";

import {
  Button,
  CssBaseline,
  Stack,
  Box,
  Container,
  Collapse,
  ThemeProvider,
} from "@mui/material";

export default function DownloadProgress(props) {
  var [checked, setChecked] = React.useState(false);

  const handleArrowButtonClick = () => {
    setChecked((prev) => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <StyledBorderProgressBar />

        <Stack direction="column" spacing={2} justifyContent="center">
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button color="dark_button" variant="contained">
              Cancel Download
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
