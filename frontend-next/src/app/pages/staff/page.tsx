'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import IssueModal, { Issue } from '@/components/IssueModal';




interface User {
  employeeId: string;
  role: string;
  wardNumber?: string;
  category?: string;
  name?: string;
  department?: string;
}

export default function StaffDashboard() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Modal State
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const userStr = localStorage.getItem('currentUser');
    const user = userStr ? JSON.parse(userStr) : null;
    
    if (!user || user.role !== 'staff') {
      router.push('/pages/login');
      return;
    }

    // Try fetching from localStorage first (as per original logic)
    const allIssuesStr = localStorage.getItem('issues');
    const allIssues: Issue[] = allIssuesStr ? JSON.parse(allIssuesStr) : [];
    const assignedIssues = allIssues.filter(issue => issue.assignedTo === user.employeeId);
    
    // eslint-disable-next-line 
    setCurrentUser(user);
    setIssues(assignedIssues);
  }, [router]);

  const handleUpdateStatus = (e: React.ChangeEvent<HTMLSelectElement>, issueId: number) => {
    e.stopPropagation(); // Prevent modal opening
    const newStatus = e.target.value;
    
    const allIssuesStr = localStorage.getItem('issues');
    const allIssues: Issue[] = allIssuesStr ? JSON.parse(allIssuesStr) : [];
    
    const updatedIssues = allIssues.map(issue =>
      issue.id === issueId ? { ...issue, status: newStatus } : issue
    );
    
    localStorage.setItem('issues', JSON.stringify(updatedIssues));
    
    // Update local state
    if (currentUser) {
        setIssues(updatedIssues.filter(issue => issue.assignedTo === currentUser.employeeId));
    }
  };

  const handleIssueClick = (issue: Issue) => {
    setSelectedIssue(issue);
    setIsModalOpen(true);
  };

  if (!currentUser) return null; // Or loading spinner

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Staff Dashboard</h2>
            <p className="text-lg text-gray-700">Welcome, <span className="font-semibold">{currentUser?.name || currentUser?.employeeId}</span></p>
            <div className="text-sm text-gray-600 mt-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
               <span className="font-medium text-gray-900">ID: {currentUser?.employeeId}</span>
               <span className="hidden sm:inline mx-2">•</span>
               <span>{currentUser?.department || (currentUser?.category === 'waste' ? 'Waste Management' : currentUser?.category === 'lighting' ? 'Street Lighting' : currentUser?.category === 'water' ? 'Water Supply' : 'Road Maintenance')}</span>
               <span className="hidden sm:inline mx-2">•</span>
               <span>{currentUser?.wardNumber}</span>
            </div>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Your Assigned Issues</h3>
        {issues.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <p className="text-gray-500 text-lg">No issues assigned yet.</p>
            <p className="text-sm text-gray-400 mt-2">Check back later or contact your admin.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {issues.map(issue => (
              <div 
                key={issue.id} 
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-200 cursor-pointer"
                onClick={() => handleIssueClick(issue)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800">{issue.title}</h4>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded mt-1 inline-block">
                      {issue.category === 'waste' ? 'Waste Management' : issue.category === 'lighting' ? 'Street Lighting' : issue.category === 'water' ? 'Water Supply' : 'Road Maintenance'}
                    </span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${issue.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : issue.status === 'in progress' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                    {issue.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{issue.description}</p>
                <div className="flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                  <label className="text-sm font-medium text-gray-700">Update Status:</label>
                  <select 
                    value={issue.status} 
                    onChange={(e) => handleUpdateStatus(e, issue.id)} 
                    className="px-4 py-2 border border-black-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  >
                    <option value="pending">Pending</option>
                    <option value="in progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Issue Modal */}
      <IssueModal 
        issue={selectedIssue} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
