'use strict';

import Transaction from '../models/transaction.model.js';
import FinalOffer from '../models/finaloffer.model.js';

export const newTransaction = async (req, res) => {
  try {
    let { finalOffer, paymentMethod } = req.params;
    let dataOff = {
      status: false,
    };
    let foundedFinalOff = await FinalOffer.findOneAndUpdate(
      { _id: finalOffer },
      dataOff,
      { new: true },
    );
    if (!foundedFinalOff)
      return res.status(500).send({
        message:
          'No se pudo localizar la oferta, no se pudo concretar la transacción',
      });
    let data = {
      finalOffer: finalOffer,
      workDate: foundedFinalOff.workDate,
      workSite: foundedFinalOff.workSite,
      total: foundedFinalOff.price,
      user: foundedFinalOff.user,
      professional: foundedFinalOff.professional,
      paymentMethod: paymentMethod,
    };
    let transaction = new Transaction(data);
    await transaction.save();
    return res.status(200).send({ message: 'Transacción realizada con exito' });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error al completar la transacción' });
  }
};

export const watchTransactions = async (req, res) => {
  try {
    let { id } = req.params;
    let foundedTrans = await Transaction.find({ user: id });
    if (!foundedTrans)
      return res
        .status(404)
        .send({ message: 'No se han encontrado compras anteriores' });
    return res.status(200).send({ foundedTrans });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error al obtener sus compras anteriores' });
  }
};
