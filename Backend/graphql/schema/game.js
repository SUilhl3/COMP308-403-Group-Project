export const gameTypeDefs = `
type Game {
    id: ID!,
    title: String!,
    platform: String,
    status: String,
    rating: Int,
    releaseDate: String,
    imageUrl: String
    createdAt: String
}

input AddGameInput {
    title: String!
    platform: String,
    status: String,
    rating: Int,
    releaseDate: String,
    imageUrl: String
    createdAt: String
}

input UpdateGameInput {
    title: String
    platform: String,
    status: String,
    rating: Int,
    releaseDate: String,
    imageUrl: String
}

type Query {
    myGames: [Game!]!
    game(id:ID!): Game!
}

type Mutation {
    addGame(input: AddGameInput!): Game!
    updateGame(id: ID!, input: UpdateGameInput!): Game!
    deleteGame(id:ID!):Game!
}
`