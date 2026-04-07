import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { saveTempFormData, createAppointment, clearMessages } from '../../redux/slices/appointmentSlice';
import api from '../../services/api';
import ContactInfo from './components/ContactInfo';
import ContactForm from './components/ContactForm';
import AuthModal from './components/AuthModal';
import './Contact.css';

const Contact = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { tempFormData, loading, success, error } = useSelector((state) => state.appointment);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service_type: '',
    message: '',
  });

  const [services, setServices] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/services');
        setServices(response.data.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    if (isAuthenticated && tempFormData) {
      dispatch(createAppointment(tempFormData));
      setShowAuthModal(false);
    }
  }, [isAuthenticated, tempFormData, dispatch]);

  useEffect(() => {
    if (success) {
      setFormData({
        name: '',
        phone: '',
        service_type: '',
        message: '',
      });
      setTimeout(() => {
        dispatch(clearMessages());
      }, 3000);
    }
  }, [success, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      dispatch(saveTempFormData(formData));
      setShowAuthModal(true);
    } else {
      dispatch(createAppointment(formData));
    }
  };

  return (
    <>
      <section className="contact-section" id="contact">
        <Container>
          <Row className="contact-container">
            <ContactInfo />
            <ContactForm
              formData={formData}
              services={services}
              loading={loading}
              success={success}
              error={error}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          </Row>
        </Container>
      </section>

      <AuthModal
        show={showAuthModal}
        onHide={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default Contact;