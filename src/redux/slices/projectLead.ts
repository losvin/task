import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../../graphql/client';
import { GET_LEADS } from '../../graphql/queries';
import { CREATE_LEAD } from '../../graphql/mutations';

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
  count : number;
}

const initialState: ProjectLeadsState = {
  leads: [],
  filteredLeads: [],
  status: "New",
  loading: false,
  error: null,
  count : 0,
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
      state.status = newStatus;
      state.filteredLeads = state.leads.filter((lead) => lead.status === newStatus);
    },
    sortByCreatedDate: (state, action) => {
      console.log("Payload", action.payload);
      debugger;
      if (action.payload == "latest") {
        state.filteredLeads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      } else {
        state.filteredLeads.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      }
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
        state.filteredLeads = state.leads.filter((lead) => lead.status === state.status);
      })
      .addCase(createNewLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create lead';
      });
  },
});

export const { changeLeadStatus, sortByCreatedDate } = projectLeadsSlice.actions;

export default projectLeadsSlice.reducer;
