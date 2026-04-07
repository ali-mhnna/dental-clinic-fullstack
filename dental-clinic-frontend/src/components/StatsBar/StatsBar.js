import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './StatsBar.css';

const StatsBar = () => {
  const stats = [
    { value: '%100', label: 'جودة طبية' },
    { value: '24/7', label: 'طوارئ' },
    { value: '15+', label: 'سنة خبرة' },
    { value: '500+', label: 'مريض سعيد' },
  ];

  return (
    <section className="stats-bar">
      <Container>
        <Row className="stats-container">
          {stats.map((stat, index) => (
            <Col xs={6} md={3} key={index} className="stat-item">
              <h2>{stat.value}</h2>
              <p>{stat.label}</p>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default StatsBar;