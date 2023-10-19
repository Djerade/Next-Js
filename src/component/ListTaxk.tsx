import { Box, Text,Flex, HStack,IconButton, Icon, VStack,  List, ListItem, Checkbox, Button } from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon, DeleteIcon } from '@chakra-ui/icons'


const ListeTask = ( props: {
    title: String,
    description: String,
    completed: Boolean
}) => {

    const { title, description, completed} = props;

    return (
    <Flex maxW={{ base: "90%", sm: "90%", md: "90%", lg: "90%"}} direction={'column'}>
        <Text as={'h2'} fontSize={20}  variant=''> {title}</Text>
        <Text  fontSize={14} >
            {description}
        </Text>
      </Flex>
    )
}
export default ListeTask;