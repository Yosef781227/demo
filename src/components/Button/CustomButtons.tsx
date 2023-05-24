import React from "react";
import { Button as ChakrauiButton } from "@chakra-ui/react";

interface CustomButtonsProps {
  text: string;
  icon?: React.ReactElement;
  size?: "xs" | "sm" | "md" | "lg" | "full";
  backgroundColor?: string;
  color?: string;
  variant?: "solid" | "outline" | "ghost" | "link" | "unstyled";
  fontSize?: string;  
  fontFamily?: string;
  fontWeight?: string;
  height?: string;
  width?: string;
}

function CustomButtons({
  text = "",
  icon = <></>,
  size = "md",
  backgroundColor = "",
  color = "",
  variant = "solid",
  fontSize = "", 
  fontFamily = "",  
  fontWeight = "", 
  height = "", 
  width = "",
}: CustomButtonsProps) {
  return (
    <ChakrauiButton
      backgroundColor={backgroundColor}
      color={color}
      fontSize={fontSize} 
      fontFamily={fontFamily} 
      fontWeight={fontWeight} 
      height={height}
      width={width === "full" ? "full" : width}
      variant={variant}
      leftIcon={icon}
      rightIcon={icon}
      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {text}
    </ChakrauiButton>
  );
}

export default CustomButtons;
