import React from 'react';
import { Col } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhoneAlt, FaClock } from 'react-icons/fa';

const ContactInfo = () => {
  return (
    <Col lg={5} className="contact-info">
      <h2>يسعدنا تواصلكم وحجز مواعيدكم</h2>

      <div className="info-item">
        <div className="info-icon">
          <FaMapMarkerAlt />
        </div>
        <div className="info-text">
          <h3>موقعنا</h3>
          <p>عمان، الأردن - WWCF+GGC</p>
        </div>
      </div>

      <div className="info-item">
        <div className="info-icon">
          <FaPhoneAlt />
        </div>
        <div className="info-text">
          <h3>رقم الهاتف</h3>
          <p dir="ltr">+963 935 762 054</p>
        </div>
      </div>

      <div className="info-item">
        <div className="info-icon">
          <FaClock />
        </div>
        <div className="info-text">
          <h3>ساعات العمل</h3>
          <p>يومياً من الساعة 9 صباحاً - 9 مساءً</p>
          <span className="emergency-note">خدمة الطوارئ متوفرة 24/7</span>
        </div>
      </div>
    </Col>
  );
};

export default ContactInfo;