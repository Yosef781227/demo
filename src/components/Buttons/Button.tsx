import React from "react";
import { Button as ChakrauiButton } from "@chakra-ui/react";

interface ButtonProps {
  text: string;
  icon?: React.ReactElement;
  size?: "xs" | "sm" | "md" | "lg" | "full";
  color?: string;
  textColor?: string;
  variant?: "solid" | "outline" | "ghost" | "link" | "unstyled";
  onClick?: () => void;
  width?: string;
  height?: string;
  fontweight?: string;
  fontsize?: string;
  isLoading?: boolean;
}

function Buttons({
  text = "",
  fontweight,
  fontsize,
  textColor,
  icon,
  size = "md",
  color = "primary",
  width = "full",
  height = "40px",
  variant = "solid",
  onClick = () => {},
  isLoading,
  ...rest
}: ButtonProps) {
  return (
    <ChakrauiButton
      colorScheme={color}
      {...(size === "full" ? { width: "full" } : { size: size })}
      {...(textColor ? { color: textColor } : {})}
      variant={variant}
      leftIcon={icon}
      onClick={onClick}
      width={width}
      height={height}
      fontWeight={fontweight}
      fontSize={fontsize}
      isLoading={isLoading}
      {...rest}
    >
      {text}
    </ChakrauiButton>
  );
}

export default Buttons;
