"use client"
import { NextPage } from 'next'
import { Text, Box, Flex, Select, Input, Button, Heading, HStack, IconButton, Modal, useDisclosure, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import theme from "@/styles/theme";
import logo from 'public/assets/03.png';
import Image from 'next/image';
import { IoMdAdd } from "react-icons/io";
import { useMutation, useQuery } from '@apollo/client';
import { useRef } from 'react';
import React from 'react';


//Components
import ListeTask from '@/component/ListTask';

//Mutation
import { CREATE_TASK } from '@/graphQl/Mutation/createTask';

interface Props { }
interface Task{
  title: string;
  description: string;
  priority: string;
  status: string;
}
const Home: NextPage<Props> = ({ }) => {

  const { isOpen, onOpen, onClose } = useDisclosure() 
  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const [value, setvalue] = React.useState<Task>({
    title: "",
    description: "",
    priority: "",
    status:"TODO"
  });
  const [create, { data, loading, error }] = useMutation(CREATE_TASK, {
    variables:{
      title: value.title,
      description: value.description,
      status: value.status,
      priority: value.priority
    },onError(error) {
      console.log(error.message);
    },
  });
  const handleChange = (event: any) => {
    setvalue({
      ...value,
      [event.target.name]: event.target.value
    })
  }
  const handleSubmit = () => {  
    create()
  }  
  return <Flex justifySelf={'center'}  p={5}  direction={'column'}>
    <Flex justifySelf={'center'}  w={'100%'} align={'center'} justify={'space-between'}>
      <Flex   mb={7} direction={'column'}>
      <Heading  as='h3' size='lg' mb={1} >Welcome back!</Heading>
      <Text color={'gray.400'} fontFamily={theme.fonts.body} >Here's a list of your tasks for this Day !</Text>
    </Flex>
    <Box mr={5} w={{ base:"35px", sm:"35px", md:"35px", lg:"40px"}}>
      <Image  src={logo}  alt={'image'}/>
    </Box>
    </Flex>
    <ListeTask  />
    <Flex mt={10} justify={'end'}>
      <IconButton _hover={{ bg: "gray" }} color={'white'} bg={'black'} onClick={onOpen} icon={<IoMdAdd />} aria-label={''} />
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader >Create task</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <Input value={value.title} name='title' type='text' onChange={handleChange} placeholder='Title'/>
              </FormControl>
              <FormControl isRequired mt={5}>
                <Textarea value={value.description} name='description'  onChange={handleChange} placeholder='Description'/>
              </FormControl>
              <FormControl isRequired mt={5}>
                <Select value={value.priority} placeholder={'Priority'} name='priority' onChange={handleChange} >
                  <option value='High'>High</option>
                  <option value='Medium'>Medium</option>
                  <option value='Low'>Low</option>
                </Select>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button bg={'black'} onClick={() =>{onClose(), handleSubmit()}} color={"white"} >Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  </Flex>
}



export default Home


