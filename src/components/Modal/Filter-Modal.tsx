import React from "react";
import {
  Button,
  Checkbox,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose }) => {
  const [startDate, setStartDate] = React.useState(new Date());

  return (
    <Modal isOpen={isOpen} isCentered={false} size={"md"} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        containerProps={{
          justifyContent: "flex-end",
          paddingRight: "0.9rem",
          paddingTop: "0.9rem",
        }}
        sx={{
          "&:first-child": {
            margin: 0,
            height: "100vh",
            overflowY: "scroll",
          },
        }}
      >
        <ModalHeader fontSize={"xl"} fontWeight={"bold"} mt={6}>
          Filters
        </ModalHeader>
        <ModalCloseButton size={"lg"} color={"gray.500"} mt={2} />

        <VStack borderBottom="1px" borderColor="gray.100" width="100%" my={2} />
        <ModalBody mt={5} ml={2}>
          <VStack>
            <Text textColor={"gray.500"}>Post Date</Text>

            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) =>
                setStartDate((prevDate) => date || prevDate)
              }
            />
          </VStack>
          <VStack mt={5}>
            <Text textColor={"gray.500"}>Post Type</Text>
            <VStack mt={3}>
              <HStack>
                <Checkbox>Reel</Checkbox>
                <Checkbox>Feed</Checkbox>
                <Checkbox>Story</Checkbox>
              </HStack>
            </VStack>
          </VStack>
          <VStack mt={5}>
            <Text textColor={"gray.500"}>Source</Text>
            <VStack mt={3}>
              <HStack>
                <Checkbox size={"sm"}>@beyond_lore</Checkbox>
              </HStack>
            </VStack>
          </VStack>
          <VStack mt={5}>
            <Text textColor={"gray.500"}>Tags</Text>
            <Tabs w={"max-content"}>
              <TabList>
                <Tab>All</Tab>
                <Tab>Assets</Tab>
                <Tab>Social Profile</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <HStack>
                    <Checkbox>No Tags</Checkbox>
                  </HStack>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </VStack>
          <VStack mt={5}>
            <Text textColor={"gray.500"}>Usage Right</Text>
            <HStack mt={3}>
              <Checkbox>Pending</Checkbox>
              <Checkbox>Approved</Checkbox>
              <Checkbox>Rejected</Checkbox>
            </HStack>
          </VStack>
          <VStack mt={5}>
            <Text textColor={"gray.500"}>Followers</Text>
            <HStack mt={3} ml="10%" w="max-content">
              <Select placeholder="Select">
                <option value="option1" selected>
                  1k
                </option>
                <option value="option2">2k</option>
                <option value="option3">3k</option>
              </Select>
              <Select placeholder="Select">
                <option value="option1">1k</option>
                <option value="option2"> 2k</option>
                <option value="option3" selected>
                  {" "}
                  3k
                </option>
              </Select>
            </HStack>
          </VStack>
          <VStack mt={5}>
            <Text textColor={"gray.500"}>Content Type</Text>
            <HStack mt={3}>
              <Checkbox>Video</Checkbox>
              <Checkbox>Audio</Checkbox>
            </HStack>
          </VStack>
          <VStack mt={5}>
            <Text textColor={"gray.500"}>Engagement</Text>
            <VStack alignItems={"flex-start"} mt={3}>
              <Checkbox checked={true}>Views</Checkbox>
              <HStack pl="10%">
                <Select placeholder="Select">
                  <option value="option1" selected>
                    1k
                  </option>
                  <option value="option2">2k</option>
                  <option value="option3">3k</option>
                </Select>
                <Select placeholder="Select">
                  <option value="option1">1k</option>
                  <option value="option2"> 2k</option>
                  <option value="option3" selected>
                    {" "}
                    3k
                  </option>
                </Select>
              </HStack>
            </VStack>
            <VStack alignItems={"flex-start"}>
              <Checkbox checked={true}>Plays</Checkbox>
              <HStack pl="10%">
                <Select placeholder="Select">
                  <option value="option1" selected>
                    1k
                  </option>
                  <option value="option2">2k</option>
                  <option value="option3">3k</option>
                </Select>
                <Select placeholder="Select">
                  <option value="option1">1k</option>
                  <option value="option2"> 2k</option>
                  <option value="option3" selected>
                    {" "}
                    3k
                  </option>
                </Select>
              </HStack>
            </VStack>
            <VStack mt={3} alignItems={"flex-start"}>
              <Checkbox>Likes</Checkbox>
              <Checkbox>Comments</Checkbox>
              <Checkbox>Share</Checkbox>
            </VStack>
          </VStack>
          <VStack mt={5}>
            <Text textColor={"gray.500"}>Collections</Text>
            <Tabs w="max-content">
              <TabList>
                <Tab>Include</Tab>
                <Tab>Exclude</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <HStack>
                    <Checkbox>All Collection</Checkbox>
                    <Checkbox>Random</Checkbox>
                    <Checkbox>Large Inflencers</Checkbox>
                  </HStack>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </VStack>
          <VStack mt={5}>
            <Text textColor={"gray.500"}>Verification</Text>
            <HStack mt={3}>
              <Checkbox>Verified</Checkbox>
              <Checkbox>Not Verified</Checkbox>
            </HStack>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost">Reset All</Button>
          <Button colorScheme="primary" mr={3} onClick={onClose}>
            Apply All
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FilterModal;
