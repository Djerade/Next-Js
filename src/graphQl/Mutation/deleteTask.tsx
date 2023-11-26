import { gql } from "@apollo/client";

export const DELETE_TASK = gql`
mutation deleteTask(
  $id: String!
){
  deleteTask(_id: $id){
    title
  }
}

`