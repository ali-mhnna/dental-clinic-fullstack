import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  FaCalendarAlt,
  FaWhatsapp,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import clinicImage from "../../assets/images/clinic.jpg";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero-section" id="hero">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="hero-content">
            <h1>
              عيادة دالي لطب الأسنان <br />
              <span>عناية فائقة وابتسامة مثالية</span>
            </h1>
            <p>
              نقدم لكم في عيادات دالي أحدث تقنيات طب الأسنان بإشراف طاقم طبي
              متميز، تخصصنا في حالات الطوارئ والتجميل لنبقي ابتسامتكم دائماً في
              أبهى صورها.
            </p>

            <div className="hero-btns">
              <Button
                className="btn-appointment"
                onClick={() => {
                  const element = document.getElementById("contact");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <FaCalendarAlt /> احجز موعدك الآن
              </Button>
              <a
                href="https://wa.me/963935762054"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <FaWhatsapp /> واتساب
              </a>
            </div>
            <div className="rating">
              <span className="rating-text">أكثر من 65 تقييماً على Google</span>
              <div className="rating-stars">
                <span className="score">4.6</span>
                <span className="stars">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalfAlt />
                </span>
              </div>
            </div>
          </Col>

          <Col lg={6} className="hero-image d-none d-lg-block">
            <img
              src={clinicImage}
              alt="Clinic Interior"
              className="img-fluid"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
