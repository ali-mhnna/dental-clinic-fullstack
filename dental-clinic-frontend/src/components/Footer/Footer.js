import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="main-footer">
      <Container>
        <Row className="footer-container">
          <Col lg={4} md={6} className="footer-col about-col">
            <div className="footer-logo">
              <span className="logo-box">D</span> عيادات دالي لطب الأسنان
            </div>
            <p>
              نحن ملتزمون بتقديم أعلى مستويات الرعاية الصحية لأسنانكم باستخدام
              أحدث التقنيات وبأيدي أمهر الأطباء في الأردن.
            </p>
            <div className="social-links">
              <a
                href="https://wa.me/963935762054"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp />
              </a>
              <a href="tel:+963935762054">
                <FaPhoneAlt />
              </a>
            </div>
          </Col>

          <Col lg={3} md={6} className="footer-col">
            <h3>روابط سريعة</h3>
            <ul className="footer-links">
              <li>
                <a onClick={() => scrollToSection("hero")}>عن العيادة</a>
              </li>
              <li>
                <a onClick={() => scrollToSection("services")}>خدماتنا</a>
              </li>
              <li>
                <a onClick={() => scrollToSection("testimonials")}>
                  آراء المرضى
                </a>
              </li>
              <li>
                <a onClick={() => scrollToSection("contact")}>اتصل بنا</a>
              </li>
            </ul>
          </Col>

          <Col lg={4} md={6} className="footer-col contact-col">
            <h3>تواصل معنا</h3>
            <ul className="contact-details">
              <li>
                <FaMapMarkerAlt /> عمان، WWCF+GGC
              </li>
              <li dir="ltr">
                +963 935 762 054 <FaPhoneAlt />
              </li>
              <li>
                <FaEnvelope /> info@dali-dental.com
              </li>
            </ul>
          </Col>
        </Row>

        <div className="footer-bottom">
          <p>2026 © جميع الحقوق محفوظة لعيادات دالي لطب الأسنان</p>
          <small>تم إنشاء الموقع بواسطة علي مهنا | 963935762054+</small>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
