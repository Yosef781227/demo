import { VStack } from "@chakra-ui/react";
import theme from "@/constants/theme";

function Container(props: any) {
  
  const gradientBackground = `linear-gradient(to bottom, ${theme.colors.white} 4%, ${theme.colors.neutral["100"]} 5%)`;

  return (
    <VStack
      minH={"100vh"}
      background={gradientBackground}
      alignSelf={"flex-start"}
      width={"79.3%"}
      ml={"20%"}
      mt={3.5}
      alignItems={"stretch"}
      padding={4}
      px={7}
      borderTopRadius={10}
      {...props}
    >
      {props.children}
    </VStack>
  );
}

export default Container;