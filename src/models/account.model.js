'use strict';

import { Schema, model } from 'mongoose';

const accountSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  deuda: {
    type: Number,
    required: true,
  },
  credito: {
    type: Number,
    required: true,
  },
  estado: {
    type: Boolean,
    required: true,
  },
});

export default model('Account', accountSchema);
