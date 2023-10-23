import { Flex, HStack, Text ,Icon  } from "@chakra-ui/react"

const Header = () => {
    const data = new Date()
    console.log('date', data.toLocaleString());
    
    return(
        <Flex shadow={'sm'}  position={'sticky'} p={4} justify={'space-between'} h={"100px"}  w={'full'} direction={'row'} >
            <Flex>

            </Flex>
            <HStack align={'center'} spacing={8}>
                <Text variant=''>{data.toLocaleDateString("en-US")}</Text>
                <Icon/>
            </HStack>
        </Flex>
    )
}

export default Header;