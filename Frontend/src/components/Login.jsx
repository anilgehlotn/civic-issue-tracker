import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && typeof currentUser === 'object' && currentUser.role) {
      if (currentUser.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/staff');
      }
    } else {
      localStorage.removeItem('currentUser');
    }

    // Initialize dummy data if no users exist
    const existingUsers = JSON.parse(localStorage.getItem('users'));
    if (!existingUsers || existingUsers.length === 0) {
      const dummyUsers = [
        { employeeId: 'ADM001', password: 'admin123', role: 'admin' },
        { employeeId: 'STF001', password: 'staff123', role: 'staff', wardNumber: 'Ward 1', category: 'waste' },
        { employeeId: 'STF002', password: 'staff456', role: 'staff', wardNumber: 'Ward 2', category: 'lighting' },
        { employeeId: 'STF003', password: 'staff789', role: 'staff', wardNumber: 'Ward 3', category: 'roads' }
      ];
      localStorage.setItem('users', JSON.stringify(dummyUsers));
    }

    // Initialize dummy issues if none exist
    const existingIssues = JSON.parse(localStorage.getItem('issues'));
    if (!existingIssues || existingIssues.length === 0) {
      const dummyIssues = [
        { id: 1, title: 'Pothole on Main Street', description: 'Large pothole causing traffic hazards near the intersection of Main St and Oak Ave.', status: 'pending', category: 'roads' },
        { id: 2, title: 'Broken Street Light', description: 'Street light at Elm Street and 5th Avenue has been out for 3 days.', status: 'pending', category: 'lighting' },
        { id: 4, title: 'Overflowing Trash Bin', description: 'Trash bin at Central Park is overflowing and needs immediate attention.', status: 'pending', category: 'waste' }
      ];
      localStorage.setItem('issues', JSON.stringify(dummyIssues));
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    console.log('Users:', users);
    console.log('Attempting login with:', employeeId, password, 'isAdmin:', isAdmin);
    const user = users.find(u => u.employeeId === employeeId && u.password === password && u.role === (isAdmin ? 'admin' : 'staff'));
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/staff');
      }
    } else {
      setError('Invalid credentials');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Civic Tracker</h2>
          <p className="text-gray-600">Login to access your dashboard</p>
        </div>
        <form onSubmit={handleLogin} className={`space-y-6 transition-transform duration-200 ${shake ? 'animate-shake' : ''}`}>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Employee ID</label>
            <input type="text" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" />
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="adminCheck" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
            <label htmlFor="adminCheck" className="ml-2 text-sm font-medium text-gray-700">Login as Admin</label>
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 transition duration-200 font-semibold">Login</button>
        </form>
        {error && <p className="text-red-500 text-center mt-4 font-medium">{error}</p>}
      </div>
    </div>
  );
};

export default Login;