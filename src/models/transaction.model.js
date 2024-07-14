'use strict';

import { Schema, model } from 'mongoose';

const transactionSchema = Schema({
  finalOffer: {
    type: Schema.Types.ObjectId,
    ref: 'FinalOffer',
    required: true,
  },
  paymentMethod: {
    type: String,
    upperCase: true,
    enum: ['VISA', 'MASTERCARD', 'AMERICAN EXPRESS', 'EFECTIVO'],
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
  statusProfesional: {
    type: Boolean,
    default: false,
    required: true,
  },
  statusCliente: {
    type: Boolean,
    default: false,
    required: true,
  },
});

export default model('Transaction', transactionSchema);
