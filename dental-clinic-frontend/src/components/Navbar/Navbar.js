import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Dropdown, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {  FaUser, FaBell, FaSignOutAlt, FaCalendarAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { fetchNotifications } from '../../redux/slices/notificationSlice';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import './Navbar.css';

const NavbarComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { unreadCount } = useSelector((state) => state.notification);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchNotifications());
    }
  }, [isAuthenticated, dispatch]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/');
  };

  return (
    <>
      <Navbar expand="lg" className="navbar-custom py-3">
        <Container>
          <Navbar.Brand as={Link} to="/" className="logo">
            <span className="logo-box">D</span>
            عيادات دالي
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-nav" />

          <Navbar.Collapse id="main-nav">
            <Nav className="mx-auto nav-links">
              <Nav.Link onClick={() => scrollToSection("hero")}>
                الرئيسية
              </Nav.Link>
              <Nav.Link onClick={() => scrollToSection("services")}>
                خدماتنا
              </Nav.Link>
              <Nav.Link onClick={() => scrollToSection("testimonials")}>
                آراء المرضى
              </Nav.Link>
              <Nav.Link onClick={() => scrollToSection("contact")}>
                اتصل بنا
              </Nav.Link>
            </Nav>

            <div className="d-flex align-items-center gap-3">
              

              {isAuthenticated ? (
                <Dropdown align="end">
                  <Dropdown.Toggle variant="link" className="user-dropdown">
                    <FaUser className="me-2" />
                    {user?.name}
                    {unreadCount > 0 && (
                      <span className="notification-badge">{unreadCount}</span>
                    )}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {user?.role === "admin" ? (
                      <Dropdown.Item as={Link} to="/admin">
                        <FaCalendarAlt className="me-2" /> لوحة التحكم
                      </Dropdown.Item>
                    ) : (
                      <Dropdown.Item as={Link} to="/dashboard">
                        <FaCalendarAlt className="me-2" /> مواعيدي
                      </Dropdown.Item>
                    )}
                    <Dropdown.Item as={Link} to="/notifications">
                      <FaBell className="me-2" /> الإشعارات
                      {unreadCount > 0 && (
                        <span className="badge bg-danger ms-2">
                          {unreadCount}
                        </span>
                      )}
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                      <FaSignOutAlt className="me-2" /> تسجيل الخروج
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <button
                  className="btn-login"
                  onClick={() => {
                    setAuthMode("login");
                    setShowAuthModal(true);
                  }}
                >
                  تسجيل الدخول
                </button>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Auth Modal */}
      <Modal
        show={showAuthModal}
        onHide={() => setShowAuthModal(false)}
        centered
      >
        <Modal.Body className="p-4">
          {authMode === "login" ? (
            <Login
              onSwitchToRegister={() => setAuthMode("register")}
              onClose={() => setShowAuthModal(false)}
            />
          ) : (
            <Register
              onSwitchToLogin={() => setAuthMode("login")}
              onClose={() => setShowAuthModal(false)}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavbarComponent;
