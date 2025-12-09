import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-9xl font-bold text-primary">404</h1>
      <h2 className="text-4xl font-bold mt-4">Page Not Found</h2>
      <p className="text-xl mt-4 text-gray-600">The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary mt-8">Go Back Home</Link>
    </div>
  );
};

export default NotFound;
