import { Box, Text,Flex, HStack,IconButton, Icon, VStack,  List, ListItem, Checkbox, Button, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { MdOutlineTaskAlt } from "react-icons/Md";
import { AiOutlineArrowUp } from "react-icons/ai";
import { BsChevronExpand } from "react-icons/bs";
import { FiArrowRight, FiMoreHorizontal } from "react-icons/fi";
import { LuAlarmMinus } from "react-icons/lu";
import { GET_TASKS } from "@/graphQl/Queries/getTask";
import { useMutation, useQuery } from "@apollo/client/react";
import { UPDATE_TASK } from "@/graphQl/Mutation/doneTask";
import { useState } from "react";
import React from "react";

interface Task {
  _id: any
  title: string;
  description: string;
  status: string;
  priority: string;
}



const ListeTask = () => {
  const [Id, setId] = useState('')
  const [Status, setStatus] = useState('deja')
      const headerTask = [
        {
          name: ' Title'
        },
        {
          name: 'Status'
        },
        {
          name: 'Priority'
        }
     ];


  
    const { loading, data, error } = useQuery(GET_TASKS, {
    onCompleted: (data) =>{
    console.log('Data:',data);
    }, onError(error) {
      console.log('Error:', error.message);
    },
    });
  
  const [update, { }] = useMutation(UPDATE_TASK, {
    variables: {
      id: Id,
      status: Status
    }, onCompleted: () =>{
      console.log('all is ok')
    }, onError(error, clientOptions) {
      console.log(error.message);
      
    },
  })
  
  const taskDone = (id: any) => {
    setId(id)
    console.log(Id);
    
    update()
    
  }
    
  if (loading) return <p>Loading...</p>;
  
    return (
    <Flex mt={4} borderRadius={8} width={'100%'} borderWidth={'1px'}>
      <TableContainer width={'100%'}>
      <Table>
        <Thead>
            <Tr>
              <Th>
                 <Text color={'gray.500'} variant=''>
                    Task
                  </Text>
              </Th>
              {
                headerTask.map((name) => (
                <Th>
                <Button _hover={{
                  bg: "gray.100",
                  color: "black"
                }} rightIcon={<BsChevronExpand />} display={{ base:'none', sm:'block'}} fontSize={14} bg={'white'} color={'gray.500'}>
                  {name.name}
                </Button>
                  </Th>
                ))
              }
               <Th></Th>
          </Tr>
          </Thead>
           <Tbody>
            {
              data.getAllTasks.map((t: Task) => (
              <Tr>
              <Td>
                 <HStack spacing={0}>
                    <Checkbox sx={{ h: "20px", borderColor: "none", px: "12px", _checked:{ bg:"gray.200", h:"40px", borderRadius:"30px" }, _hover: { bg:"gray", h:"40px", borderRadius:'30px'}}} onChange={() => taskDone(t._id)} size='sm'/>
                    <Text variant=''>Task</Text>
                 </HStack>
              </Td>
              <Td>
                 <Stack direction={{ base: "column", sm: "row", md:"row"}} spacing={3}>
                   <Text color={'gray.700'} fontSize={'md'} variant=''>{t.title}</Text>
                   <Text color={'gray.400'} fontSize={'sm'} variant=''>{t.description}</Text>
                 </Stack>
              </Td>
              <Td>
                <HStack display={{ base: "none", sm:"flex"}} spacing={1}>
                  <Icon color={'gray.700'} boxSize={('15px')} as={t.status === 'todo'? LuAlarmMinus : MdOutlineTaskAlt }/>
                  <Text color={'gray.700'} fontSize={'sm'} variant=''>{t.status}</Text>
                </HStack>
              </Td>
              <Td>
                <HStack display={{ base: "none", sm:"flex"}} spacing={1}>
                  <Icon color={'gray.700'} boxSize={('15px')} as={t.priority === 'Medium'? FiArrowRight : AiOutlineArrowUp}/>
                  <Text color={'gray.700'} fontSize={'sm'} variant=''>{t.priority}</Text>
                </HStack>
              </Td>
              <Td display={{ base: "none", sm:"block"}}>
                <IconButton _hover={{ bg: "white"}} bg={'white'} icon={<FiMoreHorizontal/>} aria-label={''} />
              </Td>
            </Tr>
              ))
            }
          </Tbody>
      </Table>
      </TableContainer>
    </Flex>
    )
}
export default ListeTask;