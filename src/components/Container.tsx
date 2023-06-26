import { VStack, Box } from "@chakra-ui/react";
import theme from "@/constants/theme";

function Container(props: any) {
  const gradientBackground = `linear-gradient(to bottom, ${theme.colors.white} 4%, ${theme.colors.neutral["100"]} 5%)`;

  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      overflow={"hidden"}
      // background={gradientBackground}
      alignSelf={"flex-start"}
      width={"calc(100vw - 20.5%)"}
      ml={"20%"}
      mt={3.5}
      alignItems={"stretch"}
      // padding={4}
      // px={7}
      borderTopRadius={10}
      gap="0"
      {...props}
    >
      {props.children}
    </Box>
  );
}

export default Container;
