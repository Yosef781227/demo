import { HStack, Text } from '@chakra-ui/layout'
import Buttons from '../Buttons/Button'
import AddIcon from '@/assets/icons/AddIcon'

export default function CollectionPageTopNavBar() {
  return (
    <HStack bg="white" px="5" justifyContent={"space-between"}>
    <Text color={"black"} fontWeight={"semibold"} fontSize={"1.1rem"}>
      Content
    </Text>
    <HStack py="5">
    <Buttons icon={<AddIcon />} text="New Collection" />
</HStack>
  </HStack>
  )
}
