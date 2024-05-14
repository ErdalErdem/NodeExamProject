import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.db' // Path to your existing SQLite database file
});

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Add other fields as necessary
}, {
  tableName: 'Users', // Use the existing users table
  timestamps: false // Assuming your existing table does not have timestamps
});

// Ensure the connection is successful
sequelize.authenticate().then(() => {
  console.log('Connection to SQLite has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

export { sequelize, User };
