import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const EditModal = ({ 
  show, 
  onHide, 
  formData, 
  onChange, 
  onSubmit, 
  statuses, 
  loading 
}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header>
        <Modal.Title>تحديد موعد للمريض</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>حالة الموعد</Form.Label>
            <Form.Select
              name="status"
              value={formData.status}
              onChange={onChange}
            >
              {statuses.map((status, index) => (
                <option key={index} value={status.value}>
                  {status.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>تاريخ الموعد</Form.Label>
            <Form.Control
              type="date"
              name="appointment_date"
              value={formData.appointment_date}
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>وقت الموعد</Form.Label>
            <Form.Control
              type="time"
              name="appointment_time"
              value={formData.appointment_time}
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>ملاحظات للمريض</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="admin_notes"
              placeholder="مثال: يرجى الحضور قبل الموعد بـ 10 دقائق"
              value={formData.admin_notes}
              onChange={onChange}
            />
          </Form.Group>

          <div className="d-flex gap-2">
            <Button 
              type="submit" 
              variant="primary" 
              className="flex-grow-1"
              disabled={loading}
            >
              {loading ? 'جاري الحفظ...' : 'حفظ التعديلات'}
            </Button>
            <Button 
              variant="secondary" 
              onClick={onHide}
            >
              إلغاء
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;