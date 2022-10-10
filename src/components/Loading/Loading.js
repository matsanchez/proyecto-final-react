import * as React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
  return (
    <Stack
      sx={{ color: "grey.500" }}
      spacing={4}
      margin={10}
      direction="row"
      justifyContent="center"
    >
      <CircularProgress size="150px" color="inherit" />
    </Stack>
  );
};

export default Loading;
