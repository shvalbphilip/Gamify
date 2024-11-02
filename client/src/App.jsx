import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RoleContext } from './components/Auth/Auth';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import Home from './pages/Home/Home';
import TFE from './games/TFE/TFE';
import Snake from './games/Snake/Snake';
import SnakesAndLadders from './games/Snakes-and-ladders/Snakes-and-ladders';
import Settings from './pages/Settings/Settings';
import AllUsersPage from './components/AllUsers/AllUsers';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { LoggedRoutes } from './Routes/Routes';


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const { role } = useContext(RoleContext);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <BrowserRouter basename="/philip_shvalb/Gamify">
      <ScrollToTop /> {/* Add ScrollToTop component */}
      <div className="min-h-screen">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route element={<LoggedRoutes role={role} />}>
            <Route path="/games/2048" element={<TFE />} />
          </Route>
          <Route path="/games/snake" element={<Snake />} />
          <Route path="/games/Snakes-and-Ladders" element={<SnakesAndLadders />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/all-users" element={<AllUsersPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;