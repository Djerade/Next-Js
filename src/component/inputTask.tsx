import { Flex, Input } from "@chakra-ui/react"

const InputTask = () => {
    return(
    <Flex    boxShadow={"2xl"} pb={2} pt={2} pr={4} pl={4} borderRadius={15} m={2}  width={'30%'} align={'center'} >
        <Input  placeholder="Title" focusBorderColor="red" size={'sm'}>
        </Input>
    </Flex>
    )
}

export default InputTask 