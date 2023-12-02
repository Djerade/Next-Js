import { gql } from "@apollo/client";

export const DELETE_TASKS = gql`
    mutation deleteAllTask {
        deleteAllTask 
    }
`