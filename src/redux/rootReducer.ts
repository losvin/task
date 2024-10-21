import { combineReducers } from '@reduxjs/toolkit';
import projectLeadsReducer from './slices/projectLead'

const rootReducer = combineReducers({
  projectLeads: projectLeadsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
