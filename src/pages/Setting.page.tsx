import Buttons from "@/components/Buttons/Button";
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
  Link,
} from "@chakra-ui/react";
import Container from "@components/Container";

function Setting() {
  return (
    <Container background={"neutral.50"}>
      width: '0px',
      <Box alignSelf={"center"} w={"70%"} gap={"32px"} >
        <Heading size={"md"} mt={5}>
          Settings
        </Heading>
        <RowContainer>
          <RowItem>
            <Heading size={"md"}>Hashtags</Heading>
            <Text fontWeight={"light"} style={{ fontSize: "18px" }}>
              This is where you’ll manage the hashtags you want to track.
              Archive will automatically detect any content posted using the
              hashtags on your list.
            </Text>
          </RowItem>
          <RowItem>
            <Heading
              size="sm"
              style={{ fontSize: "18px", fontWeight: "normal" }}
              color="#1F1F1F"
            >
              Your Hashtags
            </Heading>
            <HStack>
              <Select width={"770px"} height={"38px"} defaultValue={"option1"}>
                <option value={"option1"} style={{ fontSize: "14px", fontWeight: "regular" }}>
                  #Hashtags....
                </option>
                <option value={"option2"}>option2</option>
                <option value={"option3"}>option3</option>
                <option value={"option4"}>option4</option>
              </Select>

              <Buttons
                text="Add"
                fontsize="14px"
                fontweight="medium"
                textColor="525252"
                color="gray"
                width="80px"
                height="38px"
                variant="outline"
              />
            </HStack>
          </RowItem>
          <RowItem>
            <Text style={{ fontSize: "18px" }}>
              <Text as="span" fontWeight={"bold"} fontSize={"18px"}>
                Deleting a hashtag
              </Text>{" "}
              will remove all content associated with that hashtag from your
              library.
            </Text>
            <Text style={{ fontSize: "18px" }}>
              <Text fontWeight={"bold"} as="span" style={{ fontSize: "18px" }}>
                Tracking the hashtag again
              </Text>{" "}
              will restore previously saved content, but new content will only
              be added while the hashtag is active on your list.
            </Text>
          </RowItem>
        </RowContainer>

        <RowContainer height={"215px"}>
          <RowItem>
            <Heading size={"md"}>Invited Users</Heading>
            <Text style={{ fontSize: "18px" }}>
              Here you can invite other users and give them full access to your
              account in Archive.
            </Text>
          </RowItem>
          <RowItem>
            <Text
              size="sm"
              style={{ fontSize: "18px", fontWeight: "normal" }}
              color="#1F1F1F"
            >
              Invite your teammates
            </Text>
            <HStack>
              <Input
                placeholder="email.gmail.com"
                width="770px"
                height="38px"
              />
              <Button
                text="Invite"
                fontsize="16px"
                fontweight="medium"
                textColor="525252"
                color="gray"
                width="80px"
                height="38px"
                variant="outline"
              />
            </HStack>
          </RowItem>
        </RowContainer>
        <RowContainer height={"245px"}>
          <RowItem>
            <Heading size={"md"}>Weekly UGC Digest</Heading>
            <Text style={{ fontSize: "18px" }}>
              Add the email addresses of anyone on your team who wants to
              receive your brand's weekly UGC digest email.
            </Text>
          </RowItem>
          <RowItem>
            <Text
              size="sm"
              style={{ fontSize: "18px", fontWeight: "regular" }}
              color="#1F1F1F"
            >
              Add your teammates
            </Text>
            <HStack>
              <Input
                placeholder="mail@email.com"
                type="email"
                width="770px"
                height={"38px"}
              />
              <Button
                text="Add"
                fontsize="16px"
                fontweight="medium"
                textColor="525252"
                color="gray"
                width="80px"
                height="38px"
                variant="outline"
              />
            </HStack>
          </RowItem>
        </RowContainer>
        <RowContainer>
          <RowItem>
            <Heading size={"md"}>Missing UGC from Instagram or TikTok</Heading>
            <Text style={{ fontSize: "18px" }}>
              Sometimes Social Profiles forget to @mention your brand, but it's
              all good. Copy and paste a link to the UGC here; we'll add it to
              your asset library with all the usual details.
            </Text>
          </RowItem>
          <RowItem>
            <Text
              size="sm"
              style={{ fontSize: "18px", fontWeight: "regular" }}
              color="#1F1F1F"
            >
              Save UGC from link
            </Text>
            <HStack>
              <Input
                placeholder="paste link"
                type="email"
                width="770px"
                height={"40px"}
              />
              <Button
                text="Save"
                fontsize="16px"
                fontweight="medium"
                textColor="525252"
                color="gray"
                width="80px"
                height="40px"
                variant="outline"
              />
            </HStack>
          </RowItem>
        </RowContainer>
        <RowContainer>
          <RowItem>
            <Heading size={"md"}>Billing</Heading>
            <Text fontSize="18px">
              Review & Manage your plan. Upgrade or downgrade anytime with zero
              fees. Looking for our full pricing page?{" "}
              <Link color="#7C3AED" href="#">
                It’s here.
              </Link>
            </Text>
          </RowItem>
          <RowItem>
            <Heading size={"md"}>Your on the Free plan</Heading>
            <Text size={"14px"} fontWeight={"semibold"}>
              Social Profiles
            </Text>
            <HStack gap={5}>
              <Progress
                value={80}
                size={"sm"}
                colorScheme="primary"
                rounded={"2xl"}
                width={"full"}
              />
              <Text>80%</Text>
            </HStack>
          </RowItem>
          <Link alignSelf={"flex-end"} color="#7C3AED" mt={"5px"}>
            See Billing History
          </Link>
          <HStack
            justifyContent={"space-between"}
            alignItems={"top"}
            gap={"7px"}
          >
            <VStack alignItems={"flex-start"}>
              <Heading size={"md"}>Your payment method</Heading>
              <Text>Vis ,**1234</Text>
            </VStack>
            <Link color="#7C3AED">Manage Payment Method</Link>
          </HStack>

          <FAQ />
        </RowContainer>
        <Box pt="8">
          <Buttons
            text="Save Changes"
            width="150px"
            height="45px"
            color="primary"
          />
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
              What counts towards my Social Profiles limit?
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
              What happens if I exceed the Social Profiles’ limit?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          When you reach the maximum number of Social Profiles included in your
          plan, we'll still continue detecting and saving all your brand's
          newest UGC in real time.In order to make room for those new Social
          Profiles, we'll start hiding older content in your library.You'll need
          to upgrade your plan if you want to access hidden content again.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              What are my payment options?
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
type RowContainerProps = {
  children: React.ReactNode;
  height?: string | number;
};

function RowContainer({ children, height = "auto" }: RowContainerProps) {
  return (
    <VStack
      alignItems={"stretch"}
      shadow={"lg"}
      height={height}
      backgroundColor={"white"}
      mt="32px"
      px={10}
      py={5}
      gap={4}
      rounded={"lg"}
    >
      {children}
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
