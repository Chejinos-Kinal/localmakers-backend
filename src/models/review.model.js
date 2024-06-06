'use strict';

import { Schema, model } from 'mongoose';

const reviewSchema = Schema({
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: false,
    default: Date.now(),
  },
  rating: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userProfessional: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default model('Review', reviewSchema);
