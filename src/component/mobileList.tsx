import { Text, Flex, useDisclosure, HStack,IconButton, Icon } from "@chakra-ui/react";
import { AiOutlineArrowUp, AiOutlineDelete } from "react-icons/ai";
import { FiArrowRight, FiEdit2 } from "react-icons/fi";
import { useMutation } from "@apollo/client/react";
import { FiArrowDown } from "react-icons/fi";
import { useState } from "react";
import React from "react";
import FormTask from "./editeForm";

//Mutation
import { DELETE_TASK } from "@/graphQl/Mutation/deleteTask";

interface Task {
  _id: any
  title: string;
  description: string;
  status: string;
  priority: string;
}

const MobileList = (props: {
  TaskList: () => Task[]
}) => {
  const { TaskList } = props  
  const [Id, setId] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure() 
  const [editeID, setediteID] = useState<string>()
  const [editeTITLE, setediteTITLE] = useState<string>()
  const [editeDESCRIPTION, setediteDESCRIPTION] = useState<string>()
  const [editePRIORITY, seteditePRIORITY] = useState<string>()
  const editTask = (id: string, title: string, description: string, priority: string) => {  
    setediteID(id)
    setediteTITLE(title)
    setediteDESCRIPTION(description),
    seteditePRIORITY(priority)
  }  
  const [detete, { }] = useMutation(DELETE_TASK, { variables: { id: Id } })  
  const deleteTask = (id: any) => {    
    setId(id)
    detete()
  }
  return <>
    {
      TaskList()?.map((t: Task) => (
       <Flex key={t._id} bg={"whiteAlpha.400"} pb={3} border="1px" borderColor={'gray.200'} shadow={'md'} mb={3} mt={5} borderRadius=  {10} pr={6} pt={2}  pl={6} w={'full'}  display={{ base:'block', sm: "block", md:'none', lg:"none" }} flexDirection={'column'}>
        <HStack mb={5} justify={'end'}  spacing={3}>
            <Flex>
              <IconButton onClick={() => { onOpen(), editTask(t._id, t.title, t.description, t.priority ) }} _hover={{ bg: "gray.100" }} bg={'white'} icon={<FiEdit2/>} aria-label={''} />
              <FormTask nameHeader={'Edite '} nameButton={'save'} id={String(editeID)} title={String(editeTITLE)} description={String(editeDESCRIPTION)} priority={String(editePRIORITY)}  isOpen={isOpen} onClose={onClose} />
            </Flex>
           <IconButton onClick={()=> deleteTask(t._id)} _hover={{ bg: "gray.100"}} bg={'white'} icon={<AiOutlineDelete />} aria-label={''} />
        </HStack>
        <Flex borderRadius={5} pl={2} pr={2} mb={3} justify={'space-between'} flexDirection={'row'}>
          <Text color={'gray.500'}>
              Title
          </Text>
          <Text fontWeight={'normal'}>
            { t.title }
          </Text>
        </Flex>
        <Flex p={1} borderRadius={5} pl={3} pr={3}  bg={'gray.100'} mb={3} justify={'space-between'} flexDirection={'row'}>
          <Text color={'gray.500'}>
              Description
          </Text>
          <Text fontWeight={'normal'}>
            { t.description }
          </Text>
        </Flex>
        <Flex borderRadius={5}  pl={2} pr={2} mb={3} justify={'space-between'} flexDirection={'row'}>
          <Text color={'gray.500'}>
              Status
          </Text>
          <Text fontWeight={'normal'}>
            { t.status }
          </Text>
        </Flex>
        <Flex p={2} bg={'gray.100'} borderRadius={5}  pl={2} pr={2} mb={3} justify={'space-between'} flexDirection={'row'}>
            <Text color={'gray.500'} fontSize={'sm'} variant=''>{t.priority}</Text>
            <Icon color={'gray.700'} boxSize={('15px')} as={t.priority === 'Medium'? FiArrowRight : t.priority ==='High'? AiOutlineArrowUp: FiArrowDown}/>
        </Flex>
    </Flex>
      ))
    }
  </>
}

export default MobileList;