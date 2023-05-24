import { Switch, SwitchProps } from "@chakra-ui/react";
import React from "react";
import theme from "@/constants/theme";

interface DynamicSwitchProps extends SwitchProps {
  width: string;
  height: string;
  thumbSize: string;
  colorScheme?: string;
    
}

const DynamicSwitch: React.FC<DynamicSwitchProps> = ({ width, height, thumbSize, colorScheme  }) => {

    
  return (
    <Switch
    
      colorScheme={theme.colors[colorScheme || "primary"][400]}
      sx={{
        "--switch-track-width": width,
        "--switch-track-height": height,
        "--switch-thumb-size": thumbSize,
      }}
     
    />
  );
};

export default DynamicSwitch;
