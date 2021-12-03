import { gql } from 'apollo-server';

export default gql`
  type EditProfileResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      name: String
      email: String
      location: String
      avatar: Upload
      githubUsername: String
      password: String
    ): EditProfileResult
  }
`;
