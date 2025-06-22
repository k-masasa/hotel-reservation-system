import app from './app';
import db from './database/db';

const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Run migrations on startup
const runMigrations = async () => {
  try {
    console.log('🔄 Running database migrations...');
    await db.migrate.latest();
    console.log('✅ Database migrations completed');
  } catch (error) {
    console.error('❌ Migration error:', error);
    process.exit(1);
  }
};

const startServer = async () => {
  // Run migrations first
  await runMigrations();
  
  const server = app.listen(PORT, () => {
    console.log('🏨 ========================================');
    console.log('🏨 Hotel Reservation System Backend API');
    console.log('🏨 ========================================');
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`🌍 Environment: ${NODE_ENV}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
    console.log(`📚 API docs: http://localhost:${PORT}/api`);
    console.log('🏨 ========================================');
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('🛑 SIGTERM received, shutting down gracefully...');
    server.close(async () => {
      await db.destroy();
      console.log('✅ Server closed');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    console.log('🛑 SIGINT received, shutting down gracefully...');
    server.close(async () => {
      await db.destroy();
      console.log('✅ Server closed');
      process.exit(0);
    });
  });
  
  return server;
};

startServer().catch(error => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});

export default app;