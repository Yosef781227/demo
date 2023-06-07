import { Box, CircularProgress } from "@chakra-ui/react";
import React from "react";

function Loading() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CircularProgress isIndeterminate color="#8B5CF6" />
    </Box>
  );
}

export default Loading;
