import { VStack } from "@chakra-ui/react";
import theme from "@/constants/theme";

function Container(props: any) {
  const gradientBackground = `linear-gradient(to bottom, ${theme.colors.white} 4%, ${theme.colors.neutral["100"]} 5%)`;

  return (
    <VStack
      overflow={"hidden"}
      minH={"100vh"}
      // background={gradientBackground}
      alignSelf={"flex-start"}
      // width={"7%"}
      width={"calc(100vw - 20.5%)"}
      ml={"20%"}
      mt={3.5}
      alignItems={"stretch"}
      // padding={4}
      // px={7}
      borderTopRadius={10}
      {...props}
      gap="0"
    >
      {props.children}
    </VStack>
  );
}

export default Container;
