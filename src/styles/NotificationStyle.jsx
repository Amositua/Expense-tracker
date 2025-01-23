import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 30px 20px;
  font-family: 'Poppins', sans-serif;
`;

export const PageTitle = styled.h1`
  font-size: 28px;
  text-align: center;
  margin-bottom: 30px;
  color: #1e3a8a;
`;

export const NotificationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const NotificationCard = styled.div`
  background: #f3f4ff;
  border-left: 6px solid #1e3a8a;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 15px 20px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
  }
`;

export const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const NotificationTitle = styled.h2`
  font-size: 18px;
  margin: 0;
  color: #2e3a59;
`;

export const NotificationTime = styled.span`
  font-size: 14px;
  color: #888;
`;

export const NotificationMessage = styled.p`
  font-size: 16px;
  color: #555;
  margin: 0;
`;
