import React, { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'
// import PrivateRoute from './components/PrivateRoute'
import LogExpense from './pages/LogExpense'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import ExpenseListPage from './pages/ExpenseListPage'
import ExpenseDetailsPage from './pages/ExpenseDetailsPage'
import ChangePassword from './pages/changePassword'
import AdminHomepage from './pages/admin/AdminHompage'
import AllUsers from './pages/admin/AllUsers'
import AdminExpenseDetailsPage from './pages/admin/AdminExpenseDetail'
import AdminSignIn from './pages/admin/adminSignin'
import AdminNotificationsPage from './pages/admin/AdminNotification'
import AdminProfilePage from './pages/admin/AdminProfile'
import AdminNavbar from './components/AdminNavbar'
import EditExpense from './pages/ExpenseEditPage'
import AllExpenseList from './pages/admin/AllEXpenseList'
import { refreshToken } from './utils/refreshToken'
// import LogEditExpense from './pages/test'
import ReceiptViewer from './pages/ReceiptViewer'
import NewExpenseNotifications from './pages/test2'

process.env.HOST = window.location.host;

function isTokenExpired(token) {
  if (!token) return true

  try {
    const decoded = jwtDecode(token)
    const currentTime = Math.floor(Date.now() / 1000) // Current time in seconds
    return decoded.exp < currentTime
  } catch (error) {
    console.error('Error decoding token:', error)
    return true
  }
}

function App() {
  const location = useLocation()
  const showNavbar = !['/sign-in', '/sign-up', '/admin-sign-in'].includes(
    location.pathname
  )

  const token = localStorage.getItem('userInfo')
  let role

  if (token) {
    const decodedToken = jwtDecode(token)
    role = decodedToken.role
    console.log(role)
    console.log(decodedToken)
  }

  const navigate = useNavigate()
  useEffect(() => {
    const publicRoutes = ['/sign-up', '/forgot-password', '/admin-sign-in']

    // if (!token || isTokenExpired(token)) {
    //   localStorage.removeItem('userInfo')
    //   if (!publicRoutes.includes(location.pathname)) {
    //     navigate('/sign-in')
    //   }
    // }

    const checkToken = async () => {
      if (!token) {
        localStorage.removeItem('userInfo');
        if (!publicRoutes.includes(location.pathname)) {
        navigate('/sign-in', { replace: true });
        return;
        }
      }
  
      try {
        if (isTokenExpired(token)) {
          // Attempt to refresh the token
          const newToken = await refreshToken(); 
          // or remove refresh tojen and use logout functionality and navigate to sign in
          console.log('Token refreshed successfully:', newToken);
        }
      } catch (error) {
        // If refresh fails, log the user out
        localStorage.removeItem('userInfo');
        if (!publicRoutes.includes(location.pathname)) {
        navigate('/sign-in', { replace: true });
      }
    }
    };
  
    checkToken();
  }, [token, navigate, location.pathname])

  return (
    <>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/admin-sign-in' element={<AdminSignIn />} />
        <Route path='/home' element={<Home />} />

        <Route path='/profile' element={<Profile />} />

        <Route path='/log-expense' element={<LogExpense />} />
        <Route path='/expense-list' element={<ExpenseListPage />} />
        <Route path='/expense/:id' element={<ExpenseDetailsPage />} />
        <Route path='/edit-expense/:id' element={<EditExpense />} />
        <Route path='/notifications' element={<Notifications />} />
        <Route path='/change-password' element={<ChangePassword />} />

        {/* <Route path='/test2' element={<NewExpenseNotifications />} />       */}

        {/* <Route path='/forgot-password' element={<ForgotPassword />} /> */}

        {/* ADMIN */}
        <Route path='/admin-home' element={<AdminHomepage />} />
        <Route path='/admin-navbar' element={<AdminNavbar />} />
        <Route path='/all-users' element={<AllUsers />} />
        <Route path='/all-expense' element={<AllExpenseList />} />
        <Route path='/admin-expense/:id' element={<AdminExpenseDetailsPage />} />
        <Route path="/view-receipt" element={<ReceiptViewer />} />
        <Route
          path='/admin-notification'
          element={<AdminNotificationsPage />}
        />
        <Route path='/admin-profile' element={<AdminProfilePage />} />
      </Routes>
      {showNavbar && (role === 'ADMIN' ? <AdminNavbar /> : <Navbar />)}
      <ToastContainer />
    </>
  )
}

export default App
