import './App.css';
import Nav from './Nav'
import Header from './Header';
import Home from './Home';
import AboutUs from './AboutUs';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from './Products';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Header title={'Mesnica'} />
      <Routes>
        <Route index element={<Home />} />
        <Route path='proizvodi' element={<Products />} />
        <Route path='o_nama' element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
