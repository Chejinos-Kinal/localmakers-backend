'use strict';

import { Schema, model } from 'mongoose';

const workOfferSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  problemDescription: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  professional: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  workSite: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
});

export default model('WorkOffer', workOfferSchema);
