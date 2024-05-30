'use strict';

import { Schema, model } from 'mongoose';

const userSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'Email already in use'],
  },
  username: {
    type: String,
    required: true,
    unique: [true, 'Username already in use'],
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  locality: {
    type: String,
    required: true,
  },
  profession: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Profession',
      required: false,
    },
  ],
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  role: {
    type: String,
    uppercase: true,
    enum: ['CLIENT', 'ADMIN'],
    default: 'CLIENT',
    required: true,
  },
});

export default model('User', userSchema);