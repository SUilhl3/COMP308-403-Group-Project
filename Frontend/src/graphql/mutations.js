import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    registerUser(username: $username, email: $email, password: $password) {
      message
      user {
        id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      message
      user {
        id
        username
        email
      }
    }
  }
`;