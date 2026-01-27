import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StaffDashboard = () => {
  const [issues, setIssues] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user || user.role !== 'staff') {
      navigate('/');
      return;
    }
    const allIssues = JSON.parse(localStorage.getItem('issues')) || [];
    const assignedIssues = allIssues.filter(issue => issue.assignedTo === user.employeeId);
    setCurrentUser(user);
    setIssues(assignedIssues);
  }, [navigate]);

  const handleUpdateStatus = (issueId, newStatus) => {
    const allIssues = JSON.parse(localStorage.getItem('issues')) || [];
    const updatedIssues = allIssues.map(issue =>
      issue.id === issueId ? { ...issue, status: newStatus } : issue
    );
    localStorage.setItem('issues', JSON.stringify(updatedIssues));
    setIssues(updatedIssues.filter(issue => issue.assignedTo === currentUser.employeeId));
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Staff Dashboard</h2>
            <p className="text-lg text-gray-700">Welcome, <span className="font-semibold">{currentUser?.employeeId}</span></p>
            <div className="text-sm text-gray-600 mt-1">
              <span>Ward: {currentUser?.wardNumber}</span>
              <span className="mx-2">•</span>
              <span>Category: {currentUser?.category === 'waste' ? 'Waste Management' : currentUser?.category === 'lighting' ? 'Street Lighting' : 'Road Maintenance'}</span>
            </div>
          </div>
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 hover:scale-110 hover:rotate-12 text-white p-3 rounded-lg shadow-md transition-all duration-200" title="Logout">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
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
              <div key={issue.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800">{issue.title}</h4>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded mt-1 inline-block">
                      {issue.category === 'waste' ? 'Waste Management' : issue.category === 'lighting' ? 'Street Lighting' : 'Road Maintenance'}
                    </span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${issue.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : issue.status === 'in progress' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                    {issue.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{issue.description}</p>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Update Status:</label>
                  <select value={issue.status} onChange={(e) => handleUpdateStatus(issue.id, e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
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
    </div>
  );
};

export default StaffDashboard;