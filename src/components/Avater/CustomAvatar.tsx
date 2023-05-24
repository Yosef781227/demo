import { Avatar, AvatarProps, useTheme } from "@chakra-ui/react";
import theme from "@/constants/theme";

type CustomAvatarProps = Omit<AvatarProps, "name" | "src"> & {
  img?: string;
  name?: string;
  size?: keyof typeof theme.components.Avatar.sizes;
  textColor?: keyof typeof theme.colors;
};

const CustomAvatar: React.FC<CustomAvatarProps> = ({
  img,
  name,
  size = "xl",
  textColor,
  ...rest
}) => {
  const theme = useTheme();
  const defaultColor = "yellow.300";
  const avatarSize = theme.components.Avatar.sizes[size]?.boxSize || "96px";
  const avatarColor = rest.bg || defaultColor;
  const textWeight = "extrabold";
  const textSize = theme.fontSizes[size] || theme.fontSizes["xl"];
  const finalTextColor = textColor ? theme.colors[textColor] : undefined;

  return (
    <Avatar
      name={name}
      src={img}
      boxSize={avatarSize}
      bg={avatarColor}
      color={finalTextColor}
      fontWeight={textWeight}
      fontSize={textSize}
      {...rest}
    />
  );
};

export default CustomAvatar;
