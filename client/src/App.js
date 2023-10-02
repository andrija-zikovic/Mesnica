import './App.css';
import Client from './Client/Client';
import Admin from './Admin/Admin';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Client />} />
        <Route path='admin/*' element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


