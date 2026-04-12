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

export const UPDATE_USER = gql`
mutation UpdateUser($id: ID!, $input: updateInput!)
{
  updateUser(id: $id, input: $input)
  {
    id
    username
    email
  }
}
`

export const DELETE_USER = gql`
mutation DeleteUser($id: ID!)
{
  deleteUser(id: $id)
}
`

export const ADD_GAME = gql`
mutation AddGame($input: AddGameInput!)
{
  addGame(input: $input)
  {
    title
    platform
    description
    status
    rating
    releaseDate
    imageUrl
  }
}
`