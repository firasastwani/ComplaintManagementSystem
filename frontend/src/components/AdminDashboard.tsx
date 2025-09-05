import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { StatusBadge } from './ui/StatusBadge';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { 
  RefreshCw, 
  Filter, 
  Search, 
  Trash2, 
  Edit3, 
  Users, 
  Clock, 
  CheckCircle,
  AlertCircle 
} from 'lucide-react';

// Define types inline
interface Complaint {
  id: number;
  name: string;
  email: string;
  complaint: string;
  status: 'Pending' | 'Resolved';
  created_at: string;
}

// Simple API service
const fetchComplaints = async (): Promise<Complaint[]> => {
  try {
    const response = await fetch('http://localhost:3001/complaints');
    if (!response.ok) {
      throw new Error('Failed to fetch complaints');
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    throw new Error('Failed to fetch complaints');
  }
};

const updateComplaintStatus = async (id: number, status: 'Pending' | 'Resolved'): Promise<Complaint> => {
  try {
    const response = await fetch(`http://localhost:3001/complaints/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      throw new Error('Failed to update complaint');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    throw new Error('Failed to update complaint');
  }
};

const deleteComplaint = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:3001/complaints/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete complaint');
    }
  } catch (error) {
    throw new Error('Failed to delete complaint');
  }
};

export const AdminDashboard: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'resolved'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [updating, setUpdating] = useState<number | null>(null);

  const loadComplaints = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchComplaints();
      setComplaints(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch complaints');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  const handleStatusUpdate = async (id: number, currentStatus: 'Pending' | 'Resolved') => {
    const newStatus = currentStatus === 'Pending' ? 'Resolved' : 'Pending';
    
    try {
      setUpdating(id);
      await updateComplaintStatus(id, newStatus);
      setComplaints(prev => 
        prev.map(complaint => 
          complaint.id === id 
            ? { ...complaint, status: newStatus }
            : complaint
        )
      );
    } catch (err: any) {
      alert(err.message || 'Failed to update complaint status');
    } finally {
      setUpdating(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this complaint?')) {
      return;
    }

    try {
      setUpdating(id);
      await deleteComplaint(id);
      setComplaints(prev => prev.filter(complaint => complaint.id !== id));
    } catch (err: any) {
      alert(err.message || 'Failed to delete complaint');
    } finally {
      setUpdating(null);
    }
  };

  const filteredComplaints = complaints.filter(complaint => {
    const matchesFilter = filter === 'all' || complaint.status.toLowerCase() === filter;
    const matchesSearch = complaint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.complaint.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: complaints.length,
    pending: complaints.filter(c => c.status === 'Pending').length,
    resolved: complaints.filter(c => c.status === 'Resolved').length,
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-600">Loading complaints...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <Button
          variant="secondary"
          onClick={loadComplaints}
          disabled={loading}
          className="flex items-center space-x-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Complaints</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-gray-900">{stats.resolved}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search complaints..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant={filter === 'all' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All ({stats.total})
              </Button>
              <Button
                variant={filter === 'pending' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFilter('pending')}
              >
                Pending ({stats.pending})
              </Button>
              <Button
                variant={filter === 'resolved' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFilter('resolved')}
              >
                Resolved ({stats.resolved})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Complaints List */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        {filteredComplaints.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-600">
                {searchTerm || filter !== 'all' 
                  ? 'No complaints match your filters.' 
                  : 'No complaints found.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredComplaints.map((complaint) => (
            <Card key={complaint.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {complaint.name}
                      </h3>
                      <StatusBadge status={complaint.status} />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {complaint.email}
                    </p>
                    <p className="text-gray-700 mb-3">
                      {complaint.complaint}
                    </p>
                    <p className="text-xs text-gray-500">
                      Submitted: {formatDate(complaint.created_at)}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleStatusUpdate(complaint.id, complaint.status)}
                      disabled={updating === complaint.id}
                      className="flex items-center space-x-1"
                    >
                      {updating === complaint.id ? (
                        <LoadingSpinner size="sm" />
                      ) : (
                        <Edit3 className="h-4 w-4" />
                      )}
                      <span>
                        {complaint.status === 'Pending' ? 'Mark Resolved' : 'Mark Pending'}
                      </span>
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(complaint.id)}
                      disabled={updating === complaint.id}
                      className="flex items-center space-x-1"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};