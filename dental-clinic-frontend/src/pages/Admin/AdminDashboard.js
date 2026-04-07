import React, { useEffect, useState } from 'react';
import { Container, Card, Spinner, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllAppointments } from '../../redux/slices/appointmentSlice';
import { updateAppointment, deleteAppointment, clearAdminMessages } from '../../redux/slices/adminSlice';
import NavbarComponent from '../../components/Navbar/Navbar';
import StatsCards from './components/StatsCards';
import AppointmentsTable from './components/AppointmentsTable';
import AppointmentsMobile from './components/AppointmentsMobile';
import EditModal from './components/EditModal';
import api from '../../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { appointments, loading } = useSelector((state) => state.appointment);
  const { loading: adminLoading, success, error } = useSelector((state) => state.admin);

  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [statuses, setStatuses] = useState([]);
  const [formData, setFormData] = useState({
    status: '',
    appointment_date: '',
    appointment_time: '',
    admin_notes: '',
  });

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await api.get('/statuses');
        setStatuses(response.data.data);
      } catch (error) {
        console.error('Error fetching statuses:', error);
      }
    };
    fetchStatuses();
  }, []);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/');
      return;
    }
    dispatch(fetchAllAppointments());
  }, [isAuthenticated, user, navigate, dispatch]);

  useEffect(() => {
    if (success) {
      dispatch(fetchAllAppointments());
      setShowModal(false);
      setTimeout(() => {
        dispatch(clearAdminMessages());
      }, 3000);
    }
  }, [success, dispatch]);

   const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setFormData({
      status: appointment.status,
      appointment_date: appointment.appointment_date || '',
      appointment_time: appointment.appointment_time || '',
      admin_notes: appointment.admin_notes || '',
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الموعد؟')) {
      dispatch(deleteAppointment(id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateAppointment({
      id: selectedAppointment.id,
      data: formData,
    }));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  return (
    <>
      <NavbarComponent />
      <div className="admin-page">
        <Container>
          <div className="admin-header">
            <h1>لوحة تحكم الأدمن 🔧</h1>
            <p>إدارة مواعيد المرضى</p>
          </div>

          {success && <Alert variant="success">{success}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <StatsCards appointments={appointments} />

          <Card className="table-card">
            <Card.Body>
              <h2 className="section-title">جميع المواعيد</h2>

              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : appointments.length === 0 ? (
                <p className="text-center py-5 text-muted">لا يوجد مواعيد</p>
              ) : (
                <>
                  <AppointmentsTable 
                    appointments={appointments} 
                    onEdit={handleEdit} 
                    onDelete={handleDelete} 
                  />
                  <AppointmentsMobile 
                    appointments={appointments} 
                    onEdit={handleEdit} 
                    onDelete={handleDelete} 
                  />
                </>
              )}
            </Card.Body>
          </Card>
        </Container>
      </div>

      <EditModal
        show={showModal}
        onHide={() => setShowModal(false)}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        statuses={statuses}
        loading={adminLoading}
      />
    </>
  );
};

export default AdminDashboard;