'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  employeeId: string;
  password?: string;
  role: 'admin' | 'staff';
  wardNumber?: string;
  category?: string;
  name?: string;
  department?: string;
}

interface Issue {
  id: number;
  title: string;
  description: string;
  status: string;
  category: string;
  assignedTo?: string;
  ward?: string;
  date?: string;
  imageUrl?: string;
}

export default function LoginPage() {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // New state for password toggle
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Ensure this only runs on client
    if (typeof window === 'undefined') return;

    const currentUserStr = localStorage.getItem('currentUser');
    if (currentUserStr) {
      try {
        const currentUser: User = JSON.parse(currentUserStr);
        if (currentUser && typeof currentUser === 'object' && currentUser.role) {
          if (currentUser.role === 'admin') {
            router.push('/pages/admin');
          } else {
            router.push('/pages/staff');
          }
        } else {
          localStorage.removeItem('currentUser');
        }
      } catch {
        localStorage.removeItem('currentUser');
      }
    }

    // Initialize dummy data if no users exist
    const existingUsersStr = localStorage.getItem('users');
    let existingUsers = [];
    try {
        existingUsers = existingUsersStr ? JSON.parse(existingUsersStr) : [];
    } catch {
        existingUsers = [];
    }

    if (!existingUsers || existingUsers.length === 0) {
      const dummyUsers: User[] = [
        // Admins
        { employeeId: 'ADM001', password: 'admin123', role: 'admin', name: 'Arun Verma', department: 'Administration', wardNumber: 'HQ' },
        { employeeId: 'ADM002', password: 'admin123', role: 'admin', name: 'Sarah Khan', department: 'Administration', wardNumber: 'HQ' },

        // Ward 1 Staff
        { employeeId: 'STF101', password: 'staff123', role: 'staff', wardNumber: 'Ward 1', category: 'roads', department: 'Road Maintenance', name: 'Rajesh Kumar' },
        { employeeId: 'STF102', password: 'staff123', role: 'staff', wardNumber: 'Ward 1', category: 'waste', department: 'Waste Management', name: 'Suresh Patil' },
        { employeeId: 'STF103', password: 'staff123', role: 'staff', wardNumber: 'Ward 1', category: 'lighting', department: 'Street Lighting', name: 'Amit Singh' },

        // Ward 2 Staff
        { employeeId: 'STF201', password: 'staff123', role: 'staff', wardNumber: 'Ward 2', category: 'roads', department: 'Road Maintenance', name: 'Priya Sharma' },
        { employeeId: 'STF202', password: 'staff123', role: 'staff', wardNumber: 'Ward 2', category: 'waste', department: 'Waste Management', name: 'Anjali Desai' },
        { employeeId: 'STF203', password: 'staff123', role: 'staff', wardNumber: 'Ward 2', category: 'lighting', department: 'Street Lighting', name: 'Rohan Gupta' },

        // Ward 3 Staff
        { employeeId: 'STF301', password: 'staff123', role: 'staff', wardNumber: 'Ward 3', category: 'roads', department: 'Road Maintenance', name: 'Vikram Malhotra' },
        { employeeId: 'STF302', password: 'staff123', role: 'staff', wardNumber: 'Ward 3', category: 'waste', department: 'Waste Management', name: 'Neha Kapoor' },
        { employeeId: 'STF303', password: 'staff123', role: 'staff', wardNumber: 'Ward 3', category: 'lighting', department: 'Street Lighting', name: 'Arjun Reddy' },

        // Ward 4 Staff (New)
        { employeeId: 'STF401', password: 'staff123', role: 'staff', wardNumber: 'Ward 4', category: 'roads', department: 'Road Maintenance', name: 'Deepak Chopra' },
        { employeeId: 'STF402', password: 'staff123', role: 'staff', wardNumber: 'Ward 4', category: 'waste', department: 'Waste Management', name: 'Sunita Rao' },
        { employeeId: 'STF403', password: 'staff123', role: 'staff', wardNumber: 'Ward 4', category: 'lighting', department: 'Street Lighting', name: 'Manoj Tiwari' },
      ];
      localStorage.setItem('users', JSON.stringify(dummyUsers));
    }

    // Initialize dummy issues if none exist
    const existingIssuesStr = localStorage.getItem('issues');
    let existingIssues = [];
    try {
        existingIssues = existingIssuesStr ? JSON.parse(existingIssuesStr) : [];
    } catch {
        existingIssues = [];
    }

    if (!existingIssues || existingIssues.length === 0 || existingIssues.some((i: Issue) => i.category === 'water')) {
      const categories = ['roads', 'waste', 'lighting'];
      const statuses = ['pending', 'in-progress', 'resolved'];
      const wards = ['Ward 1', 'Ward 2', 'Ward 3', 'Ward 4'];
      
      const dummyIssues: Issue[] = Array.from({ length: 25 }).map((_, index) => {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const ward = wards[Math.floor(Math.random() * wards.length)];
        
        // Generate placeholder image based on category
        let imageUrl = '';
        switch(category) {
            case 'roads': imageUrl = 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400'; break; // Pothole/Road
            case 'waste': imageUrl = 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=400'; break; // Garbage
            case 'lighting': imageUrl = 'https://thumbs.dreamstime.com/b/road-lamp-broken-bulb-against-blue-sky-56874582.jpg'; break; // Streetlight (New URL)
            default: imageUrl = 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400';
        }

        return {
          id: index + 1,
          title: `${category.charAt(0).toUpperCase() + category.slice(1)} Issue in ${ward}`,
          description: `Reported issue concerning ${category} near the main junction of ${ward}. Requires inspection.`,
          status,
          category,
          ward,
          date: new Date(Date.now() - Math.floor(Math.random() * 10 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
          imageUrl,
          assignedTo: status !== 'pending' ? 'STF101' : undefined // Randomly assign if not pending
        };
      });
      
      localStorage.setItem('issues', JSON.stringify(dummyIssues));
      // Force reload if we cleared data due to 'water' category presence (handled by setItem but ui needs refresh if already loaded? actually this runs on mount, so it might need a reload if data changed significantly, but likely fine for next render or state update if we were setting state. Here we are just setting localstorage. The dashboards read from localstorage on mount. So we are good.)
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const usersStr = localStorage.getItem('users');
    const users: User[] = usersStr ? JSON.parse(usersStr) : [];
    
    console.log('Users:', users);
    console.log('Attempting login with:', employeeId, password, 'isAdmin:', isAdmin);
    
    const user = users.find(u => u.employeeId === employeeId && u.password === password && u.role === (isAdmin ? 'admin' : 'staff'));
    
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      if (user.role === 'admin') {
        router.push('/pages/admin');
      } else {
        router.push('/pages/staff');
      }
    } else {
      setError('Invalid credentials');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md transform transition-all duration-300 hover:scale-[1.01]">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg rotate-3 hover:rotate-6 transition-transform">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-900">Sign in to access the dashboard</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="group">
            <label className="block text-sm font-semibold text-gray-900 mb-2 group-focus-within:text-blue-600 transition-colors">Employee ID</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-gray-900 placeholder-gray-400"
              placeholder="Enter your ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            />
          </div>
          <div className="group relative">
            <label className="block text-sm font-semibold text-gray-900 mb-2 group-focus-within:text-blue-600 transition-colors">Password</label>
            <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-gray-900 placeholder-gray-400 pr-10" // Added pr-10 for padding
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
            </div>
          </div>
          
          <div className="flex items-center">
            <input 
               type="checkbox" 
               id="adminCheck" 
               checked={isAdmin} 
               onChange={(e) => setIsAdmin(e.target.checked)} 
               className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer" 
            />
            <label htmlFor="adminCheck" className="ml-2 text-sm font-semibold text-gray-900 cursor-pointer select-none">Login as Admin</label>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2 animate-shake">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all duration-200 active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>
        <div className="mt-8 pt-6 border-t border-gray-100">
           <p className="text-center text-sm text-gray-900">
             Are you a citizen? <a href="https://t.me/CivicIssueBot" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">Use our Telegram Bot</a>
           </p>
        </div>
      </div>
    </div>
  );
}
