import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
          <div className="card bg-base-100 shadow-xl max-w-md">
            <div className="card-body text-center">
              <h2 className="card-title text-error justify-center">Oops! Something went wrong</h2>
              <p className="text-base-content/70 mb-4">
                We encountered an unexpected error. Please try refreshing the page.
              </p>
              <div className="card-actions justify-center">
                <button 
                  onClick={() => window.location.reload()} 
                  className="btn btn-primary"
                >
                  Refresh Page
                </button>
                <button 
                  onClick={() => window.history.back()} 
                  className="btn btn-outline"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;