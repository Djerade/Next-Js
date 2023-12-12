import { Text, Flex, useDisclosure, HStack,IconButton, Center, Icon, Checkbox, Button, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Popover, PopoverTrigger, PopoverContent, PopoverBody, flexbox, VStack, Input } from "@chakra-ui/react";
import { MdOutlineTaskAlt } from "react-icons/Md";
import { AiOutlineArrowUp, AiOutlineDelete } from "react-icons/ai";
import { BsChevronExpand } from "react-icons/bs";
import { FiArrowRight, FiEdit2, FiMoreHorizontal } from "react-icons/fi";
import { useMutation, useQuery } from "@apollo/client/react";
import { FiCircle } from "react-icons/fi";
import { FiArrowDown } from "react-icons/fi";
import { useState, useEffect } from "react";
import React from "react";
import { PopoverArrow } from "@chakra-ui/react";

//Mutation
import { UPDATE_TASK } from "@/graphQl/Mutation/doneTask";
import { DELETE_TASK } from "@/graphQl/Mutation/deleteTask";

//Queries
import { GET_TASKS } from "@/graphQl/Queries/getTasks";
import FormTask from "./editeForm";
import { RiEqualizerLine } from "react-icons/ri";
import { FiPlusCircle } from 'react-icons/fi';
import MobileList from "./mobileList";

interface Task {
  _id: any
  title: string;
  description: string;
  status: string;
  priority: string;
}

const ListeTask = () => {
  const [Id, setId] = useState('')
  const [search, setsearch] = useState<string>('')
  const [taskList, settaskList] = useState<Task>()
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

  useEffect(() => {
    settaskList(data)
  }, [data]);
  const [detete, { }] = useMutation(DELETE_TASK, { variables: { id: Id } })  
  const editTask = (id: string, title: string, description: string, priority: string) => {  
    setediteID(id)
    setediteTITLE(title)
    setediteDESCRIPTION(description),
    seteditePRIORITY(priority)
  }  

  // console.log('data found',data.getAllTasks.filter((task: Task) => task.title.includes("ti")));
  
  async function deleteTask(id: any) {
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

  function handleCheck(id: string) {
    listTaskChecked.includes(id)
      ? setlistTaskChecked([...listTaskChecked.filter(Id => Id !== id)])
      : setlistTaskChecked([...listTaskChecked, id]);
  }

  function filterTask(): Task[] {
    return data?.getAllTasks.filter((task: Task) => {
                  return search.toLowerCase() === ''
                    ? task
                    : task.title.toLowerCase().includes(search)
                })
  }

  if (loading) return <Center>Loading...</Center>;
  
  return (
    <>
      <Flex justify={{ base:"center", sm:'center',  md:"space-between", lg:"space-between"}} >
        <HStack  spacing={5}>
          <Input onChange={(t) => setsearch(t.target.value)}  fontSize={14} h={{ base: 6, sm: 7, md: 8, lg:9 }} placeholder='Filter tasks...' height={{base: "10", sm:"md"}}  size={{ base:"xs", md:'md', lg:"lg" }} w={{ base: "md", sm: "lg", md: "md", lg: "lg" }} />
          <Button display={{base: "none", sm:"block"}} fontSize={14} h={{ base: 6, sm: 7, md: 8, lg:9 }} fontWeight={'normal'} color={'gray.700'}  borderWidth={"1px"} bg={'white'} leftIcon={<FiPlusCircle/>}>
              Status
          </Button>
          <Button  display={{base: "none", sm:"block"}} fontSize={14} h={{ base: 6, sm: 7, md: 8, lg: 9 }} fontWeight={'normal'} color={'gray.700'} borderWidth={"1px"} bg={'white'} leftIcon={<FiPlusCircle/>}>
              Priority
          </Button>
        </HStack>
        <Button fontSize={14} display={{base: "none", sm:"block"}} h={{ base: 6, sm: 7, md: 8, lg: 9 }} fontWeight={'normal'} color={'gray.700'} borderWidth={"1px"} bg={'white'} leftIcon={<RiEqualizerLine /> }>
           View
        </Button>
      </Flex>
      <MobileList TaskList = {filterTask} />
      <Flex display={{ base: 'none', sm: "none", md: 'block', lg: "block" }} mt={4} flexDirection={'column'} borderRadius={8} width={'100%'} borderWidth={'1px'}>
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
             filterTask().map((t: Task) => (
              <Tr key={t._id}>
              <Td>
                 <HStack spacing={0}>
                      <Checkbox
                        sx={{
                          h: "20px", borderColor: "none", px: "12px", _checked: { bg: "gray.300", h: "40px", borderRadius: "30px" },
                         _hover: { bg: "gray.100", h: "40px", borderRadius: '30px' }
                        }}
                        onChange={() => { taskDone(t._id, t.status),handleCheck(t._id)}} size='sm' />
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
    </>
    )
}

export default ListeTask;