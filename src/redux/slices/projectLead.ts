import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../../graphql/client';
import { GET_LEADS } from '../../graphql/queries';
import { CREATE_LEAD } from '../../graphql/mutations';

enum LeadStatus {
  New,
  Contact,
  UploadScope,
  Estimate,
  SignContract,
  Payment,
  Installation,
  Completed,
  Feedback
}

// Define an initial state
interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectLeadsState {
  leads: Lead[];
  filteredLeads: Lead[];
  status: string;
  loading: boolean;
  error: string | null;
  count: number;
  statusCount: number[];
}

const initialState: ProjectLeadsState = {
  leads: [],
  filteredLeads: [],
  status: "",
  loading: false,
  error: null,
  count: 0,
  statusCount: Array(Object.keys(LeadStatus).length).fill(0)
};



// Async actions for GraphQL API calls
export const fetchLeads = createAsyncThunk('projectLeads/fetchLeads', async () => {
  const { data } = await client.query({ query: GET_LEADS });
  return data.leads;
});

export const createNewLead = createAsyncThunk('projectLeads/createNewLead', async (leadData: Partial<Lead>) => {
  const { data } = await client.mutate({
    mutation: CREATE_LEAD,
    variables: leadData,
  });
  return data.createLead;
});

// The slice
const projectLeadsSlice = createSlice({
  name: 'projectLeads',
  initialState,
  reducers: {
    changeLeadStatus: (state, action) => {
      const newStatus = action.payload;
      console.log("New Status", newStatus);
      debugger;
      state.status = newStatus;
      state.filteredLeads = state.leads.filter((lead) => lead.status === newStatus);
    },

    sortByCreatedDate: (state, action) => {
      console.log("Payload", action.payload);
      let arr = [...state.filteredLeads]; // Create a copy of the filteredLeads array

      if (action.payload === "latest") {
        arr.sort((a, b) => Number(b.createdAt) - Number(a.createdAt)); // Sort by latest
      } else if (action.payload === "oldest") {
        arr.sort((a, b) => Number(a.createdAt) - Number(b.createdAt)); // Sort by oldest
      }

      state.filteredLeads = arr; // Assign the sorted array back to filteredLeads
    }




  },
  extraReducers: (builder) => {
    builder
      // Handle fetch leads
      .addCase(fetchLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = action.payload;
        state.count = action.payload.length;
        // Filter leads based on the current status
        state.filteredLeads = action.payload;
        state.statusCount = Array(Object.keys(LeadStatus).length).fill(0); // Correct size initialization

        // Count occurrences of each status
        action.payload.forEach((lead: Lead) => {
          // Check if lead.status is a valid LeadStatus
          const statusIndex = Object.values(LeadStatus).indexOf(lead.status);
          if (statusIndex !== -1) {
            state.statusCount[statusIndex]++; // Increment the count for the corresponding status
          }
        });
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch leads';
      })

      // Handle create new lead
      .addCase(createNewLead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewLead.fulfilled, (state, action) => {
        state.loading = false;
        state.leads.push(action.payload);
        state.count = state.count + 1;
        // Re-filter leads after a new lead is added
        if (state.status == "") {
          state.filteredLeads.push(action.payload);
        } else {
          state.filteredLeads = state.leads.filter((lead) => lead.status === state.status);
        }
        const statusIndex = Object.values(LeadStatus).indexOf(action.payload.status);
        state.statusCount[statusIndex]++;
      })
      .addCase(createNewLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create lead';
      });
  },
});

export const { changeLeadStatus, sortByCreatedDate } = projectLeadsSlice.actions;

export default projectLeadsSlice.reducer;
