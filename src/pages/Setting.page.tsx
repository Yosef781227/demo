import Buttons from "@/components/Buttons/Button";
import Button from "@/components/Buttons/Button";
import {Heading,VStack,Text,Select,HStack,Input,Progress,Accordion,AccordionButton,AccordionIcon,AccordionItem,AccordionPanel,Box,Link,} from "@chakra-ui/react";
import Container from "@components/Container";

function Setting() {
  return (
    <Container background={"neutral.50"}>
      
      <Box alignSelf={"center"} w={"70%"}  >
        <Heading size={"lg"} mt={"10px"} pt={10}>
          Settings
        </Heading>


        <RowContainer height={"270px"}  width={"1000px"}>
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
                height="40px"
              />
              <Button
                text="Invite"
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

        <RowContainer height={"270px"} width={"1000px"}>
          <RowItem>
            <Heading size={"md"}>Weekly UGC Digest</Heading>
            <Text style={{ fontSize: "18px" }}>
              Add the email addresses of anyone on your team who wants to
              receive your brand's <br/> weekly UGC digest email.
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
                height={"40px"}
              />
              <Button
                text="Add"
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

    

        <RowContainer width={"1000px"}>
          <RowItem>
            <Heading size={"md"}>Billing</Heading>
            <Text fontSize="18px">
              Review & Manage your plan. Upgrade or downgrade anytime with zero
              fees. Looking<br/> for our full pricing page?{" "}
              <Link color="#7C3AED" href="#" textDecoration="underline">
                It’s here
              </Link>
              .
            </Text>
          </RowItem>
          <RowItem>
            <HStack spacing={550}>
            <Heading size={"md"} fontWeight={"bold"}>Your on the Free plan</Heading>
            <Button
                text="Mange Plan"
                fontsize="16px"
                fontweight="medium"
                textColor="525252"
                color="gray"
                width="120px"
                height="40px"
                variant="outline"
              />
            </HStack>
            
            <Text size={"14px"} fontWeight={"semibold"}>
              Social Profiles
            </Text>
            <HStack gap={5}>
              <Progress
                value={50}
                size={"md"}
                colorScheme="primary"
                rounded={"2xl"}
                width={800}
              />
              <Text>80%</Text>
            </HStack>
          </RowItem>
          <Link alignSelf={"flex-end"} pr={"60px"} color="#7C3AED" mt={"5px"}>
            See Billing History
          </Link>
          <HStack
            justifyContent={"space-between"}
            alignItems={"top"}
            gap={"7px"}
          >
            <VStack alignItems={"flex-start"} >
              <Heading size={"md"}>Your payment method</Heading>
              <Text>Vis ,**1234</Text>
            </VStack>
            <Link color="#7C3AED" pr={"60px"}>Manage Payment Method</Link>
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
    <Accordion allowMultiple w={870}>
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
  width?: string | number;
};

function RowContainer({ children, height = "auto", width = "auto" }: RowContainerProps) {
  return (
    <VStack
      alignItems={"stretch"}
      shadow={"lg"}
      height={height}
      backgroundColor={"white"}
      mt="40px"
      px={10}
      py={10}
      gap={4}
      rounded={"lg"}
      width={width}
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
