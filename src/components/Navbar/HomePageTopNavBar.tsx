import { saveNewContent, logout } from "@/utils";
import { HStack, Button, Select, Text } from "@chakra-ui/react";
import { Funnel, Plus } from "@phosphor-icons/react";
import React, { ChangeEvent, SyntheticEvent, useContext } from "react";

import Buttons from "@/components/Buttons/Button";
import { UserContext } from "@/App";
import { User } from "@/interfaces/user.interface";

function HomePageTopNavBar({
  changeAccount,
  changeTiktokAcount,
  onFilterOpen,
  onNewOpen,
  instagramId,
  tiktokId,
}: {
  changeTiktokAcount: (e: ChangeEvent<HTMLSelectElement>) => any;
  changeAccount: (e: ChangeEvent<HTMLSelectElement>) => any;
  onFilterOpen: () => any;
  onNewOpen: () => any;
  instagramId: string;
  tiktokId: string;
}) {
  const User = useContext(UserContext) as User;
  return (
    <HStack bg="white" px="5" justifyContent={"space-between"}>
      <Text color={"black"} fontWeight={"semibold"} fontSize={"1.1rem"}>
        Content
      </Text>
      <HStack py="5">
        <Buttons
          icon={<Funnel size={16} color="gray" weight="fill" />}
          text="Filters"
          textColor="#525252"
          onClick={onFilterOpen}
          height="40px"
          width="91px"
          variant="outline"
        />

        <Button
          colorScheme="primary"
          width={"91px"}
          height={"40px"}
          leftIcon={<Plus size={16} color="white" weight="fill" />}
          fontSize={"md"}
          onClick={onNewOpen}
        >
          New
        </Button>
        <Button colorScheme="primary" onClick={saveNewContent}>
          Save New Content
        </Button>
        <Select
          width={"auto"}
          onChange={changeAccount}
          defaultValue={instagramId}
        >
          {User.instagrams.map((instagram: any, index: number) => {
            return (
              <option key={index + 1} value={instagram.id}>
                {instagram.username}
              </option>
            );
          })}
        </Select>
        <Select
          width={"auto"}
          onChange={changeTiktokAcount}
          defaultValue={tiktokId}
        >
          {User.tiktoks.map((tiktok: any, index: number) => {
            return (
              <option key={index + 1} value={tiktok.id}>
                {tiktok.uniqueId}
              </option>
            );
          })}
        </Select>
        <Button colorScheme="primary" onClick={logout}>
          Logout
        </Button>
      </HStack>
    </HStack>
  );
}

export default HomePageTopNavBar;
