import { gql } from "@apollo/client";

export const EDITE_TASK = gql`
mutation updateTask(
  $id: String!,
  $title: String,
  $description: String,
  $priority: String
){
  updateTask(
    _id: $id,
    title: $title,
    description: $description,
    priority: $priority
  ){
    title
  }
}

`