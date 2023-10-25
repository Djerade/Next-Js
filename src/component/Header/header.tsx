import theme from "@/styles/theme";
import { Search2Icon } from "@chakra-ui/icons";
import { Flex, HStack, Input, Text ,Icon, InputGroup, InputRightElement  } from "@chakra-ui/react"
import { FiBell } from "react-icons/fi";

const Header = () => {
    const data = new Date()
    return(
        <Flex shadow={'sm'} position={'sticky'} p={4} justify={{ base: "center", sm: "space-between", md: "space-between", lg:"space-between"}} h={{ base: "75px", small:"100px"}}  w={'full'} direction={'row'} >
            <Flex>
                <InputGroup>
                    <Input w={{ base: "xs", sm: "sm", md:"md", lg:"lg"}} placeholder='Search' />
                  <InputRightElement>
                    <Icon bgSize={'xs'} color={'gray.500'} as={Search2Icon} />
                  </InputRightElement>
                </InputGroup>
            </Flex>
            <Flex display={{ base: "none", sm: "block", md:"block", lg:'block'}}>
                <HStack  align={'center'}  spacing={9} mr={9}>
                    <Text fontSize={{ base: 'xs', sm:"sm", md:"md", lg:"lg"}} fontFamily={theme.fonts.body} color={'gray.500'}>{data.toLocaleDateString("en-US")}</Text>
                    <Icon color={'gray.500'} boxSize={'34px'} as={FiBell} />
                </HStack>
            </Flex>
        </Flex>
    )
}

export default Header;