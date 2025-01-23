import React from 'react';
import styled from 'styled-components';
import {Container, PageTitle, NotificationsList, NotificationCard, NotificationHeader, NotificationTitle, NotificationTime, NotificationMessage} from '../../styles/NotificationStyle';

const AdminNotificationsPage = () => {
  const notifications = [
    {
      id: 1,
      title: 'Expense Approved',
      message: 'Your expense for $250 has been approved.',
      timestamp: '2024-12-20 14:32',
      type: 'success',
    },
    {
      id: 2,
      title: 'New Message from Admin',
      message: 'Please update your profile details.',
      timestamp: '2024-12-19 10:15',
      type: 'info',
    },
    {
      id: 3,
      title: 'Expense Rejected',
      message: 'Your expense for $50 has been rejected due to incomplete details.',
      timestamp: '2024-12-18 08:45',
      type: 'error',
    },
  ];

  return (
    <Container>
      <PageTitle>Notifications</PageTitle>
      <NotificationsList>
        {notifications.map((notification) => (
          <NotificationCard key={notification.id} type={notification.type}>
            <NotificationHeader>
              <NotificationTitle>{notification.title}</NotificationTitle>
              <NotificationTime>{notification.timestamp}</NotificationTime>
            </NotificationHeader>
            <NotificationMessage>{notification.message}</NotificationMessage>
          </NotificationCard>
        ))}
      </NotificationsList>
    </Container>
  );
};

export default AdminNotificationsPage;
