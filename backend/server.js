// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// routers
const projectsRouter = require('./routes/projects');
const clientsRouter = require('./routes/clients');
const contactsRouter = require('./routes/contacts');
const subscribersRouter = require('./routes/subscribers');

const app = express();

// --------- Connect to DB (log and fail fast if needed) ----------
(async () => {
  try {
    await connectDB();
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    // exit process if DB is essential for the app
    process.exit(1);
  }
})();

// --------- Middlewares ----------
app.use(cors());
app.use(express.json({ limit: '10mb' })); // increase if you expect large payloads
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// serve uploaded images (static)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --------- API Routes ----------
app.use('/api/projects', projectsRouter);
app.use('/api/clients', clientsRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/subscribers', subscribersRouter);

// health check
app.get('/api/health', (req, res) => res.json({ ok: true }));

// 404 handler for unknown API routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

// centralized error handler
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ error: message });
});

// --------- Start Server ----------
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);

// handle unhandled promise rejections and graceful shutdown
process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
  // Give the process a chance to close properly
  server.close(() => process.exit(1));
});

process.on('SIGINT', () => {
  console.log('SIGINT received — shutting down gracefully');
  server.close(() => process.exit(0));
});
