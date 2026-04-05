export const userTypeDefs = `
type User {
    id: ID!,
    username: String!,
    email: String!
}

type Query {
    users: [User!]!
    me: User
}

type Mutation {
    registerUser(
        username: String!,
        password: String!,
        email: String!
    ) : User!

    loginUser(
        username: String!,
        password: String!
    ) : User!
    
    logoutUser : String!
}
`