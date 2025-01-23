import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  background: #1e3a8a;
  color: white;
  padding: 20px;
  border-radius: 10px;
`;

export const ProfilePicture = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  // border: 3px solid #fff;
  margin-right: 20px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Name = styled.h1`
  margin: 0;
  font-size: 24px;
  color: #fff;
`;

export const Email = styled.p`
  margin: 5px 0;
  font-size: 16px;
  opacity: 0.9;
`;

export const Role = styled.p`
  font-size: 14px;
  margin: 0;
  // font-style: italic;
  color: #c9d1d9;
`;

export const InfoSection = styled.section`
  margin: 30px 0;
  padding: 20px;
  background: #f4f4f4;
  border-radius: 10px;
  // box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 15px;
  color: #1e3a8a;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
`;

export const Label = styled.span`
  font-size: 14px;
  color: #888;
  margin-bottom: 5px;
`;

export const Value = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

export const ActionsSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

export const ActionLink = styled.a`
  font-size: 16px;
  color: #1e3a8a;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #0056b3;
  }
`;

export const LogoutButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background: #e63946;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #d62839;
  }
`;
