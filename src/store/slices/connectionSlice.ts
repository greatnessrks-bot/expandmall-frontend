import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ConnectionStatus = 'pending' | 'accepted' | 'rejected';

export interface ConnectionRequest {
  id: string;
  businessId: string;
  businessName: string;
  businessImage: string;
  businessType: string;
  message: string;
  selectedService: string;
  status: ConnectionStatus;
  requestedAt: string;
  respondedAt?: string;
}

interface ConnectionState {
  requests: ConnectionRequest[];
}

const initialState: ConnectionState = {
  requests: [],
};

const connectionSlice = createSlice({
  name: 'connections',
  initialState,
  reducers: {
    sendConnectionRequest: (state, action: PayloadAction<Omit<ConnectionRequest, 'id' | 'status' | 'requestedAt'>>) => {
      const newRequest: ConnectionRequest = {
        ...action.payload,
        id: `CONN-${Date.now()}`,
        status: 'pending',
        requestedAt: new Date().toISOString(),
      };
      state.requests.push(newRequest);
    },
    updateConnectionStatus: (state, action: PayloadAction<{ id: string; status: ConnectionStatus }>) => {
      const request = state.requests.find((req) => req.id === action.payload.id);
      if (request) {
        request.status = action.payload.status;
        request.respondedAt = new Date().toISOString();
      }
    },
    deleteConnection: (state, action: PayloadAction<string>) => {
      state.requests = state.requests.filter((req) => req.id !== action.payload);
    },
  },
});

export const { sendConnectionRequest, updateConnectionStatus, deleteConnection } = connectionSlice.actions;

// Selector to check if already connected to a business
export const selectIsConnected = (state: { connections: ConnectionState }, businessId: string) => {
  return state.connections.requests.some(
    (req) => req.businessId === businessId && req.status !== 'rejected'
  );
};

export default connectionSlice.reducer;