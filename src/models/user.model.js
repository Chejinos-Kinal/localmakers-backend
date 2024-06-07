'use strict';

import { Schema, model } from 'mongoose';

const userSchema = Schema({
  profilePicture: {
    type: String,
    required: true,
  },
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
  role: {
    type: String,
    uppercase: true,
    enum: ['CLIENT', 'ADMIN', 'PROFESSIONAL'],
    default: 'CLIENT',
    required: true,
  },
  tp_status: {
    type: String,
    uppercase: true,
    enum: ['ACTIVE', 'DELETED'],
    required: false,
    default: 'ACTIVE',
  },
});

export default model('User', userSchema);
