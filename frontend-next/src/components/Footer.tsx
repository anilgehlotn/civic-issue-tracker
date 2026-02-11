import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
          
          {/* Brand & Social */}
          <div className="flex flex-col md:flex-row items-center md:space-x-4 space-y-2 md:space-y-0 text-center md:text-left">
             <div className="flex items-center space-x-2">
                <span className="font-bold text-gray-900 dark:text-white">CivicTracker</span>
                <span className="hidden md:inline text-gray-300 dark:text-gray-700">|</span>
             </div>
             <p className="hidden md:block">Empowering citizens.</p>
             <div className="flex space-x-3">
               <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" aria-label="Facebook">
                 <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
               </a>
               <a href="#" className="hover:text-blue-400 dark:hover:text-blue-300 transition-colors" aria-label="Twitter">
                 <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
               </a>
               <a href="#" className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors" aria-label="Instagram">
                 <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 A4.902 4.902 0 014.187 3.388c.636-.247 1.363-.416 2.427-.465C7.573 2.013 7.915 2 10.328 2h1.987Zm-1.987 5a5 5 0 100 10 5 5 0 000-10Zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4Zm6.5-6.9a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4Z" clipRule="evenodd" /></svg>
               </a>
             </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-4 font-medium">
            <Link href="/" className="text-black dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
            <Link href="/pages/report" className="text-black dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Report</Link>
            <Link href="/pages/track" className="text-black dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Track</Link>
            <Link href="/pages/about" className="text-black dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</Link>
            <Link href="/pages/help" className="text-black dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Help</Link>
          </div>

          {/* Copyright & Legal */}
          <div className="flex flex-col md:flex-row items-center md:space-x-4 space-y-1 md:space-y-0 text-[10px] text-gray-500">
             <p>&copy; {new Date().getFullYear()} Civic Issue Tracking System.</p>
             <div className="flex space-x-2">
                <Link href="/pages/privacy" className="hover:text-gray-900 dark:hover:text-gray-300">Privacy</Link>
                <Link href="/pages/terms" className="hover:text-gray-900 dark:hover:text-gray-300">Terms</Link>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
