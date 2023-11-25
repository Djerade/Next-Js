import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
mutation createTask(
  $title: String!
  $description: String
  $priority: String
  $status: String
){
  createTask(
    title: $title
    description: $description
    priority: $priority
    status: $status
    
  ){
    title
    description
    priority
    status
  }
}
`