'use strict';

import { Schema, model } from 'mongoose';

const professionSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true
  }
});

export default model('Profession', professionSchema);
