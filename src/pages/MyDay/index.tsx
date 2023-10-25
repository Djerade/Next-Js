import { NextPage } from 'next'
import { Stack, Text, Box, Flex,IconButton, Input, FormControl, Button, Divider, Checkbox, Heading } from "@chakra-ui/react";
import theme from "@/styles/theme";
import { useState } from "react";
import { Textarea } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Outlet } from "react-router-dom";
import { RiFilter3Fill } from "react-icons/ri";

//Component
import ListeTask from "@/component/ListTaxk";


interface Props {}
interface Task {
  title: String;
  description: String;
  completed: Boolean;
}

const ToDay: NextPage<Props> = ({}) => {
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


  return <>
    <Stack p={2} pr={5} justify={'center'}  width={'100%'} alignItems={'center'}  direction={{ base: 'column', md: "column", lg: 'column'}} spacing={0}>
      <Flex width={'100%'} direction={{  base: 'column', sm:"row", md:'row', lg:'row'}}>
         <Outlet />
        <Divider orientation='vertical' />
        <Flex  justify={'center'} direction={"column"} m={2}  width={{ base: "100%", sm:'50%', md:"50%",lg:"50%"}} align={'center'} >
          <Flex width={'100%'} p={4} align={'center'} justify={'space-between'}  m={{ base: '0', md: '5', lg: "5"}} >
            <Heading  fontWeight={700}  fontFamily={theme.fonts.body} >
                New Task
            </Heading>
          </Flex>
          <FormControl  width={'100%'} >
            <Input value={newTask.title} onChange={handleChange} type="text" w={'100%'} name="title"  placeholder="Title"  fontSize={{ base: '14px', sm:"15px", md:'15px', lg:"15px"}} />
          </FormControl>
          <FormControl mt={5} mb={5} width={'100%'} >
            <Textarea value={newTask.description} onChange={handleChange} name="description" size={"sm"} placeholder='description' />
          </FormControl>
          { newTask.title && <Button padding={"24px"} width={{base: "100px", sm: "150px", md: "150px", lg: "150px"}}  _hover={{ bg:"gray",color:"white"}} onClick={addTask} bgColor={'black'} p={5} color={'white'}>Add</Button>}
        </Flex>
        <Flex direction={'column'} width={{ base: "100%", sm:'50%',md:"50%",lg:"50%"}} >
          <Flex width={'100%'} p={4} align={'center'} justify={'space-between'}  m={{ base: '0', md: '5', lg: "5"}} >
            <Text  fontWeight={700} color={"black.400"} fontFamily={theme.fonts.body} >
               All tasks
            </Text>
            <IconButton bg={'white'} boxSize={"30px"} icon={<RiFilter3Fill />} aria-label={''}/>
          </Flex>
          <Flex w={"100%"}  direction={'column'}>
              {
              listTask &&  listTask.map(({title, description, completed}, index) =><Box  m={0} flexDirection={'column'} h={'-moz-initial'} w={{ base: "100%", md: '100%', lg:"100%"}} >
              <Flex boxShadow={"xl"} pb={2} pt={2} pr={4} pl={4} borderRadius={15} m={2}  width={'-moz-fit-content'} align={'center'} justify={'space-between'} direction={'row'}>
                <Flex align={'center'}>
                  <Checkbox
                    mr={{ base:  14, small: 14, md:14, lg:14}}
                    sx={{
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
                </Flex>
                <IconButton onClick={() => deleteTask(index)} aria-label={"delete"} icon={<DeleteIcon/>} />
              </Flex>
              </Box> )
            }
          </Flex>
        </Flex>
      </Flex>
    </Stack>
  </>
}

export default ToDay