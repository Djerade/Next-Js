import { Button, Flex, useDisclosure,FormControl, IconButton, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Textarea, flexbox } from '@chakra-ui/react';
import { NextPage } from 'next'
import router, { useRouter } from 'next/router'
import { IoMdAdd } from 'react-icons/io';
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
  status: string;
}
const edite: NextPage<Props> = ({ }) => {
  const router = useRouter();
  const [ID, setID] = useState("")
  const [Title, setTitle] = useState("")
  const [Description, setDescription] = useState("")
  const [Priority, setPriority] = useState("")
  
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

  const [edite, { loading, }] = useMutation(EDITE_TASK, {
    variables:{
      title: String(Title),
      description: String(Description),
      priority: String(Priority)
    }, onCompleted: (data) => {
      console.log("Data:",data);
    }, onError(error) {
      console.log('Error:', error.message);
    },
  });

  const handleSubmit = () => {
    edite()
  }
  return <Flex>
    <Flex mt={10} w={'100%'} justify={"center"} >
      <form onSubmit={handleSubmit}>
      <FormControl isRequired>
        <Input  name='title' value={Title}  type='text' onChange={(e)=>setTitle(e.target.value)}  placeholder='Title'/>
      </FormControl>
      <FormControl isRequired mt={5}>
        <Textarea onChange={(e)=>setDescription(e.target.value)} value={Description} name='description'   placeholder='Description'/>
      </FormControl>
      <FormControl isRequired mt={5}>
        <Select  onChange={(e)=>setDescription(e.target.value)} value={Description}  name='priority'  >
          <option value="..."></option>
          <option value='High'>High</option>
          <option value='Medium'>Medium</option>
          <option value='Low'>Low</option>
        </Select>
      </FormControl>
      </form>
      <Button colorScheme="gray" mr={3} >
              Cancel
      </Button>
      <Button bg={'black'} onClick={() =>{ handleSubmit()}} color={"white"} >Save</Button>
    </Flex>
  </Flex>
}

export default edite