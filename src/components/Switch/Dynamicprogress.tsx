import { Box, Progress, Text } from "@chakra-ui/react";
import React from "react";


interface ProgressBarProps {
  value: number;
  max: number;
  width: string;
  height: string;
  size: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  width,
  height,
  size,
}) => {
  return (
    <Box width={width} height={height} display="flex" alignItems="center" gap={"12px"}>
      <Box flex="1" mr="2">
        <Progress
          size={size}
          value={(value / max) * 100}
           colorScheme="primary"
           rounded={"lg"}
             
     
        />
      </Box>
      <Text fontSize={size} fontWeight={"medium"}>{value}%</Text>
    </Box>
  );
};

export default ProgressBar;
