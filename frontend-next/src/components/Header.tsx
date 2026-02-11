'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status whenever pathname changes (navigation)
    // or initially mount.  A more robust way is a Context, but this is simple for migration.
    const user = localStorage.getItem('currentUser');
    setIsLoggedIn(!!user);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    router.push('/pages/login');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:bg-blue-700 transition-colors">
            C
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">Civic Issue Tracker</span>
        </Link>
        
        {isLoggedIn && (
           <button 
             onClick={handleLogout} 
             className="text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors"
           >
             Logout
           </button>
        )}
      </div>
    </header>
  );
}
