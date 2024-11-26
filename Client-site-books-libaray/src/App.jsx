import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="text-2xl font-bold  min-h-screen flex items-center justify-center">
      <Link to="/Users">
        <h1 className="btn px-10 py-3 btn-accent text-white">
          Books লাইব্রেরি
        </h1>
      </Link>
    </div>
  );
}

export default App;
