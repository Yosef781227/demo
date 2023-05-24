import Button from "@/components/Buttons/Button";
import {
  Heading,
  VStack,
  Text,
  Select,
  HStack,
  Input,
  Progress,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import Container from "@components/Container";
function Setting() {
  return (
    <Container>
      <Box alignSelf={"center"} w={"70%"}>
        <Heading size={"md"} mt={5}>
          Settings
        </Heading>
        <RowContainer>
          <RowItem>
            <Heading size={"md"}>Hashtags</Heading>
            <Text fontWeight={"light"}>
              This is where you’ll manage the hashtags you want to track.
              Archive will automatically detect any content posted using the
              hashtags on your list.
            </Text>
          </RowItem>
          <RowItem>
            <Heading size="sm">Your Hashtags</Heading>
            <HStack>
              <Select flexGrow={1}>
                <option selected>Hashtags....</option>
                <option>option1</option>
                <option>option1</option>
                <option>option1</option>
                <option>option1</option>
              </Select>
              <Button text="Add" variant="outline" />
            </HStack>
          </RowItem>
          <RowItem>
            <Text>
              <Text as="span" fontWeight={"bold"}>
                Deleting a hashtag
              </Text>{" "}
              fAdd the email addresses of anyone on your team who wants to
              receive your brand's weekly UGC digest email.rom your list will
              remove any content with that hashtag from your library.
            </Text>
            <Text>
              <Text fontWeight={"bold"} as="span">
                Tracking the hashtag again
              </Text>{" "}
              will restore previously saved content, but new content will only
              be added while the hashtag is active on your list.
            </Text>
          </RowItem>
        </RowContainer>

        <RowContainer>
          <RowItem>
            <Heading size={"md"}>Invited Users</Heading>
            <Text>
              Here you can invite other users and give them full access to your
              account in Archive.
            </Text>
          </RowItem>
          <RowItem>
            <Heading size={"md"}>Invite your teammates</Heading>
            <HStack>
              <Input placeholder="email.gmail.com" />
              <Button text="Invite" variant="outline" />
            </HStack>
          </RowItem>
        </RowContainer>
        <RowContainer>
          <RowItem>
            <Heading size={"md"}>Weekly UGC Digest</Heading>
            <Text>
              Add the email addresses of anyone on your team who wants to
              receive your brand's weekly UGC digest email.
            </Text>
          </RowItem>
          <RowItem>
            <Heading size={"md"}>Add your teammates</Heading>
            <HStack>
              <Input placeholder="mail@email.com" type="email" />
              <Button text="Add" variant="outline" />
            </HStack>
          </RowItem>
        </RowContainer>
        <RowContainer>
          <RowItem>
            <Heading size={"md"}>Missing UGC from Instagram or TikTok</Heading>
            <Text>
              Sometimes Social Profiles forget to @mention your brand, but it's
              all good. Copy and paste a link to the UGC here; we'll add it to
              your asset library with all the usual details.
            </Text>
          </RowItem>
          <RowItem>
            <Heading size={"md"}>Save UGC from link</Heading>
            <HStack>
              <Input placeholder="paste link" type="email" />
              <Button text="Save" variant="outline" />
            </HStack>
          </RowItem>
        </RowContainer>
        <RowContainer>
          <RowItem>
            <Heading size={"md"}>Billing</Heading>
            <Text>
              Review & Manage your plan. Upgrade or downgrade anytime with zero
              fees. Looking for our full pricing page? It’s here.
            </Text>
          </RowItem>
          <RowItem>
            <Heading size={"md"}>Social Profiles</Heading>
            <HStack gap={5}>
              <Progress
                value={80}
                colorScheme="primary"
                rounded={"2xl"}
                width={"full"}
              />
              <Text>80%</Text>
            </HStack>
          </RowItem>
          <Text alignSelf={"flex-end"}>See Billing History</Text>
          <HStack justifyContent={"space-between"} alignItems={"top"}>
            <VStack alignItems={"flex-start"}>
              <Heading size={"md"}>Your payment method</Heading>
              <Text>Vis ,**1234</Text>
            </VStack>
            <Text>Manage Payment Method</Text>
          </HStack>

          <Heading size={"md"}>Your payment method</Heading>
          <HStack>
            <Input placeholder="paste link" type="email" />
            <Button text="Save" variant="outline" />
          </HStack>
          <FAQ />
        </RowContainer>
        <Box pt="5">
          <Button text="Save Changes" />
        </Box>
      </Box>
    </Container>
  );
}
function FAQ() {
  return (
    <Accordion allowMultiple>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Section 1 title
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Section 2 title
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
function RowContainer(props: { children: React.ReactNode }) {
  return (
    <VStack
      alignItems={"stretch"}
      shadow={"lg"}
      my="10"
      px={10}
      py={5}
      gap={4}
      rounded={"lg"}
    >
      {props.children}
    </VStack>
  );
}
function RowItem(props: { children: React.ReactNode }) {
  return (
    <VStack alignItems={"stretch"} gap={2}>
      {props.children}
    </VStack>
  );
}
export default Setting;
