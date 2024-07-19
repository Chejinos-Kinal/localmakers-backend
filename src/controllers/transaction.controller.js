'use strict';

import Transaction from '../models/transaction.model.js';
import FinalOffer from '../models/finaloffer.model.js';
import finalofferModel from '../models/finaloffer.model.js';
import userModel from '../models/user.model.js';
import transactionModel from '../models/transaction.model.js';

import accountModel from '../models/account.model.js';

export const newTransaction = async (req, res) => {
  try {
    let data = req.body;
    let transaction = new Transaction(data);
    await transaction.save();
    let updateFinalOffer = await finalofferModel.findOneAndUpdate(
      { _id: data.finalOffer },
      { status: false },
    );
    return res.status(200).send({ message: 'Transacción realizada con exito' });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error al completar la transacción' });
  }
};

export const watchTransactionsClient = async (req, res) => {
  try {
    const userIdL = req.user._id;
    const foundedTrans = await Transaction.find({
      user: userIdL,
      $or: [{ statusProfesional: false }, { statusCliente: false }],
    })
      .populate('finalOffer')
      .populate('professional');

    if (!foundedTrans || foundedTrans.length === 0) {
      return res
        .status(404)
        .send({ message: 'No se han encontrado compras anteriores' });
    }

    return res.status(200).send({ foundedTrans });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error al obtener sus compras anteriores' });
  }
};

export const watchTransactionsProfesional = async (req, res) => {
  try {
    const userIdL = req.user._id;

    const foundedTrans = await Transaction.find({
      professional: userIdL,
      $or: [{ statusProfesional: true }, { statusCliente: true }],
    })
      .populate('finalOffer')
      .populate('user');

    if (!foundedTrans || foundedTrans.length === 0) {
      return res
        .status(404)
        .send({ message: 'No se han encontrado compras anteriores' });
    }

    return res.status(200).send({ foundedTrans });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error al obtener sus compras anteriores' });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updateStatus = await transactionModel
      .findOneAndUpdate({ _id: id }, data, { new: true }) // Devuelve el documento actualizado
      .populate('finalOffer');

    if (!updateStatus) {
      return res.status(404).send({ message: 'Transacción no encontrada' });
    }

    if (
      updateStatus.statusProfesional === true &&
      updateStatus.statusCliente === true
    ) {
      const accountProfesional = await accountModel.findOne({
        user: updateStatus.professional,
      });
      const accountCliente = await accountModel.findOne({
        user: updateStatus.user,
      });

      if (!accountProfesional || !accountCliente) {
        return res
          .status(404)
          .send({ message: 'Cuenta profesional o cliente no encontrada' });
      }

      if (updateStatus.paymentMethod !== 'EFECTIVO') {
        const finalOfferPrice = updateStatus.finalOffer.price;
        const clienteCredito = accountCliente.credito;

        const updatedProfessional = await accountModel.findOneAndUpdate(
          { user: updateStatus.professional },
          { $inc: { credito: finalOfferPrice } },
          { new: true },
        );

        if (clienteCredito >= finalOfferPrice) {
          await accountModel.findOneAndUpdate(
            { user: updateStatus.user },
            { $inc: { credito: -finalOfferPrice } },
            { new: true },
          );
        } else {
          const remainingDebt = finalOfferPrice - clienteCredito;
          await accountModel.findOneAndUpdate(
            { user: updateStatus.user },
            { $set: { credito: 0 }, $inc: { deuda: remainingDebt } },
            { new: true },
          );
        }
      }
    }

    return res.status(200).send({ updateStatus });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: 'Error al actualizar estado', error });
  }
};
