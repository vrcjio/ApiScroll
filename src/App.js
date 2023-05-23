import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './Components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductSlug from './Components/ProductSlug';
import './Styles/products.css'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Product" element={<ProductSlug />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
