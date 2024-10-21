import { gql } from '@apollo/client';

// Mutation to create a new lead
export const CREATE_LEAD = gql`
  mutation CreateLead(
    $name: String!
    $email: String!
    $phone: String!
    $address: String!
    $status: LeadStatus
  ) {
    createLead(
      name: $name
      email: $email
      phone: $phone
      address: $address
      status: $status
    ) {
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

// Mutation to update the status of a lead
export const UPDATE_LEAD_STATUS = gql`
  mutation UpdateLeadStatus($id: ID!, $status: LeadStatus!) {
    updateLeadStatus(id: $id, status: $status) {
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

// Mutation to delete a lead
export const DELETE_LEAD = gql`
  mutation DeleteLead($id: ID!) {
    deleteLead(id: $id)
  }
`;

export {};
