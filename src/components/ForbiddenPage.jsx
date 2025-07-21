import { Link } from 'react-router';

const ForbiddenPage = () => {
  return (
    <section>
      <title>Forbidden</title>
   
    <div className="min-h-screen flex flex-col justify-center items-center bg-base-200 text-center px-4">
      <h1 className="text-6xl font-bold text-error">403</h1>
      <p className="text-xl mt-4 text-base-content">
        You don’t have permission to access this page.
      </p>
      <Link to="/" className="btn btn-primary mt-6">
        Go to Home
      </Link>
    </div>
     </section>
  );
};

export default ForbiddenPage;
