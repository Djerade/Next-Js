import { Text, Flex, useDisclosure, HStack,IconButton, Center, Icon, Checkbox, Button, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Popover, PopoverTrigger, PopoverContent, PopoverBody } from "@chakra-ui/react";
import { MdOutlineTaskAlt } from "react-icons/Md";
import { AiOutlineArrowUp, AiOutlineDelete } from "react-icons/ai";
import { BsChevronExpand } from "react-icons/bs";
import { FiArrowRight, FiEdit2, FiMoreHorizontal } from "react-icons/fi";
import { useMutation, useQuery } from "@apollo/client/react";
import { FiCircle } from "react-icons/fi";
import { FiArrowDown } from "react-icons/fi";
import { useState } from "react";
import React from "react";
import { PopoverArrow } from "@chakra-ui/react";

//Mutation
import { UPDATE_TASK } from "@/graphQl/Mutation/doneTask";
import { DELETE_TASK } from "@/graphQl/Mutation/deleteTask";

//Queries
import { GET_TASKS } from "@/graphQl/Queries/getTasks";
import FormTask from "./editeForm";
import { DELETE_TASKS } from "@/graphQl/Mutation/deleteTasks";

interface Task {
  _id: any
  title: string;
  description: string;
  status: string;
  priority: string;
}

const ListeTask = () => {
  const [Id, setId] = useState('')
  const [allCheck, setallCheck] = useState(false)
  const [checkTask, setcheckTask] = useState(false)
  const [listTaskChecked, setlistTaskChecked] = useState<string[]>([])
  const [editeID, setediteID] = useState<string>()
  const [editeTITLE, setediteTITLE] = useState<string>()
  const [editeDESCRIPTION, setediteDESCRIPTION] = useState<string>()
  const [editePRIORITY, seteditePRIORITY] = useState<string>()
  const { isOpen, onOpen, onClose } = useDisclosure() 
  const [Status, setStatus] = useState('')
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
  const { loading, data } = useQuery(GET_TASKS, {
    pollInterval: 10,
    onError(error) {
      console.log('Error:', error.message);
    },
  });
  const [update, { }] = useMutation(UPDATE_TASK, {
    variables: {
      id: Id,
      status: Status
    },
    onError(error) {
      console.log(error.message);
    },
  })
  const [detete, { }] = useMutation(DELETE_TASK, { variables: { id: Id } })  
  const editTask = (id: string, title: string, description: string, priority: string) => {  
    setediteID(id)
    setediteTITLE(title)
    setediteDESCRIPTION(description),
    seteditePRIORITY(priority)
  }  
  const deleteTask = (id: any) => {
    setId(id)
    detete()
  }
  const taskDone = (id: any, status: string) => {
    if (status ==='DONE') {
      setStatus('TODO')
      setId(id)
      update()
    } else {
      setStatus('DONE')
      setId(id)
      update()
    }    
  } 
  async function MultipleDeleteTask() {
    for (let i = 0; i <= listTaskChecked.length; i++){
      var id: string;
      id = listTaskChecked[i];
      if (id != undefined ) {
        setId(id)
        await detete()
      }
    }
    listTaskChecked.length = 0;
  }

  function handleChande(id: string) {
    listTaskChecked.includes(id) ? setlistTaskChecked([...listTaskChecked.filter(Id => Id !== id)]) :  setlistTaskChecked([...listTaskChecked, id]);
  }

  if (loading) return <Center>Loading...</Center>;
  
    return (
    <Flex mt={4} flexDirection={'column'} borderRadius={8} width={'100%'} borderWidth={'1px'}>
      <TableContainer width={'100%'}>
      <Table>
        <Thead>
            <Tr>
                <Th>
                  <Flex  width={"100%"} color={'red'} flexDirection={'row'}>
                    {/* <Checkbox onChange={allCheckTask} sx={{ h: "20px", borderColor: "none", px: "6px", _checked: { bg: "gray.300",w: "20px", h: "20px", borderRadius: "30px" },  }}  size='sm' /> */}
                    <Text color={'gray.500'} variant=''>
                      Task
                    </Text>
                  </Flex>
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
                      <Checkbox
                        sx={{
                          h: "20px", borderColor: "none", px: "12px", _checked: { bg: "gray.300", h: "40px", borderRadius: "30px" },
                         _hover: { bg: "gray.100", h: "40px", borderRadius: '30px' }
                        }}
                        onChange={() => { taskDone(t._id, t.status),handleChande(t._id)}} size='sm' />
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
                  <Icon color={'gray.700'} boxSize={('15px')} as={t.status === 'TODO'? FiCircle  : MdOutlineTaskAlt }/>
                  <Text color={'gray.700'} fontSize={'sm'} variant=''>{t.status}</Text>
                </HStack>
              </Td>
              <Td>
                <HStack display={{ base: "none", sm:"flex"}} spacing={1}>
                  <Icon color={'gray.700'} boxSize={('15px')} as={t.priority === 'Medium'? FiArrowRight : t.priority ==='High'? AiOutlineArrowUp: FiArrowDown}/>
                  <Text color={'gray.700'} fontSize={'sm'} variant=''>{t.priority}</Text>
                </HStack>
              </Td>
              <Td>
                <Flex justifyContent={'center'}>
                  <Popover>
                    <PopoverTrigger>
                      <IconButton  _hover={{ bg: "gray.100"}} bg={'white'} icon={<FiMoreHorizontal/>} aria-label={''} />
                    </PopoverTrigger>
                    <PopoverContent  w={'100%'}>
                      <PopoverArrow />
                      <PopoverBody>
                        <Stack>
                          <Flex>
                            <IconButton onClick={() => { onOpen(), editTask(t._id, t.title, t.description, t.priority ) }} _hover={{ bg: "gray.100" }} bg={'white'} icon={<FiEdit2/>} aria-label={''} />
                            <FormTask nameHeader={'Edite '} nameButton={'save'} id={String(editeID)} title={String(editeTITLE)} description={String(editeDESCRIPTION)} priority={String(editePRIORITY)}  isOpen={isOpen} onClose={onClose} />
                          </Flex>
                         <IconButton onClick={()=> deleteTask(t._id)} _hover={{ bg: "gray.100"}} bg={'white'} icon={<AiOutlineDelete />} aria-label={''} />
                        </Stack>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Flex>
              </Td>
            </Tr>
              ))
            }
          </Tbody>
      </Table>
        </TableContainer>
        { listTaskChecked.length > 1 && <IconButton ml={8} bg={'red'} w={'24px'} aria-label='' onClick={MultipleDeleteTask}  icon={<AiOutlineDelete />}/>}
    </Flex>
    )
}
export default ListeTask;