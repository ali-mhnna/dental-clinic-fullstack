import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../../redux/slices/authSlice';
import './Auth.css'

const Login = ({ onSwitchToRegister, onClose }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login(credentials));
    if (result.type === 'auth/login/fulfilled') {
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
        تسجيل الدخول
      </h3>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>البريد الإلكتروني</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="example@email.com"
            value={credentials.email}
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
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button
          type="submit"
          className="w-100 submit-btn"
          disabled={loading}
        >
          {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
        </Button>
      </Form>

      <p className="text-center mt-3">
        ليس لديك حساب؟{' '}
        <span
          onClick={onSwitchToRegister}
          style={{ color: '#f27a54', cursor: 'pointer', fontWeight: 'bold' }}
        >
          إنشاء حساب جديد
        </span>
      </p>
    </div>
  );
};

export default Login;