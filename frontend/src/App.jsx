import React from 'react'
import Navbar from './components/Navbar'
import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import Login from './pages/Login'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import useAuthStore from './store/useAuthStore.js'
import { useEffect } from 'react'



const App = () => {
  
  const {authUser,checkAuth} = useAuthStore();
  
  useEffect(() => {
    checkAuth();
  }
  , [checkAuth]);

  console.log(authUser);


  return (
    <div>
      <Navbar />
      <Routes>
      
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      
      </Routes>
    </div>
  )
}

export default App