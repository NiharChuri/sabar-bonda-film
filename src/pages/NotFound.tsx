import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper-50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-6xl font-serif font-bold text-ink-900 mb-4">404</h1>
          <h2 className="text-2xl font-serif text-ink-700 mb-4">Page Not Found</h2>
          <p className="text-lg text-body leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/" 
            className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-medium shadow-sm bg-copper-500 text-white hover:bg-copper-600 focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2 transition-all duration-200"
          >
            <Home size={20} className="mr-2" />
            Return Home
          </a>
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-medium shadow-sm bg-leather-500 text-white hover:bg-[#5D412B] focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2 transition-all duration-200"
          >
            <ArrowLeft size={20} className="mr-2" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
