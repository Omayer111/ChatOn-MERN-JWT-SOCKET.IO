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
import {Loader} from 'lucide-react'
import {Navigate} from 'react-router-dom'

const App = () => {
  
  const {authUser,checkAuth,isCheckingAuth} = useAuthStore();
  
  useEffect(() => {
    checkAuth();
  }
  , [checkAuth]);

  if(!authUser && isCheckingAuth === true){
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className='size-10 animate-spin' />
      </div>
    )
  }


  console.log(authUser);


  return (
    <div>
      <Navbar />
      <Routes>
      
        <Route path="/" element={authUser? <HomePage /> : <Navigate to="/login" /> } />
        <Route path="/register" element={authUser? <Navigate to='/' /> : <RegisterPage /> } />
        <Route path="/login" element={authUser? <Navigate to='/' /> : <Login /> } />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser? <ProfilePage /> : <Navigate to="/login" /> } />
      
      </Routes>
    </div>
  )
}

export default App