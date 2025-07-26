import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">👨‍💻 CV Builder</h1>
      <p className="text-gray-700 mb-6 max-w-xl">
        Build your professional resume easily. Choose a template, fill in your details, and export it as a high-quality PDF.
      </p>
      <div className="flex gap-4">
        <Link
          to="/login"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
