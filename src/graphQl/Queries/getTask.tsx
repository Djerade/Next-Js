import { gql } from "@apollo/client";

export const GET_TASK = gql`
query getTask(
  $id: String!
){
  getTask(_id: $id){
    title
    description
    priority
    status
  }
}
`