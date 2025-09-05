// Simple type definitions
export type ComplaintStatus = 'Pending' | 'Resolved';

export interface Complaint {
  id: number;
  name: string;
  email: string;
  complaint: string;
  status: ComplaintStatus;
  created_at: string;
}

export interface ComplaintFormData {
  name: string;
  email: string;
  complaint: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  details?: string[];
}

export interface ComplaintsResponse {
  success: boolean;
  count: number;
  data: Complaint[];
}