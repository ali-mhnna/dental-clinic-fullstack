import React, { useEffect } from 'react';
import { Container, Card, Badge, Spinner, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchNotifications, markAsRead, markAllAsRead } from '../../redux/slices/notificationSlice';
import NavbarComponent from '../../components/Navbar/Navbar';
import { FaBell, FaCheckDouble, FaCalendarCheck } from 'react-icons/fa';
import './Notifications.css';

const Notifications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { notifications, loading, unreadCount } = useSelector((state) => state.notification);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
    dispatch(fetchNotifications());
  }, [isAuthenticated, navigate, dispatch]);

  const handleMarkAsRead = (id) => {
    dispatch(markAsRead(id));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

    if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <NavbarComponent />
      <div className="notifications-page">
        <Container>
          <div className="notifications-header">
            <div>
              <h1><FaBell /> الإشعارات</h1>
              <p>لديك {unreadCount} إشعارات غير مقروءة</p>
            </div>
            {unreadCount > 0 && (
              <Button 
                variant="outline-primary" 
                onClick={handleMarkAllAsRead}
                className="mark-all-btn"
              >
                <FaCheckDouble /> تعليم الكل كمقروء
              </Button>
            )}
          </div>

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : notifications.length === 0 ? (
            <Card className="empty-card">
              <Card.Body className="text-center">
                <FaBell className="empty-icon" />
                <p>لا يوجد إشعارات</p>
              </Card.Body>
            </Card>
          ) : (
            <div className="notifications-list">
              {notifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`notification-card ${!notification.is_read ? 'unread' : ''}`}
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  <Card.Body>
                    <div className="notification-icon">
                      <FaCalendarCheck />
                    </div>
                    <div className="notification-content">
                      <p>{notification.message}</p>
                      <span className="notification-time">{notification.created_at}</span>
                    </div>
                    {!notification.is_read && (
                      <Badge bg="primary" className="unread-badge">جديد</Badge>
                    )}
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default Notifications;