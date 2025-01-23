import { Navigate, Outlet } from 'react-router-dom'
import Spinner from './Spinner'

const PrivateRoute = () => {
  const loggedIn = false

  return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />
}

export default PrivateRoute
