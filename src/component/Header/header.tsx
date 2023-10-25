import theme from "@/styles/theme";
import { Search2Icon } from "@chakra-ui/icons";
import { Flex, HStack, Input, Text ,Icon, InputGroup, InputRightElement  } from "@chakra-ui/react"
import { FiBell } from "react-icons/fi";

const Header = () => {
    const data = new Date()
    return(
        <Flex shadow={'sm'}   position={'sticky'} p={4} justify={'space-between'} h={"100px"}  w={'full'} direction={'row'} >
            <Flex>
                <InputGroup>
                  <Input w={"md"} placeholder='Search' />
                  <InputRightElement>
                    <Icon color={'gray.500'} as={Search2Icon} />
                  </InputRightElement>
                </InputGroup>
            </Flex>
            <HStack align={'center'}  spacing={9} mr={9}>
                <Text fontFamily={theme.fonts.body} color={'gray.500'}>{data.toLocaleDateString("en-US")}</Text>
                <Icon color={'gray.500'} boxSize={'34px'} as={FiBell} />
            </HStack>
        </Flex>
    )
}

export default Header;