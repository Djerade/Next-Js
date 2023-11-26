import { gql } from "@apollo/client";

export const UPDATE_TASK = gql`
mutation doneTask(
  $id: String!,
  $status: String!
){
  doneTask(
    _id: $id,
    status: $status
  ){
    title
    description
    status
  }
}
`