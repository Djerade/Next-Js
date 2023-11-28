import { Button, Flex, useDisclosure, Text,FormControl, IconButton, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Textarea, flexbox, Heading } from '@chakra-ui/react';
import { NextPage } from 'next'
import router, { useRouter } from 'next/router'
import React, { useState } from 'react';
import { useRef } from 'react';
import { EDITE_TASK } from '@/graphQl/Mutation/editeTask';
import { useMutation, useQuery } from '@apollo/client';
import { GET_TASKS } from '@/graphQl/Queries/getTasks';
import { GET_TASK } from '@/graphQl/Queries/getTask';

interface Props {}
interface Task{
  title: string;
  description: string;
  priority: string;
}
const edite: NextPage<Props> =  ({ }) => {
  const router = useRouter();
  const [ID, setID] = useState("")
   const {  data, error } = useQuery(GET_TASK, {
    variables: {
      id: router.query.id
    }, onCompleted: (data) => {
      console.log("Datas:",data);
    },
    onError(error) {
      console.log('Error:', error.message);
    },
   });
  

  
  
  const [newTitle, setTitle] = useState("")
  const [newDescription, setDescription] = useState("")
  const [newPriority, setPriority] = useState("")


  const handleSubmit = () => {
     edite()
  }
  
  const [edite, { loading, }] = useMutation(EDITE_TASK, {
    variables: {
      id: router.query.id,
      title: newTitle,
      description: newDescription,
      priority: newPriority
    }, onCompleted: (data) => {
      console.log("Data-edite:",data);
    }, onError(error) {
      console.log('Error:', error.message);
    },
  });

  return <Flex>
    <Flex mt={10} w={'100%'} align={"center"} flexDirection={'column'} justify={"center"} >
      <Heading  as='h3' size='lg' mb={1} >Edit task</Heading>
       <form onSubmit={handleSubmit}>
      <FormControl isRequired>
          <Input name='newTitle'
            value={newTitle}
            type='text'
            onChange={(e) => setTitle(e.target.value)}
            placeholder={data?.getTask?.title} />
      </FormControl>
      <FormControl isRequired mt={5}>
          <Textarea
             onChange={(e) => setDescription(e.target.value)}
             value={newDescription}
            name='newDescription' placeholder={data?.getTask?.description}  />
      </FormControl>
      <FormControl isRequired mt={5}>
          <Select
            onChange={(e) => setPriority(e.target.value)}
            value={newPriority}
            placeholder={data?.getTask?.priority} 
            name='newPriority'  >
          <option value='High'>High</option>
          <option value='Medium'>Medium</option>
          <option value='Low'>Low</option>
        </Select>
      </FormControl>
      </form>
      <Flex   mt={10} flexDirection={{ base: "column", sm:"row", md:"row"}}>
      <Button colorScheme="gray" mr={3} >
        Cancel
      </Button>
      <Button bg={'black'} onClick={() =>{ handleSubmit()}} color={"white"} >Save</Button>
      </Flex>
    </Flex>
  </Flex>
}

export default edite