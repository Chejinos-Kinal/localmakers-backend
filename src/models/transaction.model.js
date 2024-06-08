'use strict';

import { Schema, model } from 'mongoose';

const transactionSchema = Schema({
  finalOffer: {
    type: Schema.Types.ObjectId,
    ref: 'FinalOffer',
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
  total: {
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
  paymentMethod: {
    type: String,
    upperCase: true,
    enum: ['VISA', 'MASTERCARD', 'AMERICAN EXPRESS', 'CASH'],
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
});

export default model('Transaction', transactionSchema);
