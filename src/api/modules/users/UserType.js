import * as UserLoader from './UserLoader'

const usersAttribs = `
    id: ID
    name: String!
    email: String!
    password: String!
`

export const typeDefs = `

    type User {
        ${usersAttribs}
    }

    type UserWithoutPassword {
        id: ID
        name: String!
        email: String!
    }

    type AuthPayload {
        token: String
        user: User
    }

    input Search {
      limit: Int
      offset: Int
      text: String
    }

    type Query {
        getUser(id: ID!): UserWithoutPassword
        getUsers(q: Search): [UserWithoutPassword]
    }

    input UserInput {
        ${usersAttribs}
    }

    input LoginInput {
        email: String!
        password: String!
    }

    type Mutation {
        createUser(input: UserInput): User
        deleteUser(id: ID!): User
        updateUser(input: UserInput): User
        login(input: LoginInput): AuthPayload
    }
`

export const resolvers = {
  Query: {
    getUsers: (_, data) => UserLoader.loadUsers(data),
    getUser: (_, data) => UserLoader.loadUser(data)
  },
  Mutation: {
    createUser: (_, data) => UserLoader.createUser(data),
    updateUser: (_, data) => UserLoader.updateUser(data),
    deleteUser: (_, data, ctx, info) => UserLoader.deleteUser(_, data, ctx, info),
    login: (_, data) => UserLoader.login(data)
  }
}
