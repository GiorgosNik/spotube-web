import * as React from "react";
import { theme } from "../theme";
import { StyledSwitch } from "./StyledSwitch";

import {
  FormControlLabel,
  FormGroup,
  Box,
  Container,
  styled,
} from "@mui/material";

const StyledFormControlLabel = styled(FormControlLabel)({
  color: theme.palette.secondary.main,
});

const DropdownMenu = (
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
          control={<StyledSwitch defaultChecked />}
          label="Download Lyrics"
        />
        <StyledFormControlLabel
          control={<StyledSwitch defaultChecked color="primary" />}
          label="Normalize Audio"
        />
      </FormGroup>
    </Container>
  </Box>
);

export { DropdownMenu };
