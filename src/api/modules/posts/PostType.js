import User from '../users/UserType'

const Post = `
    type Post {
        id: ID
        title: String
        description: String!
        users: User
    }

    extend type Query {
        getPosts: [Post]
    }

    input PostInput {
        id: ID
        title: String
        description: String!
        user_id: ID!
    }

    extend type Mutation {
        createPost(input: PostInput): Post
    }

`

export default () => [Post, User]
