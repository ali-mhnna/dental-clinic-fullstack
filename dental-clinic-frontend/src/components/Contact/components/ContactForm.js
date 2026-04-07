import React from "react";
import { Col, Form, Button } from "react-bootstrap";

const ContactForm = ({
  formData,
  services,
  loading,
  success,
  error,
  onChange,
  onSubmit,
}) => {
  return (
    <Col lg={7}>
      <div className="contact-form-card">
        {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <Form onSubmit={onSubmit}>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="form-group">
                <Form.Label>الاسم بالكامل</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="أحمد..."
                  value={formData.name}
                  onChange={onChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="form-group">
                <Form.Label>رقم الهاتف</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder="078..."
                  value={formData.phone}
                  onChange={onChange}
                  required
                />
              </Form.Group>
            </div>
          </div>

          <Form.Group className="form-group">
            <Form.Label>الخدمة المطلوبة</Form.Label>
            <Form.Select
              name="service_type"
              value={formData.service_type}
              onChange={onChange}
              required
            >
              {" "}
              <option value="">اختر الخدمة...</option>
              {services.map((service, index) => (
                <option key={index} value={service}>
                  {service}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label>رسالة إضافية</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="message"
              placeholder="اكتب رسالتك هنا..."
              value={formData.message}
              onChange={onChange}
            />
          </Form.Group>

          <Button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "جاري الإرسال..." : "إرسال الطلب وحجز موعد"}
          </Button>
        </Form>
      </div>
    </Col>
  );
};

export default ContactForm;
