import Head from "next/head";
import { Heading,Stack, Text, Box, Flex,IconButton, Input, FormControl, Button, HStack, Divider, Checkbox } from "@chakra-ui/react";
import theme from "@/styles/theme";
import { useState } from "react";
import { Textarea } from "@chakra-ui/react";
import { CalendarIcon, DeleteIcon } from "@chakra-ui/icons";
import { BsBarChart } from "react-icons/bs";
import { Outlet } from "react-router-dom";

//Component
import ListeTask from "@/component/ListTaxk";
import SidenavContainer from "@/component/Sidebar/SidenavContainer";
import { SidenavItem } from "@/component/Sidebar/interfaceNav";
import Sidenave from "@/component/Sidebar/sidenav";

interface Task {
  title: String;
  description: String;
  completed: Boolean;
}

export default function Home() {

  const [listTask, setlistTask] = useState<Task[]>([])
  const [newTask, setnewTask] = useState({
    title: '',
    description: '',
    completed: false
  })

  const handleChange = (event: any) =>{
    setnewTask({
      ...newTask,
      [event.target.name] : event.target.value
    })
  }
  
  const addTask = () =>{
   setlistTask([...listTask, newTask]) 
   setnewTask({
    title: '',
    description: '',
    completed: false
   })
  }

  const doneTask = (id: number) =>{
    const task = listTask[id]
    if (task.completed == true) {
      task.completed = false
    } else {
      if ( task.completed == false ) {
        task.completed = true
      }
    }
  }

  const deleteTask = (id: number) =>{
     const newListTask = listTask.filter((item : Task, index) => index != id)
     setlistTask(newListTask)
   }  



   
  return (
    <>
      <main>
        <Stack p={2} pr={5} justify={'center'}  width={'100%'} alignItems={'center'}  direction={{ base: 'column', md: "column", lg: 'column'}} spacing={0}>
          <Flex width={'100%'} direction={{  base: 'column', sm:"row", md:'row', lg:'row'}}>
             <Outlet />
            <Divider orientation='vertical' />
            <Flex  justify={'center'} h={'20%'} direction={"column"} m={2}  width={{ base: "100%", sm:'50%', md:"50%",lg:"50%"}} align={'center'} >
              <Flex width={'100%'} p={4} align={'center'} justify={'space-between'}  m={{ base: '0', md: '5', lg: "5"}} >
                <Text  fontWeight={700} color={"gray.400"} fontFamily={theme.fonts.body} >
                    New Task
                </Text>
              </Flex>
              <FormControl  width={'100%'} >
                <Input value={newTask.title} onChange={handleChange} type="text" w={'100%'} name="title"  placeholder="Title"  fontSize={{ base: '14px', sm:"15px", md:'15px', lg:"15px"}} />
              </FormControl>
              <FormControl mt={5} mb={5} width={'100%'} >
                <Textarea value={newTask.description} onChange={handleChange} name="description" size={"sm"} placeholder='description' />
              </FormControl>
              { newTask.title && <Button padding={"24px"} width={{base: "100px", sm: "150px", md: "150px", lg: "150px"}}  _hover={{ bg:"gray",color:"white"}} onClick={addTask} bgColor={'black'} p={5} color={'white'}>Add</Button>}
            </Flex>
            <Flex direction={'column'} width={{ base: "100%", sm:'30%',md:"30%",lg:"30%"}} >
              <Flex width={'100%'} p={4} align={'center'} justify={'space-between'}  m={{ base: '0', md: '5', lg: "5"}} >
                <Text  fontWeight={700} color={"black.400"} fontFamily={theme.fonts.body} >
                   All tasks
                </Text>
              </Flex>
              <Flex w={"100%"}  direction={'column'}>
                  {
                  listTask &&  listTask.map(({title, description, completed}, index) =><Box  m={0} flexDirection={'column'} h={'-moz-initial'} w={{ base: "100%", md: '100%', lg:"100%"}} >
                  <Flex boxShadow={"2xl"} pb={2} pt={2} pr={4} pl={4} borderRadius={15} m={2}  width={'-moz-fit-content'} align={'center'} justify={'space-between'} direction={'row'}>
                    <Checkbox  sx={{
                      h: '20px',
                      borderColor:'none',
                      px: "12px",
                          _hover: {
                            bg: 'gray',
                            h: "40px",
                            borderRadius: '30px',
                          },
                          _checked: {
                            bg: 'gray',
                            h: "40px",
                            borderRadius: '30px',
                          }
                    }} colorScheme="gray" onChange={() => doneTask(index)} />
                    <ListeTask title={title} description={description} completed={completed}  />
                    <IconButton onClick={() => deleteTask(index)} aria-label={"delete"} icon={<DeleteIcon/>} />
                  </Flex>
                  </Box> )
                }
              </Flex>
            </Flex>
          </Flex>
        </Stack>
      </main>
    </>
  );
}

