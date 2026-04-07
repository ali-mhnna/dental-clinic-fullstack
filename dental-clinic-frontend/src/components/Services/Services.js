import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaHeartbeat,
  FaShieldAlt,
  FaTeethOpen,
  FaMagic,
  FaChevronLeft,
} from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import "./Services.css";

const Services = () => {
  const services = [
    {
      icon: <FaHeartbeat />,
      title: "طب الأسنان الطارئ",
      description:
        "عناية فورية لآلام الأسنان المفاجئة والحوادث على مدار الساعة.",
    },
    {
      icon: <IoSparkles />,
      title: "تنظيف وتبييض الأسنان",
      description:
        "ابتسامة ناصعة البياض مع أحدث تقنيات التنظيف والتبييض الاحترافي.",
    },
    {
      icon: <FaShieldAlt />,
      title: "زراعة والتركيبات",
      description:
        "استعادة وظيفة وجمال أسنانك مع أفضل خامات الزرعات والتركيبات.",
    },
    {
      icon: <FaTeethOpen />,
      title: "تقويم الأسنان",
      description:
        "حلول تقويمية متطورة للأطفال والبالغين للحصول على ابتسامة مثالية.",
    },
    {
      icon: <FaMagic />,
      title: "تجميل الأسنان",
      description: "ابتسامة هوليود وفينير مخصص لتحسين مظهر أسنانك بشكل طبيعي.",
    },
  ];

  return (
    <section className="services-section" id="services">
      <Container>
        <div className="services-header">
          <h2>خدمات متكاملة لرعايتكم</h2>
          <div className="title-underline"></div>
        </div>

  <Row className="services-grid">
          {services.map((service, index) => (
            <Col lg={4} md={6} sm={12} key={index} className="mb-4">
              <div className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a
                  href="#contact"
                  className="more-link"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById("contact");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  تعرف على المزيد <FaChevronLeft />
                </a>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Services;
