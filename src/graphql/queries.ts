import { gql } from '@apollo/client';

// Query to get all leads
export const GET_LEADS = gql`
  query GetLeads {
    leads {
      id
      name
      email
      phone
      address
      status
      createdAt
      updatedAt
    }
  }
`;

export {};
