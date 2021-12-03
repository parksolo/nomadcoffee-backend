import { gql } from 'apollo-server';

export default gql`
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
`;
