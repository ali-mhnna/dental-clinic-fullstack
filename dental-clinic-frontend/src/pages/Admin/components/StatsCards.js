import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FaCalendarAlt, FaClock, FaCheckCircle } from 'react-icons/fa';

const StatsCards = ({ appointments }) => {
  const totalAppointments = appointments.length;
  const newAppointments = appointments.filter(a => a.status === 'new').length;
  const scheduledAppointments = appointments.filter(a => a.status === 'scheduled').length;

  return (
    <Row className="mb-4">
      <Col md={4}>
        <Card className="stat-card">
          <Card.Body>
            <FaCalendarAlt className="stat-icon" />
            <h3>{totalAppointments}</h3>
            <p>إجمالي المواعيد</p>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="stat-card">
          <Card.Body>
            <FaClock className="stat-icon pending" />
            <h3>{newAppointments}</h3>
            <p>مواعيد جديدة</p>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="stat-card">
          <Card.Body>
            <FaCheckCircle className="stat-icon success" />
            <h3>{scheduledAppointments}</h3>
            <p>مواعيد مؤكدة</p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default StatsCards;