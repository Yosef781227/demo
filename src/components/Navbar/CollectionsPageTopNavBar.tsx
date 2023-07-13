import { HStack, Text } from "@chakra-ui/layout";
import Buttons from "../Buttons/Button";
import AddIcon from "@/assets/icons/AddIcon";
import { Funnel } from "@phosphor-icons/react";

export default function CollectionsPageTopNavBar() {
  return (
    <HStack bg="white" px="5" justifyContent={"space-between"}>
      <Text color={"black"} fontWeight={"semibold"} fontSize={"1.1rem"}>
        Collection
      </Text>
      <HStack py="5">
        <Buttons icon={<AddIcon />} text="New Collection" />
      </HStack>
    </HStack>
  );
}
