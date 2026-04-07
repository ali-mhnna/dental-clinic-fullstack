import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Login from '../../Auth/Login';
import Register from '../../Auth/Register';

const AuthModal = ({ show, onHide }) => {
  const [authMode, setAuthMode] = useState('login');

  return (
    <Modal show={show} onHide={onHide} centered size="md">
      <Modal.Body className="p-4">
        {authMode === 'login' ? (
          <Login
            onSwitchToRegister={() => setAuthMode('register')}
            onClose={onHide}
          />
        ) : (
          <Register
            onSwitchToLogin={() => setAuthMode('login')}
            onClose={onHide}
          />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;