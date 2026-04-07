import React from "react";
import { Container } from "react-bootstrap";
import { FaClock, FaPhoneAlt } from "react-icons/fa";
import "./EmergencyCTA.css";

const EmergencyCTA = () => {
  return (
    <section className="emergency-cta">
      <Container>
        <div className="cta-card">
          <div className="cta-icon">
            <FaClock />
          </div>
          <h2>هل تعاني من ألم مفاجئ؟</h2>
          <p>
            نحن جاهزون لاستشارتكم في حالات طوارئ الأسنان على مدار الساعة. لا
            تتردد بالاتصال بنا فوراً.
          </p>
          <a href="tel:+963935762054" className="btn-emergency-call">
            <FaPhoneAlt /> اتصال طارئ
          </a>
        </div>
      </Container>
    </section>
  );
};

export default EmergencyCTA;
