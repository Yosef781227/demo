import { Box, Button, useToast, VStack, Image, Text } from '@chakra-ui/react'
const Success = () => {
    const toast = useToast()
    return (
        <Box position={"sticky"}
            top={"calc(100vh - 250px)"}
            right={"50px"} h={"200px"} w={"500px"} bg={"white"} borderRadius={"12px"} stroke={"red"}>
            <Box>
                <VStack align={"start"} mb={"10px"}>
                    <Image src={`/warning.SVG`} alt="Icon" ml={"10px"} mt={"10px"} />
                    <Text fontSize={"lg"} fontWeight={"bold"} fontFamily={"body"} ml={"20px"} mt={"10px"}>
                        We are saving posts from @ beyond_lore
                    </Text>
                    <Text fontSize={"sm"} fontWeight={"medium"} fontFamily={"body"} ml={"20px"}  >
                        We will send you an email when all your posts <br /> have been saved.
                    </Text>
                </VStack>
            </Box>
        </Box>
    )
}

export default Success;