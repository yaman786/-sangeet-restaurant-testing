const express = require('express');
const router = express.Router();

// Mock data for reservations
let mockReservations = [
  {
    id: 1,
    customer_name: 'John Doe',
    email: 'john@example.com',
    phone: '+85212345678',
    date: '2024-01-20',
    time: '19:00',
    guests: 4,
    special_requests: 'Window seat preferred',
    status: 'confirmed',
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    customer_name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+85287654321',
    date: '2024-01-22',
    time: '20:00',
    guests: 2,
    special_requests: null,
    status: 'pending',
    created_at: '2024-01-16T14:20:00Z'
  }
];

// Get all reservations
router.get('/', async (req, res) => {
  try {
    res.json(mockReservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
});

// Create a new reservation
router.post('/', async (req, res) => {
  try {
    const {
      customer_name,
      email,
      phone,
      date,
      time,
      guests,
      special_requests
    } = req.body;

    const newReservation = {
      id: mockReservations.length + 1,
      customer_name,
      email,
      phone,
      date,
      time,
      guests,
      special_requests: special_requests || null,
      status: 'pending',
      created_at: new Date().toISOString()
    };

    mockReservations.push(newReservation);

    res.status(201).json({
      message: 'Reservation created successfully',
      reservation: newReservation
    });
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ error: 'Failed to create reservation' });
  }
});

// Get reservation by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = mockReservations.find(res => res.id === parseInt(id));

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    res.json(reservation);
  } catch (error) {
    console.error('Error fetching reservation:', error);
    res.status(500).json({ error: 'Failed to fetch reservation' });
  }
});

// Update reservation status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const reservation = mockReservations.find(res => res.id === parseInt(id));

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    reservation.status = status;

    res.json({
      message: 'Reservation status updated successfully',
      reservation
    });
  } catch (error) {
    console.error('Error updating reservation status:', error);
    res.status(500).json({ error: 'Failed to update reservation status' });
  }
});

// Delete reservation
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const reservationIndex = mockReservations.findIndex(res => res.id === parseInt(id));

    if (reservationIndex === -1) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    mockReservations.splice(reservationIndex, 1);

    res.json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    console.error('Error deleting reservation:', error);
    res.status(500).json({ error: 'Failed to delete reservation' });
  }
});

module.exports = router; 