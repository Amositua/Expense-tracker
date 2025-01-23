import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import {
  Container,
  Header,
  ProfilePicture,
  UserInfo,
  Name,
  Email,
  Role,
  InfoSection,
  SectionTitle,
  InfoGrid,
  InfoItem,
  Label,
  Value,
  ActionsSection,
  ActionLink,
  LogoutButton,
} from '../styles/ProfileStyle'
import { useNavigate } from 'react-router-dom'
import { logout } from '../slices/authSlice'
import { useDispatch } from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice'
import Image from '../assets/img/empty2.webp'

const ProfilePage = () => {
  const [decodedToken, setDecodedToken] = useState(null);
  const [logoutCall, { isLoading }] = useLogoutMutation(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('userInfo');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setDecodedToken(decodedToken);
        console.log(decodedToken)
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    }
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem('userInfo');
    const parsedToken = JSON.parse(token);
    const accessToken = parsedToken?.accessToken;
    console.log(accessToken);
    try {
     const res = await logoutCall(accessToken).unwrap(); // `.unwrap()` resolves the mutation to a Promise
     console.log(res);
      dispatch(logout());
      navigate('/sign-in');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <Container>
      <Header>
        <ProfilePicture src={Image} alt='User Profile' />
        <UserInfo>
          <Name>{decodedToken?.name}</Name>
          {/* <Email>joseph@gmail.com</Email> */}
          <Role>User ID: {decodedToken?.userId}</Role>
        </UserInfo>
      </Header>

      <InfoSection>
        <SectionTitle>Personal Information</SectionTitle>
        <InfoGrid>
          <InfoItem>
            <Label>Full Name</Label>
            <Value>{decodedToken?.name}</Value>
          </InfoItem>
          <InfoItem>
            <Label>Email</Label>
            <Value>{decodedToken?.sub}</Value>
          </InfoItem>
          {/* <InfoItem>
            <Label>Department</Label>
            <Value>Sales</Value>
          </InfoItem>
          <InfoItem>
            <Label>Phone Number</Label>
            <Value>+23490786647</Value>
          </InfoItem> */}
        </InfoGrid>
      </InfoSection>

      <ActionsSection>
        <ActionLink href="/change-password">Change Password</ActionLink>
        <LogoutButton onClick={handleLogout} disabled={isLoading}>
          Logout
        </LogoutButton>
      </ActionsSection>
    </Container>
  )
}

export default ProfilePage
