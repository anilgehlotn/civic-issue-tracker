'use client';

import React, { useEffect, useRef } from 'react';

export interface Issue {
  id: number;
  title: string;
  description: string;
  status: string;
  category: string;
  assignedTo?: string;
  imageUrl?: string; // Added optional image URL
  createdAt?: string;
  location?: string;
}

interface IssueModalProps {
  issue: Issue | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function IssueModal({ issue, isOpen, onClose }: IssueModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disabled click outside to close as per user request
    // const handleOutsideClick = (event: MouseEvent) => {
    //   if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
    //     onClose();
    //   }
    // };
    // if (isOpen) {
    //   document.addEventListener('mousedown', handleOutsideClick);
    // }
    // return () => {
    //   document.removeEventListener('mousedown', handleOutsideClick);
    // };
  }, [isOpen, onClose]);

  if (!isOpen || !issue) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200"
      >
        <div className="relative h-64 bg-gray-200">
          {issue.imageUrl ? (
            <img 
              src={issue.imageUrl} 
              alt={issue.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="ml-2">No Image Available</span>
            </div>
          )}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{issue.title}</h2>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full font-medium">
                  {issue.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  issue.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                  issue.status === 'in progress' ? 'bg-blue-100 text-blue-800' : 
                  'bg-green-100 text-green-800'
                }`}>
                  {issue.status}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Description</h3>
              <p className="text-gray-700 leading-relaxed">{issue.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Assigned To</h3>
                <p className="text-gray-800">{issue.assignedTo || 'Unassigned'}</p>
              </div>
              {issue.location && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Location</h3>
                  <p className="text-gray-800">{issue.location}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
