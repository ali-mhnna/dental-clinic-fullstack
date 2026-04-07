import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaStar, FaRegStar } from 'react-icons/fa';
import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'أحمد العبادي',
      initial: 'أ',
      color: 'blue',
      time: 'قبل شهر',
      rating: 5,
      text: '"تجربة ممتازة جداً، العيادة قمة في الرقي والنظافة. الكادر الطبي محترف جداً وخاصة في الحالات الطارئة."',
    },
    {
      name: 'سارة محمود',
      initial: 'س',
      color: 'yellow',
      time: 'قبل أسبوعين',
      rating: 5,
      text: '"أفضل عيادة أسنان في عمان، دقة في المواعيد وتعامل راقي جداً. شكراً جزيلاً للطاقم."',
    },
    {
      name: 'محمد خالد',
      initial: 'م',
      color: 'green',
      time: 'قبل 3 أشهر',
      rating: 4,
      text: '"نظافة فائقة واهتمام بالتفاصيل. شعرت بالراحة التامة خلال فترة العلاج."',
    },
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? <FaStar key={i} /> : <FaRegStar key={i} />);
    }
    return stars;
  };

  return (
    <section className="testimonials-section" id="testimonials">
      <Container>
        <div className="section-header">
          <h2>ماذا يقول مرضانا؟</h2>
          <p>بناءً على أكثر من 65 تقييم حقيقي على Google</p>
        </div>

        <Row>
          {testimonials.map((testimonial, index) => (
            <Col lg={4} md={6} key={index} className="mb-4">
              <div className="testimonial-card">
                <div className="stars">{renderStars(testimonial.rating)}</div>
                <p className="review-text">{testimonial.text}</p>
                <div className="patient-info">
                  <div className="patient-details">
                    <h4>{testimonial.name}</h4>
                    <span>{testimonial.time}</span>
                  </div>
                  <div className={`avatar ${testimonial.color}`}>
                    {testimonial.initial}
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Testimonials;