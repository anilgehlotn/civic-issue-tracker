'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Civic Issue Tracker</h1>
          <button 
            onClick={() => router.back()} 
            className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
          >
            ← Back
          </button>
        </div>
      </header>

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-blue-600 px-8 py-10 text-white text-center">
            <h2 className="text-3xl font-bold mb-2">About the System</h2>
            <p className="text-blue-100 text-lg">Platform Overview for Administrators & Staff</p>
          </div>
          
          <div className="p-8 space-y-8">
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
                Purpose
              </h3>
              <p className="text-gray-600 leading-relaxed">
                This web portal is designed exclusively for **Civic Authority Administrators and Staff members**. 
                It serves as the central command center for managing, assigning, and resolving civic issues reported by citizens.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-purple-500 rounded-full"></span>
                Citizen Reporting (Telegram Bot)
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Please note that citizens **do not** use this web interface to report issues. All citizen reports are finding their way into the system via our dedicated **Telegram Bot**.
              </p>
              <div className="flex items-start gap-3 text-sm text-gray-500">
                <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>
                  The Telegram bot automatically categorizes reports and forwards them here for administrative action. 
                  Admins then verify and assign these issues to the respective Ward Staff.
                </span>
              </div>
            </section>

            <div className="grid md:grid-cols-2 gap-6">
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-green-500 rounded-full"></span>
                  Admin Role
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-1">
                  <li>Monitor incoming issue reports.</li>
                  <li>Assign tasks to Ward Staff.</li>
                  <li>Manage employee accounts (Staff/Admin).</li>
                  <li>Oversee resolution progress.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-orange-500 rounded-full"></span>
                  Staff Role
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-1">
                  <li>View assigned tasks specific to their Ward.</li>
                  <li>Update status of work (Pending → In Progress → Resolved).</li>
                  <li>Report completion of maintenance work.</li>
                </ul>
              </section>
            </div>
          </div>
          
          <div className="bg-gray-50 px-8 py-6 text-center text-gray-500 text-sm border-t border-gray-100">
            &copy; {new Date().getFullYear()} Civic Issue Tracking System. Internal Use Only.
          </div>
        </div>
      </main>
    </div>
  );
}
