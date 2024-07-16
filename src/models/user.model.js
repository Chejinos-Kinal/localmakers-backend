'use strict';

import { Schema, model } from 'mongoose';

const userSchema = Schema({
  profilePicture: {
    type: String,
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
  description: {
    type: String,
    required: false,
  },
  tp_status: {
    type: String,
    uppercase: true,
    enum: ['ACTIVE', 'DELETED'],
    required: false,
    default: 'ACTIVE',
  },
  /*  emailVerified: { type: Boolean, default: false }, */
});

export default model('User', userSchema);
