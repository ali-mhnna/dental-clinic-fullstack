import React from 'react';
import { Table, Badge, Button } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AppointmentsTable = ({ appointments, onEdit, onDelete }) => {
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
    <div className="table-responsive d-none d-lg-block">
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>المريض</th>
            <th>الهاتف</th>
            <th>الخدمة</th>
            <th>الرسالة</th>
            <th>الحالة</th>
            <th>تاريخ الطلب</th>
            <th>الموعد</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={appointment.id}>
              <td>{index + 1}</td>
              <td>{appointment.name}</td>
              <td dir="ltr">{appointment.phone}</td>
              <td>{appointment.service_type}</td>
              <td>{appointment.message || '-'}</td>
              <td>{getStatusBadge(appointment.status)}</td>
              <td>{appointment.created_at}</td>
              <td>
                {appointment.appointment_date 
                  ? `${appointment.appointment_date} - ${appointment.appointment_time}`
                  : '-'
                }
              </td>
              <td>
                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  className="me-2"
                  onClick={() => onEdit(appointment)}
                >
                  <FaEdit />
                </Button>
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={() => onDelete(appointment.id)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AppointmentsTable;