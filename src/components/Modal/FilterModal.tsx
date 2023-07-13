//@ts-nocheck
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  HStack,
  Checkbox,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Select,
  VStack,
  ModalFooter,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";
import { RangeDatePicker } from "react-google-flight-datepicker";
import { Dispatch, SetStateAction, useReducer, useState } from "react";
import "react-google-flight-datepicker/dist/main.css";
import { User } from "@/interfaces/user.interface";
import { useQuery } from "@apollo/client";
import { GetUserCollection } from "@/query/user";
const currentDate = new Date();
const previousMonthDate = new Date(currentDate);
previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);

function FilterModal({
  isOpen,
  onClose,
  user,
  setApplyFilterState,
  dispatch,
  filterState,
}: {
  isOpen: boolean;
  onClose: () => void;
  setApplyFilterState: Dispatch<SetStateAction<any>>;
  user: User;
  filterState: any;
  dispatch: Dispatch<any>;
}) {
  const onDateChange = (startDate: Date, endDate: Date) => {
    dispatch({
      type: "POST_DATE_RANGE",
      payload: {
        startDate: new Date(startDate).getTime(),
        endDate:
          endDate == null ? new Date().getTime() : new Date(endDate).getTime(),
      },
    });
  };
  const {
    data: collectionData,
    loading: loadingCollection,
    error: errorCollection,
    refetch,
  } = useQuery(GetUserCollection);
  console.log(filterState);
  return (
    <>
      <Modal isOpen={isOpen} isCentered={false} size={"md"} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          containerProps={{
            justifyContent: "flex-end",
          }}
          sx={{
            "&:first-child": {
              margin: 0,
              height: "100vh",
              overflowY: "auto",
            },
          }}
        >
          <ModalHeader fontSize={"xl"} fontWeight={"bold"} mt={6}>
            Filters
          </ModalHeader>
          <ModalCloseButton size={"lg"} color={"gray.500"} mt={2} />

          <Box borderBottom="1px" borderColor="gray.100" width="100%" my={2} />
          <ModalBody mt={5} ml={2}>
            <>
              <Box>
                <Text textColor={"gray.500"}>Post Date</Text>
                <RangeDatePicker
                  startDate={previousMonthDate}
                  endDate={previousMonthDate}
                  onChange={(startDate, endDate) => {
                    onDateChange(startDate, endDate);
                  }}
                  minDate={new Date(2012, 0, 1)}
                  maxDate={
                    new Date(
                      new Date().getFullYear(),
                      new Date().getMonth(),
                      new Date().getDate()
                    )
                  }
                  dateFormat="D-MM-YY"
                  monthFormat="MMM YYYY"
                  startDatePlaceholder="Start Date"
                  endDatePlaceholder="End Date"
                  disabled={false}
                  className="my-own-class-name"
                  startWeekDay="monday"
                />
              </Box>
              <Box mt={5}>
                <Text textColor={"gray.500"}>Post Type</Text>
                <Box mt={3}>
                  <Box>
                    <Text textColor={"gray.500"} fontSize={"sm"}>
                      Instagram
                    </Text>
                    <HStack mt={1.5}>
                      <Checkbox
                        onChange={(e) => {
                          e.target.checked
                            ? dispatch({
                                type: "POST_TYPE",
                                payload: [...filterState.postType, "reel"],
                              })
                            : dispatch({
                                type: "POST_TYPE",
                                payload: [...filterState.postType].filter(
                                  (type) => type !== "reel"
                                ),
                              });
                        }}
                        isChecked={filterState.postType.includes("reel")}
                      >
                        Reel
                      </Checkbox>
                      <Checkbox
                        onChange={(e) => {
                          e.target.checked
                            ? dispatch({
                                type: "POST_TYPE",
                                payload: [...filterState.postType, "post"],
                              })
                            : dispatch({
                                type: "POST_TYPE",
                                payload: [...filterState.postType].filter(
                                  (type) => type !== "post"
                                ),
                              });
                        }}
                        isChecked={filterState.postType.includes("post")}
                      >
                        Feed
                      </Checkbox>
                      <Checkbox
                        onChange={(e) => {
                          e.target.checked
                            ? dispatch({
                                type: "POST_TYPE",
                                payload: [...filterState.postType, "story"],
                              })
                            : dispatch({
                                type: "POST_TYPE",
                                payload: [...filterState.postType].filter(
                                  (type) => type !== "story"
                                ),
                              });
                        }}
                        isChecked={filterState.postType.includes("story")}
                      >
                        Story
                      </Checkbox>
                    </HStack>
                  </Box>
                  <Box mt={3}>
                    <Text textColor={"gray.500"} fontSize={"sm"}>
                      Tiktok
                    </Text>
                    <Checkbox
                      onChange={(e) => {
                        e.target.checked
                          ? dispatch({
                              type: "POST_TYPE",
                              payload: [...filterState.postType, "video"],
                            })
                          : dispatch({
                              type: "POST_TYPE",
                              payload: [...filterState.postType].filter(
                                (type) => type !== "video"
                              ),
                            });
                      }}
                      isChecked={filterState.postType.includes("video")}
                      mt={3}
                    >
                      Video
                    </Checkbox>
                  </Box>
                </Box>
              </Box>
              <Box mt={5}>
                <Text textColor={"gray.500"}>Source</Text>
                <Box mt={3}>
                  {user?.instagrams?.length > 0 && (
                    <Box>
                      <Text textColor={"gray.500"} fontSize={"sm"} mt={2}>
                        Instagram
                      </Text>
                      {user?.instagrams?.map((instagram, index) => (
                        <Checkbox
                          key={index}
                          size={"sm"}
                          mt={2}
                          isChecked={filterState.userNames.includes(
                            instagram.username
                          )}
                          onChange={(e) => {
                            dispatch({
                              type: "USER_NAMES",
                              payload: e.target.checked
                                ? [...filterState.userNames, instagram.username]
                                : [...filterState.userNames].filter(
                                    (username) =>
                                      username !== instagram.username
                                  ),
                            });
                          }}
                        >
                          {instagram.username}
                        </Checkbox>
                      ))}
                    </Box>
                  )}
                  {user?.tiktoks?.length > 0 && (
                    <Box mt={2}>
                      <Text textColor={"gray.500"} fontSize={"sm"} mt={2}>
                        Tiktok
                      </Text>
                      {user?.tiktoks?.map((tiktok, index) => (
                        <Checkbox
                          key={index}
                          size={"sm"}
                          mt={2}
                          isChecked={filterState.uniqueIds.includes(
                            tiktok.uniqueId
                          )}
                          onChange={(e) => {
                            dispatch({
                              type: "UNIQUE_IDS",
                              payload: e.target.checked
                                ? [...filterState.uniqueIds, tiktok.uniqueId]
                                : [...filterState.uniqueIds].filter(
                                    (unique_id) => unique_id !== tiktok.uniqueId
                                  ),
                            });
                          }}
                        >
                          {tiktok.uniqueId}
                        </Checkbox>
                      ))}
                    </Box>
                  )}
                </Box>
              </Box>
              <Box mt={5}>
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
                    <TabPanel>
                      <p>three!</p>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
              <Box mt={5}>
                <Text textColor={"gray.500"}>Usage Right</Text>
                <HStack mt={3}>
                  <Checkbox
                    isChecked={filterState.usageRight.includes("PENDING")}
                    onChange={(e) => {
                      dispatch({
                        type: "USAGE_RIGHT",
                        payload: e.target.checked
                          ? [...filterState.usageRight, "PENDING"]
                          : [...filterState.usageRight].filter(
                              (usage) => usage !== "PENDING"
                            ),
                      });
                    }}
                  >
                    Pending
                  </Checkbox>
                  <Checkbox
                    isChecked={filterState.usageRight.includes("APPROVED")}
                    onChange={(e) => {
                      dispatch({
                        type: "USAGE_RIGHT",
                        payload: e.target.checked
                          ? [...filterState.usageRight, "APPROVED"]
                          : [...filterState.usageRight].filter(
                              (usage) => usage !== "APPROVED"
                            ),
                      });
                    }}
                  >
                    Approved
                  </Checkbox>
                  <Checkbox
                    isChecked={filterState.usageRight.includes("REJECTED")}
                    onChange={(e) => {
                      dispatch({
                        type: "USAGE_RIGHT",
                        payload: e.target.checked
                          ? [...filterState.usageRight, "REJECTED"]
                          : [...filterState.usageRight].filter(
                              (usage) => usage !== "REJECTED"
                            ),
                      });
                    }}
                  >
                    Rejected
                  </Checkbox>
                  <Checkbox
                    isChecked={filterState.usageRight.includes("DEFAULT")}
                    defaultChecked={true}
                    onChange={(e) => {
                      dispatch({
                        type: "USAGE_RIGHT",
                        payload: e.target.checked
                          ? [...filterState.usageRight, "DEFAULT"]
                          : [...filterState.usageRight].filter(
                              (usage) => usage !== "DEFAULT"
                            ),
                      });
                    }}
                  >
                    Default
                  </Checkbox>
                </HStack>
              </Box>
              <Box mt={5}>
                <Text textColor={"gray.500"}>Followers</Text>
                <HStack mt={3} ml="10%" w="max-content">
                  <Select placeholder="Select" defaultValue={"option1"}>
                    <option value="option1">1k</option>
                    <option value="option2">2k</option>
                    <option value="option3">3k</option>
                  </Select>
                  <Select placeholder="Select" defaultValue={"option3"}>
                    <option value="option1">1k</option>
                    <option value="option2"> 2k</option>
                    <option value="option3"> 3k</option>
                  </Select>
                </HStack>
              </Box>
              <Box mt={5}>
                <Text textColor={"gray.500"}>Content Type</Text>
                <HStack mt={3}>
                  <Checkbox
                    isChecked={
                      filterState.contentType === 2 ||
                      filterState.contentType == 1
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        dispatch({
                          type: "CONTENT_TYPE",
                          payload: filterState.contentType == 0 ? 2 : 1,
                        });
                      } else {
                        dispatch({
                          type: "CONTENT_TYPE",
                          payload: filterState.contentType == 2 ? 0 : -1,
                        });
                      }
                    }}
                  >
                    Video
                  </Checkbox>
                  <Checkbox
                    isChecked={
                      filterState.contentType === 2 ||
                      filterState.contentType == 0
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        dispatch({
                          type: "CONTENT_TYPE",
                          payload: filterState.contentType == 1 ? 2 : 0,
                        });
                      } else {
                        dispatch({
                          type: "CONTENT_TYPE",
                          payload: filterState.contentType === 2 ? 1 : -1,
                        });
                      }
                    }}
                  >
                    Image
                  </Checkbox>
                </HStack>
              </Box>
              <Box mt={5}>
                <Text textColor={"gray.500"}>Engagement</Text>
                <VStack alignItems={"flex-start"} mt={3}>
                  <Checkbox checked={true}>Views</Checkbox>
                  <HStack pl="10%">
                    <Select placeholder="Select" defaultValue={"option1"}>
                      <option value="option1">1k</option>
                      <option value="option2">2k</option>
                      <option value="option3">3k</option>
                    </Select>
                    <Select placeholder="Select" defaultValue={"option3"}>
                      <option value="option1">1k</option>
                      <option value="option2"> 2k</option>
                      <option value="option3"> 3k</option>
                    </Select>
                  </HStack>
                </VStack>
                <VStack alignItems={"flex-start"}>
                  <Checkbox checked={true}> Plays</Checkbox>
                  <HStack pl="10%">
                    <Select placeholder="Select" defaultValue={"1k"}>
                      <option value="1k">1k</option>
                      <option value="2k">2k</option>
                      <option value="3k">3k</option>
                    </Select>
                    <Select placeholder="Select" defaultValue={"option3"}>
                      <option value="option1">1k</option>
                      <option value="option2"> 2k</option>
                      <option value="option3"> 3k</option>
                    </Select>
                  </HStack>
                </VStack>
                <VStack mt={3} alignItems={"flex-start"}>
                  <Checkbox> Likes</Checkbox>
                  <Checkbox> Comments</Checkbox>
                  <Checkbox> Share</Checkbox>
                </VStack>
              </Box>
              <Box mt={5}>
                <Text textColor={"gray.500"}>Collections</Text>
                <Tabs w="max-content">
                  <TabList>
                    <Tab>Include</Tab>
                    <Tab>Exclude</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <HStack>
                        <Checkbox
                          isChecked={
                            user?.collections?.length ===
                            filterState?.collectionInclude?.length
                          }
                          onChange={(e) => {
                            if (e.target.checked) {
                              dispatch({
                                type: "COLLECTIONS_INCLUDE",
                                payload: user.collections,
                              });
                            }
                          }}
                        >
                          All Collection
                        </Checkbox>
                        {user.collections?.map((collection) => {
                          return (
                            <Checkbox
                              isChecked={filterState.collectionInclude?.includes(
                                collection
                              )}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  dispatch({
                                    type: "COLLECTIONS_INCLUDE",
                                    payload: [
                                      ...filterState?.collectionInclude,
                                      collection,
                                    ],
                                  });
                                } else {
                                  dispatch({
                                    type: "COLLECTIONS_INCLUDE",
                                    payload:
                                      filterState?.collectionInclude?.filter(
                                        (col) => col.id !== collection.id
                                      ),
                                  });
                                }
                              }}
                              key={collection.id}
                            >
                              {collection.name}
                            </Checkbox>
                          );
                        })}
                      </HStack>
                    </TabPanel>
                    <TabPanel>
                      <Checkbox
                        isChecked={
                          user?.collections?.length ===
                          filterState?.collectionExclude?.length
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            dispatch({
                              type: "COLLECTIONS_EXCLUDE",
                              payload: user.collections,
                            });
                          }
                        }}
                      >
                        All Collection
                      </Checkbox>
                      {user.collections?.map((collection) => {
                        return (
                          <Checkbox
                            isChecked={filterState.collectionExclude?.includes(
                              collection
                            )}
                            onChange={(e) => {
                              if (e.target.checked) {
                                dispatch({
                                  type: "COLLECTIONS_EXCLUDE",
                                  payload: user.collections,
                                });
                              }
                            }}
                            onChange={(e) => {
                              if (e.target.checked) {
                                dispatch({
                                  type: "COLLECTIONS_EXCLUDE",
                                  payload: [
                                    ...filterState?.collectionInclude,
                                    collection,
                                  ],
                                });
                              } else {
                                dispatch({
                                  type: "COLLECTIONS_EXCLUDE",
                                  payload:
                                    filterState?.collectionInclude?.filter(
                                      (col) => col.id !== collection.id
                                    ),
                                });
                              }
                            }}
                            key={collection.id}
                          >
                            {collection.name}
                          </Checkbox>
                        );
                      })}
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
              <Box mt={5}>
                <Text textColor={"gray.500"}>Verification</Text>
                <HStack mt={3}>
                  <Checkbox
                    onChange={(e) => {
                      if (e.target.checked) {
                        dispatch({
                          type: "VERIFIED",
                          payload: filterState.verified == 0 ? 2 : 1,
                        });
                      } else {
                        dispatch({
                          type: "VERIFIED",
                          payload: filterState.verified == 2 ? 0 : -1,
                        });
                      }
                    }}
                    isChecked={
                      filterState.verified === 2 || filterState.verified == 1
                    }
                  >
                    Verified
                  </Checkbox>
                  <Checkbox
                    isChecked={
                      filterState.verified === 2 || filterState.verified == 0
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        dispatch({
                          type: "VERIFIED",
                          payload: filterState.verified == -1 ? 0 : 2,
                        });
                      } else {
                        dispatch({
                          type: "VERIFIED",
                          payload: filterState.verified == 2 ? 1 : -1,
                        });
                      }
                    }}
                  >
                    Not Verified
                  </Checkbox>
                </HStack>
              </Box>
            </>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost">Reset All</Button>
            <Button
              colorScheme="primary"
              mr={3}
              onClick={() => {
                setApplyFilterState(filterState);
                onClose();
              }}
            >
              Apply All
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default FilterModal;
