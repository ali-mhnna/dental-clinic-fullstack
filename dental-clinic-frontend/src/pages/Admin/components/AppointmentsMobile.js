import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { FaEdit, FaTrash, FaCheckCircle } from 'react-icons/fa';

const AppointmentsMobile = ({ appointments, onEdit, onDelete }) => {
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

  return (
    <div className="mobile-cards d-lg-none">
      {appointments.map((appointment) => (
        <Card key={appointment.id} className="appointment-mobile-card">
          <Card.Body>
            <div className="mobile-card-header">
              <h5>{appointment.name}</h5>
              {getStatusBadge(appointment.status)}
            </div>
            <div className="mobile-card-body">
              <p><strong>الهاتف:</strong> <span dir="ltr">{appointment.phone}</span></p>
              <p><strong>الخدمة:</strong> {appointment.service_type}</p>
              <p><strong>تاريخ الطلب:</strong> {appointment.created_at}</p>
              {appointment.message && (
                <p><strong>الرسالة:</strong> {appointment.message}</p>
              )}
              {appointment.appointment_date && (
                <p className="scheduled-info">
                  <FaCheckCircle className="text-success me-2" />
                  <strong>الموعد:</strong> {appointment.appointment_date} - {appointment.appointment_time}
                </p>
              )}
            </div>
            <div className="mobile-card-actions">
              <Button 
                variant="outline-primary" 
                size="sm"
                onClick={() => onEdit(appointment)}
              >
                <FaEdit /> تعديل
              </Button>
              <Button 
                variant="outline-danger" 
                size="sm"
                onClick={() => onDelete(appointment.id)}
              >
                <FaTrash /> حذف
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default AppointmentsMobile;