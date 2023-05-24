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
}

function Buttons({
  text = "",
  textColor,
  icon = <></>,
  size = "md",
  color = "primary",
  variant = "solid",
  onClick = () => {},
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
      {...rest}
    >
      {text}
    </ChakrauiButton>
  );
}

export default Buttons;
