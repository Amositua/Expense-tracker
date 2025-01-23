import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import visibilityIcon from '../../assets/svg/visibilityIcon.svg'
import { useDispatch, useSelector } from 'react-redux'

import { useAdminLoginMutation } from '../../slices/usersApiSlice'
import { setCredentials } from '../../slices/authSlice'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'

function AdminSignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const history = useNavigate();

  const [login, { isLoading }] = useAdminLoginMutation()

    const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/admin-home';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    console.log(email, password)
    e.preventDefault()
    try {
      const res = await login({ email, password }).unwrap()
      dispatch(setCredentials({ ...res }))

      const token = res.accessToken
      console.log(token)

      const decodedToken = jwtDecode(token)
      const role = decodedToken.role
      console.log(role)
      if (role === 'ADMIN') {
        navigate('/admin-home')
      } else {
        navigate('/home')
      }
      console.log(res)
    } catch (err) {
      toast.error(err)
    }
  }

  return (
    <SignInContainer>
      <FormWrapper>
        <Header>Welcome Back Admin!</Header>
        <Form onSubmit={submitHandler}>
          <Input
            type='email'
            id='email'
            placeholder='Enter your email'
            value={email}
            onChange={onChange}
          />
          <PasswordWrapper>
            <Input
              type={showPassword ? 'text' : 'password'}
              id='password'
              placeholder='Enter your password'
              value={password}
              onChange={onChange}
            />
            <VisibilityIcon
              src={visibilityIcon}
              alt='Show Password'
              onClick={() => setShowPassword((prev) => !prev)}
            />
          </PasswordWrapper>
          <ForgotPasswordLink to='/forgot-password'>
            Forgot Password?
          </ForgotPasswordLink>
          <SignInButton type='submit'>Sign In</SignInButton>
        </Form>
        <Separator>OR</Separator>
        <GoogleButton>
          <GoogleIcon>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 48 48'
              width='20px'
              height='20px'
            >
              <path
                fill='#EA4335'
                d='M24 9.5c3.9 0 7.1 1.6 9.3 4.1l7-7c-4.4-4.1-10.2-6.6-16.3-6.6-8.6 0-16 4.9-19.5 12.3l7.5 5.8C13.8 13.6 18.6 9.5 24 9.5z'
              />
              <path
                fill='#4285F4'
                d='M48 24c0-1.6-.1-3.1-.4-4.5H24v8.5h13.5c-.6 3-2.4 5.5-5 7.2l7.5 5.8c4.4-4.1 7-10.2 7-16.5z'
              />
              <path
                fill='#FBBC05'
                d='M9.5 28.8c-1.1-3.4-1.1-7 0-10.4L2 12.7C-.8 17.4-.8 22.7 2 27.3l7.5-5.8z'
              />
              <path
                fill='#34A853'
                d='M24 38.5c-5.4 0-10.3-2.1-13.8-5.6L2.6 38.8C6.9 43.7 14.3 48 24 48c6.1 0 11.9-2.5 16.3-6.6l-7.5-5.8C31.1 37.4 27.9 38.5 24 38.5z'
              />
            </svg>
          </GoogleIcon>
          Sign in with Google
        </GoogleButton>
        
        <SignUpLink to='/sign-up'>
          Don’t have an account? <strong>Sign Up</strong>
        </SignUpLink>
        <SignUpLink to='/sign-in'>
          User? <strong>Sign in here</strong>
        </SignUpLink>
      </FormWrapper>
    </SignInContainer>
  )
}

export default AdminSignIn

const SignInContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f8fafc;
`

const FormWrapper = styled.div`
  width: 400px;
  padding: 2rem;
  background: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`

const Header = styled.h1`
  font-size: 24px;
  color: #1e3a8a;
  text-align: center;
  margin-bottom: 1.5rem;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  padding: 0.75rem 1rem;
  font-size: 16px;
  border: 1px solid #d1d5db;
  border-radius: 5px;
  margin-bottom: 1rem;
  outline: none;
  &:focus {
    border-color: #1e3a8a;
  }
`

const PasswordWrapper = styled.div`
  position: relative;
`

const VisibilityIcon = styled.img`
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  cursor: pointer;
  width: 20px;
  height: 20px;
`

const ForgotPasswordLink = styled(Link)`
  text-align: right;
  color: #1e3a8a;
  text-decoration: none;
  margin-bottom: 1.5rem;
  font-size: 14px;
  &:hover {
    text-decoration: underline;
  }
`

const SignInButton = styled.button`
  background-color: #1e3a8a;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 0.75rem;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #164a8a;
  }
`

const Separator = styled.div`
  text-align: center;
  margin: 1.5rem 0;
  font-size: 14px;
  color: #6b7280;
`

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  left: 70px;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 5px;
  padding: 0.75rem;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #f4f4f4;
  }
`

const GoogleIcon = styled.span`
  width: 20px;
  height: 20px;
  margin-right: 0.5rem;
`

const SignUpLink = styled(Link)`
  display: block;
  margin-top: 1.5rem;
  text-align: center;
  color: #1e3a8a;
  text-decoration: none;
  font-size: 14px;
  strong {
    font-weight: bold;
  }
  &:hover {
    text-decoration: underline;
  }
`
