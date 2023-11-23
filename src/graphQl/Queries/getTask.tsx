import { gql } from "@apollo/client";

export const GET_TASKS = gql`
query{
  getAllTasks{
    _id
    title
    description
    status
    priority
  }
}
`
