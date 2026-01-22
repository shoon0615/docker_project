'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from '@/app/auth/actions';

export default function Sidebar({ user }) {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div
      className={`bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 h-screen transition-all duration-300 ease-in-out
        ${isOpen ? 'w-64' : 'w-16'} flex flex-col`}
    >
      <div className="p-4 flex justify-between items-center">
        {isOpen && <h2 className="text-xl font-bold">Notion Clone</h2>}
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
          {isOpen ? '<' : '>'}
        </button>
      </div>

      {isOpen && (
        <nav className="mt-4 flex-grow">
          <ul>
            <li className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">Search</li>
            <li className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">Home</li>
            <li className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">Meetings</li>
            <li className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">Notion AI</li>
            <li className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">Projects</li>
            <li className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">Work Log</li>
          </ul>
          <div className="mt-4 border-t border-gray-300 dark:border-gray-600 pt-4">
            <h3 className="px-4 text-sm font-semibold mb-2">Notion Web</h3>
            <h3 className="px-4 text-sm font-semibold mb-2">Notion Calendar</h3>
          </div>
        </nav>
      )}

      {isOpen && (
        <div className="p-4 border-t border-gray-300 dark:border-gray-600">
          {user ? (
            <button onClick={handleLogout} className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
              로그아웃
            </button>
          ) : (
            <Link href="/login" className="w-full py-2 text-center bg-green-500 text-white rounded-md hover:bg-green-600 block">
              로그인
            </Link>
          )}
        </div>
      )}
    </div>
  );
}