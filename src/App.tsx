import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Layout from './components/layout/Layout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout />
      </BrowserRouter>

    </div>
  );
}

export default App;
