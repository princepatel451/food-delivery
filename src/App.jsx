import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Cart from './Pages/Cart/Cart';
import Placeorder from './Pages/Placeorder/Placeorder';
import './index.css'
import Footer from './Components/Footer/Footer';
import { useState } from 'react';
import LoginPopup from './Components/LoginPopup/LoginPopup';


const App = () => {

  const[showLogin,setShowLogin] = useState(false);

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className="app">
      <Navbar setShowLogin ={setShowLogin}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Order" element={<Placeorder />} />
      </Routes>
    </div>
    <Footer/>
    </>
    
  );
};

export default App;
