import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../../redux/slices/authSlice';
import './Auth.css';

const Register = ({ onSwitchToLogin, onClose }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(register(formData));
    if (result.type === 'auth/register/fulfilled') {
      onClose();
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <div className="auth-form">
      <h3 className="text-center mb-4" style={{ color: '#0d3b66' }}>
        إنشاء حساب جديد
      </h3>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>الاسم الكامل</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="أدخل اسمك..."
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>البريد الإلكتروني</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="example@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>كلمة المرور</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>تأكيد كلمة المرور</Form.Label>
          <Form.Control
            type="password"
            name="password_confirmation"
            placeholder="********"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button
          type="submit"
          className="w-100 submit-btn"
          disabled={loading}
        >
          {loading ? 'جاري التسجيل...' : 'إنشاء حساب'}
        </Button>
      </Form>

      <p className="text-center mt-3">
        لديك حساب؟{' '}
        <span
          onClick={onSwitchToLogin}
          style={{ color: '#f27a54', cursor: 'pointer', fontWeight: 'bold' }}
        >
          تسجيل الدخول
        </span>
      </p>
    </div>
  );
};

export default Register;