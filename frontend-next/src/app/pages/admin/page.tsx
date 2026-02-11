'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import IssueModal, { Issue } from '@/components/IssueModal';

// --- API CONFIGURATION ---
const API_URLS = {
  USERS: '/api/users',
  ISSUES: '/api/issues',
  REGISTER: '/api/users/register',
};
// -------------------------

interface User {
  _id?: string;
  employeeId: string;
  password?: string;
  role: string;
  wardNumber?: string;
  category?: string;
  department?: string;
  name?: string;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null); // Added state for current user
  const [newEmployeeId, setNewEmployeeId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('staff');
  const [newWardNumber, setNewWardNumber] = useState('');
  const [newCategory, setNewCategory] = useState('waste');
  const [issues, setIssues] = useState<Issue[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  // Modal State
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const currentUserStr = localStorage.getItem('currentUser');
    const user = currentUserStr ? JSON.parse(currentUserStr) : null;
    
    if (!user || user.role !== 'admin') {
      router.push('/pages/login');
      return;
    }
    setCurrentUser(user);

    // Fetch users and issues from backend
    const fetchData = async () => {
      try {
        const usersRes = await fetch(API_URLS.USERS);
        const issuesRes = await fetch(API_URLS.ISSUES);
        
        if (!usersRes.ok || !issuesRes.ok) {
           console.warn('API fetch failed, falling back to localStorage');
           const localUsers = JSON.parse(localStorage.getItem('users') || '[]');
           const localIssues = JSON.parse(localStorage.getItem('issues') || '[]');
           setUsers(localUsers);
           setIssues(localIssues);
           return;
        }

        const usersData = await usersRes.json();
        const issuesData = await issuesRes.json();
        setUsers(usersData);
        setIssues(issuesData);
      } catch (err) {
        console.error('Error fetching data:', err);
        const localUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const localIssues = JSON.parse(localStorage.getItem('issues') || '[]');
        setUsers(localUsers);
        setIssues(localIssues);
      }
    };
    fetchData();
  }, [router]);


  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const registrationData = {
      name: newEmployeeId,
      password: newPassword,
      wardNumber: newWardNumber,
      department: newCategory,
      role: newRole === 'staff' ? 'Staff' : 'Admin',
    };
    try {
      const res = await fetch(API_URLS.REGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationData),
      });
      if (!res.ok) throw new Error('Registration failed');
      const user = await res.json();
      setUsers([...users, user]);
      setNewEmployeeId('');
      setNewPassword('');
      setNewWardNumber('');
      setNewCategory('waste');
      alert('User created successfully!');
    } catch (err: unknown) {
      alert('Error registering user: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  const handleAssignIssue = (e: React.ChangeEvent<HTMLSelectElement>, issueId: number) => {
    e.stopPropagation();
    const staffEmployeeId = e.target.value;
    if (!staffEmployeeId) return;

    const updatedIssues = issues.map(issue =>
      issue.id === issueId ? { ...issue, assignedTo: staffEmployeeId, status: 'in progress' } : issue
    );
    setIssues(updatedIssues);
    localStorage.setItem('issues', JSON.stringify(updatedIssues));
  };



  const handleIssueClick = (issue: Issue) => {
    setSelectedIssue(issue);
    setIsModalOpen(true);
  };

  const staffUsers = users.filter(u => u.role === 'staff' || u.role === 'Staff');

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Admin Dashboard</h2>
          <p className="text-gray-500 mt-1">Manage users and issues efficiently</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Create User Form - Left Side (7/12 width) */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
              Create New User
            </h3>
            <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="col-span-1">
                <label className="block text-sm font-bold text-gray-900 mb-1">Employee Name/ID</label>
                <input 
                  type="text" 
                  value={newEmployeeId} 
                  onChange={(e) => setNewEmployeeId(e.target.value)} 
                  required 
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-black placeholder-gray-500"
                  placeholder="username"
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-bold text-gray-900 mb-1">Password</label>
                <input 
                  type="password" 
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)} 
                  required 
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-black placeholder-gray-500"
                  placeholder="password"
                />
              </div>
              
              <div className="col-span-1">
                 <label className="block text-sm font-bold text-gray-900 mb-1">Ward Number</label>
                 <input 
                    type="text" 
                    value={newWardNumber} 
                    onChange={(e) => setNewWardNumber(e.target.value)} 
                    required 
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-black placeholder-gray-500"
                    placeholder="ward number"
                  />
              </div>
              
              <div className="col-span-1">
                 <label className="block text-sm font-bold text-gray-900 mb-1">Role</label>
                 <select 
                    value={newRole} 
                    onChange={(e) => setNewRole(e.target.value)} 
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none cursor-pointer text-black"
                  >
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-900 mb-1">Department / Category</label>
                <select 
                  value={newCategory} 
                  onChange={(e) => setNewCategory(e.target.value)} 
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none cursor-pointer text-black"
                >
                  <option value="waste">Waste Management</option>
                  <option value="lighting">Street Lighting</option>
                  <option value="roads">Road Maintenance</option>
                </select>
              </div>

              <div className="md:col-span-2 mt-2">
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98]">
                  Create Account
                </button>
              </div>
            </form>
          </div>

          {/* Admin Details & Actions - Right Side (5/12 width) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
                    Admin Profile
                </h3>
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-2xl font-bold">
                        {currentUser?.employeeId?.charAt(0) || 'A'}
                    </div>
                    <div>
                        <div className="text-lg font-bold text-gray-900">{currentUser?.name || currentUser?.employeeId || 'Administrator'}</div>
                        <div className="text-sm text-gray-500">{currentUser?.department || 'Administration'}</div>
                        {currentUser?.wardNumber && <div className="text-xs text-gray-400 mt-0.5">Ward: {currentUser?.wardNumber}</div>}
                    </div>
                </div>
                <div className="space-y-3">
                   <div className="flex justify-between py-2 border-b border-gray-50">
                      <span className="text-gray-500">Role</span>
                      <span className="font-semibold text-gray-800 capitalize">{currentUser?.role}</span>
                   </div>
                   <div className="flex justify-between py-2 border-b border-gray-50">
                      <span className="text-gray-500">System Status</span>
                      <span className="font-semibold text-green-600 flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span> Online
                      </span>
                   </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <button
                onClick={() => router.push('/pages/about')}
                className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                About System
              </button>
                  <button
                    type="button"
                    onClick={() => router.push('/pages/all-users')}
                    className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-xl shadow-lg transition-all active:scale-95 flex items-center gap-2 font-medium"
                  >
                    Manage All Users
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Issues Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="w-2 h-8 bg-orange-500 rounded-full"></span>
                Recent Issues
            </h3>
            <div className="flex flex-wrap gap-3">
                {/* Filters */}
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none text-black">
                <option value="all">All Categories</option>
                <option value="waste">Waste</option>
                <option value="lighting">Lighting</option>
                <option value="roads">Roads</option>
                </select>
                <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none text-black">
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="in progress">In Progress</option>
                <option value="resolved">Resolved</option>
                </select>
            </div>
          </div>
          
          <div className="space-y-4">
            {issues.filter(issue => 
              (selectedCategory === 'all' || issue.category === selectedCategory) &&
              (selectedStatus === 'all' || issue.status === selectedStatus)
            ).map(issue => (
              <div 
                key={issue.id} 
                className="group bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 p-5 rounded-2xl transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                onClick={() => handleIssueClick(issue)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs text-gray-500 font-bold">#{issue.id}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
                        issue.status === 'pending' ? 'bg-yellow-100 text-yellow-900 border border-yellow-200' : 
                        issue.status === 'in progress' ? 'bg-blue-100 text-blue-900 border border-blue-200' : 
                        'bg-green-100 text-green-900 border border-green-200'
                    }`}>
                      {issue.status}
                    </span>
                    <span className="text-xs font-bold text-gray-600 uppercase flex items-center gap-1">
                         <span className={`w-2 h-2 rounded-full ${
                             issue.category === 'waste' ? 'bg-green-500' : 
                             issue.category === 'lighting' ? 'bg-yellow-500' : 
                             issue.category === 'roads' ? 'bg-gray-700' :
                             'bg-gray-500'
                         }`}></span>
                         {issue.category}
                    </span>
                  </div>
                  
                  <h4 className="font-bold text-black mb-1 text-lg group-hover:text-blue-800 transition-colors">{issue.title}</h4>
                  <p className="text-sm text-gray-700 line-clamp-1 font-medium">{issue.description}</p>
                </div>

                <div className="flex items-center gap-4 min-w-[200px] justify-end">
                    <div onClick={(e) => e.stopPropagation()}>
                        {!issue.assignedTo ? (
                        <select 
                        onChange={(e) => handleAssignIssue(e, issue.id)} 
                        className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none w-40 text-black shadow-sm"
                        >
                        <option value="">+ Assign Staff</option>
                        {staffUsers.map(staff => (
                            <option key={staff.employeeId || staff.name} value={staff.employeeId}>{staff.employeeId}</option>
                        ))}
                        </select>
                        ) : (
                            <div className="flex items-center gap-2 text-sm text-blue-700 font-medium bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-200">
                                <span className="text-blue-500 text-xs uppercase tracking-wide">Assigned:</span>
                                {issue.assignedTo}
                            </div>
                        )}
                    </div>
                    <div className="text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
