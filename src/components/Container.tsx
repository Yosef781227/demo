import { Box } from "@chakra-ui/react";
type ContainerProps = {
  children?: React.ReactNode;
  height?: string | number;
  background?: string;
}

function Container({ children, height = "auto", background = "neutral.100" }: ContainerProps) {
  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      overflow={"hidden"}
      minHeight={"100vh"}
      alignSelf={"flex-start"}
      ml={"20%"}
      mt={3.5}
      background={background}
      alignItems={"stretch"}
      borderTopRadius={10}
      gap="0"
    >
      {children}
    </Box>
  );
}

export default Container;
