import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    me {
      id
      username
      email
      role
    }
  }
`;

export const GET_MY_GAMES = gql`
  query GetMyGames {
    myGames {
      id
      title
      platform
      description
      status
      rating
      releaseDate
      imageUrl
      createdAt
    }
  }
`;

export const GET_GAME = gql`
  query GetGame($id: ID!) {
    game(id: $id) {
      id
      title
      platform
      description
      status
      rating
      releaseDate
      imageUrl
      createdAt
    }
  }
`;