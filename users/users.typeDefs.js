import { gql } from 'apollo-server';

export default gql`
  type User {
    id: String!
    username: String!
    email: String!
    name: String!
    location: String
    avatarURL: String
    githubUsername: String
    createdAt: String!
    updatedAt: String!
  }
  type CreateAccountResponse {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createAccount(
      username: String!
      name: String!
      email: String!
      password: String!
      location: String
      avatarURL: String
      githubUsername: String
    ): CreateAccountResponse
  }
  type Query {
    seeProfile(username: String): User
  }
`;
