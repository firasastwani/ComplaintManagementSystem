import axios from 'axios';
import { Complaint, ComplaintFormData, ApiResponse, ComplaintsResponse } from '../types';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const complaintService = {
  // Submit a new complaint
  async submitComplaint(data: ComplaintFormData): Promise<ApiResponse<Complaint>> {
    try {
      const response = await api.post('/complaints', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to submit complaint');
    }
  },

  // Get all complaints
  async getComplaints(): Promise<ComplaintsResponse> {
    try {
      const response = await api.get('/complaints');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch complaints');
    }
  },

  // Update complaint status
  async updateComplaintStatus(id: number, status: 'Pending' | 'Resolved'): Promise<ApiResponse<Complaint>> {
    try {
      const response = await api.patch(`/complaints/${id}`, { status });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update complaint');
    }
  },

  // Delete a complaint
  async deleteComplaint(id: number): Promise<ApiResponse<Complaint>> {
    try {
      const response = await api.delete(`/complaints/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete complaint');
    }
  },
};

export default api;
