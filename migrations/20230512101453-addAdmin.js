const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../config');

module.exports = {
  async up(db, client) {
    
    const password = await bcrypt.hash('Admin@123', SALT_ROUNDS);

    await db.collection('users').insertOne({
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@gmail.com',
      password,
      dob: '01/01/2001',
      role: 'admin',
    });
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    await db.collection('users').deleteOne({ email: 'admin@gmail.com' });
  }
};
