// tests/user.test.js
const mongoose = require('mongoose');
const User = require('../models/User');

describe('User Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/testdb', { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('create & save user successfully', async () => {
    const userData = { name: 'John Doe', email: 'john@example.com', password: 'password123' };
    const validUser = new User(userData);
    const savedUser = await validUser.save();
    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.email).toBe(userData.email);
  });

  it('should not save user without email field', async () => {
    const userWithoutEmail = new User({ name: 'John Doe', password: 'password123' });
    let err;
    try {
      await userWithoutEmail.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.email).toBeDefined();
  });
});
