import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserAppointments } from '../../redux/slices/appointmentSlice';
import { fetchNotifications } from '../../redux/slices/notificationSlice';
import NavbarComponent from '../../components/Navbar/Navbar';
import { FaCalendarAlt, FaBell, FaClock, FaCheckCircle } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { appointments, loading } = useSelector((state) => state.appointment);
  const { unreadCount } = useSelector((state) => state.notification);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
    dispatch(fetchUserAppointments());
    dispatch(fetchNotifications());
  }, [isAuthenticated, navigate, dispatch]);

  const getStatusBadge = (status) => {
    const statusMap = {
      new: { text: 'جديد', bg: 'primary' },
      reviewing: { text: 'قيد المراجعة', bg: 'info' },
      scheduled: { text: 'تم تحديد موعد', bg: 'success' },
      completed: { text: 'مكتمل', bg: 'secondary' },
      cancelled: { text: 'ملغي', bg: 'danger' },
    };
    const statusInfo = statusMap[status] || { text: status, bg: 'secondary' };
    return <Badge bg={statusInfo.bg}>{statusInfo.text}</Badge>;
  };

   if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <NavbarComponent />
      <div className="dashboard-page">
        <Container>
          <div className="dashboard-header">
            <h1>مرحباً {user?.name} 👋</h1>
            <p>إدارة مواعيدك وإشعاراتك</p>
          </div>

          <Row className="mb-4">
            <Col md={4}>
              <Card className="stat-card">
                <Card.Body>
                  <FaCalendarAlt className="stat-icon" />
                  <h3>{appointments.length}</h3>
                  <p>إجمالي المواعيد</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="stat-card">
                <Card.Body>
                  <FaClock className="stat-icon pending" />
                  <h3>{appointments.filter(a => a.status === 'new').length}</h3>
                  <p>بانتظار الرد</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="stat-card">
                <Card.Body>
                  <FaBell className="stat-icon notifications" />
                  <h3>{unreadCount}</h3>
                  <p>إشعارات جديدة</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <h2 className="section-title">مواعيدي</h2>

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : appointments.length === 0 ? (
            <Card className="empty-card">
              <Card.Body className="text-center">
                <FaCalendarAlt className="empty-icon" />
                <p>لا يوجد مواعيد حالياً</p>
              </Card.Body>
            </Card>
          ) : (
            <Row>
              {appointments.map((appointment) => (
                <Col lg={6} key={appointment.id} className="mb-4">
                  <Card className="appointment-card">
                    <Card.Body>
                      <div className="appointment-header">
                        <h4>{appointment.service_type}</h4>
                        {getStatusBadge(appointment.status)}
                      </div>
                      <p className="appointment-message">{appointment.message || 'لا يوجد رسالة'}</p>
                      <div className="appointment-details">
                        <span><FaCalendarAlt /> {appointment.created_at}</span>
                      </div>
                      {appointment.appointment_date && (
                        <div className="appointment-scheduled">
                          <FaCheckCircle className="text-success" />
                          <span>الموعد: {appointment.appointment_date} - {appointment.appointment_time}</span>
                        </div>
                      )}
                      {appointment.admin_notes && (
                        <div className="admin-notes">
                          <strong>ملاحظات الطبيب:</strong>
                          <p>{appointment.admin_notes}</p>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </div>
    </>
  );
};

export default Dashboard;