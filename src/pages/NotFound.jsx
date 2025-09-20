import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="page-container">
      <div className="section-padding">
        <div className="content-wrapper">
          <div className="text-center space-xl max-w-2xl mx-auto">
            <div className="space-lg">
              <div className="text-9xl font-light text-gray-200 mb-8">404</div>
              <h1 className="heading-lg mb-6">Page Not Found</h1>
              <p className="body-lg">
                The page you're looking for doesn't exist or has been moved to a different location.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button className="btn-primary">
                  <Home className="w-5 h-5 mr-2" />
                  Go Home
                </Button>
              </Link>
              <Button 
                onClick={() => window.history.back()} 
                className="btn-secondary"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;