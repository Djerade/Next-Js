import { Button, Flex, FormControl, Input, Select, Textarea, Heading } from '@chakra-ui/react';
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
//Mutation
import { EDITE_TASK } from '@/graphQl/Mutation/editeTask';
//Queries
import { GET_TASK } from '@/graphQl/Queries/getTask';

interface Props {}
const edite: NextPage<Props> =  ({ }) => {
  const router = useRouter();
  const {  data } = useQuery(GET_TASK, {
    variables: {
      id: router.query.id
    },
    onError(error) {
      console.log('Error:', error.message);
    },
   });
  const [newTitle, setTitle] = useState(data?.getTask?.title)
  const [newDescription, setDescription] = useState(data?.getTask?.description)
  const [newPriority, setPriority] = useState(data?.getTask?.priority)
  const home = () => {    
    router.push(`/`)
   }
  const handleSubmit = () => {
     edite()
  }
  const [edite] = useMutation(EDITE_TASK, {
    variables: {
      id: router.query.id,
      title: newTitle,
      description: newDescription,
      priority: newPriority
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
           />
      </FormControl>
      <FormControl isRequired mt={5}>
          <Textarea
             onChange={(e) => setDescription(e.target.value)}
             value={newDescription}
            name='newDescription'
            />
      </FormControl>
      <FormControl isRequired mt={5}>
          <Select
            onChange={(e) => setPriority(e.target.value)}
            value={newPriority}
            name='newPriority'  >
          <option value='High'>High</option>
          <option value='Medium'>Medium</option>
          <option value='Low'>Low</option>
        </Select>
      </FormControl>
      </form>
      <Flex align={'center'} justify={'space-between'} mt={10}  flexDirection={{ base: "column", sm: "row", md: "row" }}>
        <Button bg={'black'} onClick={() =>{home(), handleSubmit()}} color={"white"} >Save</Button>
        <Button onClick={home} mt={2} colorScheme="gray" mr={3} >
          Cancel
        </Button>
      </Flex>
    </Flex>
  </Flex>
}

export default edite