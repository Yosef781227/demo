import { Box } from "@chakra-ui/react";

type ContainerProps = {
  children?: React.ReactNode;
  height?: string | number;
  background?: string;
}

function Container({ children, height = "150vh", background = "neutral.100" }: ContainerProps) {
  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      overflow={"hidden"}
      alignSelf={"flex-start"}
      ml={"20%"}
      minH={height}
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
