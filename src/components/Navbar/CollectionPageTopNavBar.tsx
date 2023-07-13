import React from "react";
import { HStack, Text } from "@chakra-ui/layout";
import Buttons from "../Buttons/Button";
import AddIcon from "@/assets/icons/AddIcon";
import { Funnel, ShareFat } from "@phosphor-icons/react";

function CollectionPageTopNavBar({
  collectionName,
  onFilterOpen,
}: {
  collectionName: string;
  onFilterOpen: () => void;
}) {
  return (
    <HStack bg="white" px="5" justifyContent={"space-between"}>
      <Text color={"black"} fontWeight={"semibold"} fontSize={"1.1rem"}>
        Collection / {collectionName}
      </Text>
      <HStack py="5">
        <Buttons
          icon={<Funnel size={16} color="gray" weight="fill" />}
          text="Filters"
          textColor="#525252"
          onClick={onFilterOpen}
          height="40px"
          variant="outline"
        />
        <Buttons
          icon={<ShareFat size={16} color="gray" weight="fill" />}
          text="Share Collection"
          textColor="#525252"
          width="max-content"
          variant="outline"
        />
      </HStack>
    </HStack>
  );
}

export default CollectionPageTopNavBar;
