import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation RegisterUser($username: String!, $password: String!, $email: String!) {
    registerUser(username: $username, password: $password, email: $email) {
      id
      username
      email
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      id
      username
      email
    }
  }
`;

export const LOGOUT_USER = gql`
mutation LogoutUser
{
  logoutUser
}
`