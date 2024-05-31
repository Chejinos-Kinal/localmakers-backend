'use strict';

import { Schema, model } from 'mongoose';

const finalOfferSchema = Schema({
  workOffer: {
    type: Schema.Types.ObjectId,
    ref: 'WorkOffer',
    required: true,
  },
  workDate: {
    type: Date,
    required: true,
  },
  workSite: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
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
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
});

export default model('FinalOffer', finalOfferSchema);
