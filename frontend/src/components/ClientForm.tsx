import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { CheckCircle, AlertCircle } from 'lucide-react';

// Define types inline
interface ComplaintFormData {
  name: string;
  email: string;
  complaint: string;
}

// Simple API service
const submitComplaint = async (data: ComplaintFormData) => {
  try {
    const response = await fetch('http://localhost:3001/complaints', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit complaint');
    }
    
    return await response.json();
  } catch (error) {
    throw new Error('Failed to submit complaint. Please try again.');
  }
};

export const ClientForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ComplaintFormData>({
    name: '',
    email: '',
    complaint: '',
  });
  const [errors, setErrors] = useState<Partial<ComplaintFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');

  const validateForm = (): boolean => {
    const newErrors: Partial<ComplaintFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.complaint.trim()) {
      newErrors.complaint = 'Complaint message is required';
    } else if (formData.complaint.trim().length < 10) {
      newErrors.complaint = 'Complaint must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      await submitComplaint(formData);
      navigate('/success');
    } catch (error: any) {
      setSubmitError(error.message || 'Failed to submit complaint. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ComplaintFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Submit a Complaint
        </h1>
        <p className="text-lg text-gray-600">
          We value your feedback and are here to help resolve any issues you may have.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Complaint Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {submitError && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <p className="text-red-800">{submitError}</p>
              </div>
            )}

            <Input
              label="Full Name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              error={errors.name}
              placeholder="Enter your full name"
              required
            />

            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={errors.email}
              placeholder="Enter your email address"
              required
            />

            <Textarea
              label="Complaint Details"
              value={formData.complaint}
              onChange={(e) => handleInputChange('complaint', e.target.value)}
              error={errors.complaint}
              placeholder="Please describe your complaint in detail..."
              rows={6}
              required
            />

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setFormData({ name: '', email: '', complaint: '' })}
                disabled={isSubmitting}
              >
                Clear Form
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="min-w-[120px]"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <LoadingSpinner size="sm" />
                    <span>Submitting...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Submit Complaint</span>
                  </div>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};