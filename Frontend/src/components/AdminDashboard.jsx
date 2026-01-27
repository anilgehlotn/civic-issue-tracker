import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [newEmployeeId, setNewEmployeeId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('staff');
  const [newWardNumber, setNewWardNumber] = useState('');
  const [newCategory, setNewCategory] = useState('waste');
  const [issues, setIssues] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedWard, setSelectedWard] = useState('all');
  const [selectedStaff, setSelectedStaff] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'admin') {
      navigate('/');
      return;
    }
    // Fetch users and issues from backend
    const fetchData = async () => {
      try {
        const usersRes = await fetch('/api/users');
        const issuesRes = await fetch('/api/issues');
        if (!usersRes.ok || !issuesRes.ok) throw new Error('Failed to fetch data');
        const usersData = await usersRes.json();
        const issuesData = await issuesRes.json();
        setUsers(usersData);
        setIssues(issuesData);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, [navigate]);

  // Fetch all users from backend
  const fetchAllUsers = async () => {
    try {
      const res = await fetch('/api/users/all');
      if (!res.ok) throw new Error('Failed to fetch users');
      const allUsers = await res.json();
      setUsers(allUsers);
    } catch (err) {
      alert('Error fetching users: ' + err.message);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    // Prepare registration data
    const registrationData = {
      name: newEmployeeId, // Actually the name field
      password: newPassword,
      wardNumber: newWardNumber,
      department: newCategory, // Use category as department for backend
      role: newRole === 'staff' ? 'Staff' : 'Admin',
    };
    try {
      const res = await fetch('/api/users/register', {
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
    } catch (err) {
      alert('Error registering user: ' + err.message);
    }
  };

  const handleAssignIssue = (issueId, staffEmployeeId) => {
    const updatedIssues = issues.map(issue =>
      issue.id === issueId ? { ...issue, assignedTo: staffEmployeeId, status: 'in progress' } : issue
    );
    setIssues(updatedIssues);
    localStorage.setItem('issues', JSON.stringify(updatedIssues));
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const staffUsers = users.filter(u => u.role === 'staff');
  const uniqueWards = [...new Set(staffUsers.map(s => s.wardNumber))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 hover:scale-110 hover:rotate-12 text-white p-3 rounded-lg shadow-md transition-all duration-200" title="Logout">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Create New User</h3>
            <form onSubmit={handleAddUser} className="space-y-4">
              <input type="text" placeholder="Employee Name" value={newEmployeeId} onChange={(e) => setNewEmployeeId(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              <input type="password" placeholder="Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              <input type="text" placeholder="Ward Number" value={newWardNumber} onChange={(e) => setNewWardNumber(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="waste">Waste Management</option>
                <option value="lighting">Street Lighting</option>
                <option value="roads">Road Maintenance</option>
              </select>
              <select value={newRole} onChange={(e) => setNewRole(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
              <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg shadow-md transition duration-200">Add User</button>
            </form>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-700">Users</h3>
              <button
                type="button"
                onClick={fetchAllUsers}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
              >
                Fetch All Users
              </button>
            </div>
            <ul className="space-y-2">
              {users.map((user, index) => (
                <li key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium">{user.employeeId}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                      {user.role}
                    </span>
                  </div>
                  {user.role === 'staff' && (
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Ward: {user.wardNumber}</div>
                      <div>Category: {user.category === 'waste' ? 'Waste Management' : user.category === 'lighting' ? 'Street Lighting' : 'Road Maintenance'}</div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Issues</h3>
          <div className="flex gap-4 mb-4 flex-wrap">
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="all">All Categories</option>
              <option value="waste">Waste Management</option>
              <option value="lighting">Street Lighting</option>
              <option value="roads">Road Maintenance</option>
            </select>
            <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
            <select value={selectedWard} onChange={(e) => setSelectedWard(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="all">All Wards</option>
              {uniqueWards.map(ward => (
                <option key={ward} value={ward}>{ward}</option>
              ))}
            </select>
            <select value={selectedStaff} onChange={(e) => setSelectedStaff(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="all">All Staff</option>
              {staffUsers.map(staff => (
                <option key={staff.employeeId} value={staff.employeeId}>{staff.employeeId}</option>
              ))}
            </select>
          </div>
          <ul className="space-y-3">
            {issues.filter(issue => 
              (selectedCategory === 'all' || issue.category === selectedCategory) &&
              (selectedStatus === 'all' || issue.status === selectedStatus)
            ).map(issue => (
              <li key={issue.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200">
                <div>
                  <h4 className="font-semibold text-gray-800">{issue.title}</h4>
                  <p className="text-sm text-gray-600">{issue.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${issue.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : issue.status === 'in progress' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                      {issue.status}
                    </span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {issue.category === 'waste' ? 'Waste Management' : issue.category === 'lighting' ? 'Street Lighting' : 'Road Maintenance'}
                    </span>
                  </div>
                  {issue.assignedTo && <span className="text-sm text-gray-500 mt-1 block">Assigned to: {issue.assignedTo}</span>}
                </div>
                {!issue.assignedTo && (
                  <select onChange={(e) => handleAssignIssue(issue.id, e.target.value)} className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Assign to Staff</option>
                    {staffUsers.map(staff => (
                      <option key={staff.employeeId} value={staff.employeeId}>{staff.employeeId} ({staff.wardNumber})</option>
                    ))}
                  </select>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;