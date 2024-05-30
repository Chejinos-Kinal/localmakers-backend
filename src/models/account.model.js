'use strict';

import { Schema, model } from 'mongoose';

const accountSchema = Schema({
  user: {
    type: String,
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
});

export default model('Account', accountSchema);
