import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { CheckCircle, ArrowLeft, MessageSquare } from 'lucide-react';

export const SuccessPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Complaint Submitted Successfully!
        </h1>
        <p className="text-lg text-gray-600">
          Thank you for your feedback. We have received your complaint and will review it shortly.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>What happens next?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-sm font-semibold">1</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Review Process</h3>
                <p className="text-gray-600 text-sm">
                  Our team will review your complaint within 24 hours.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-sm font-semibold">2</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Response</h3>
                <p className="text-gray-600 text-sm">
                  We will contact you via email with updates on your complaint.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-sm font-semibold">3</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Resolution</h3>
                <p className="text-gray-600 text-sm">
                  We will work to resolve your issue as quickly as possible.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-center space-x-4">
        <Button
          variant="secondary"
          onClick={() => window.history.back()}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Go Back</span>
        </Button>
        <Link to="/">
          <Button
            variant="primary"
            className="flex items-center space-x-2"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Submit Another Complaint</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};