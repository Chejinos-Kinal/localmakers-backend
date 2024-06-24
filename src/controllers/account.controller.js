'use strict';
import Account from '../models/account.model.js';
import User from '../models/user.model.js';

export const autoAccount = async (userId) => {
  try {
    let foundedIdUser = await User.findOne({ id: userId });
    let idUser = foundedIdUser._id;
    let data = {
      user: idUser,
      deuda: 0.0,
      credito: 0.0,
      estado: true,
    };
    let account = new Account(data);
    await account.save();
    console.log('Se creó la cuenta del usuario');
    // No necesitas retornar console.log()
  } catch (err) {
    console.error(err);
    console.log('Error al agregar la cuenta del usuario'); // Mejor lanzar el error
  }
};

export const ingreso = async (req, res) => {
  // Añadir req, res para los controladores HTTP
  const { id, monto } = req.body; // Suponiendo que vienen del cuerpo de la solicitud
  try {
    let account1 = await Account.findOne({ _id: id });
    if (!account1) {
      return res.status(404).send({ message: 'La cuenta no existe' });
    }
    let montoTotal = account1.credito + monto;
    let data = {
      deuda: account1.deuda,
      credito: montoTotal,
      estado: true,
    };
    let account = await Account.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    return res.send({ message: 'Depósito hecho con éxito', account });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'No se pudo agregar la cantidad' });
  }
};

export const deactivateAccount = async (id) => {
  try {
    let account = await Account.findOne({ _id: id });
    let data = {
      deuda: account.deuda,
      credito: account.credito,
      estado: false,
    };
    let updateAccount = await Account.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    return res.send({ message: 'Cuenta desactivada con exito', updateAccount });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'No se pudo desactivar la cuenta' });
  }
};

export const AssignDebt = async (id, debt) => {
  try {
    let account = await Account.findOne({ _id: id });
    let data = {
      deuda: account.deuda + debt,
      credito: account.credito,
      estado: false,
    };
    let asignDebt = await Account.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    return console.log('Deuda agregada con exito', asignDebt);
  } catch (err) {
    console.error(err);
    return console.log('Error al asignar la Deuda');
  }
};

export const viewAll = async (req, res) => {
  try {
    let userIdL = req.user._id;
    let accounts = await Account.find({ user: userIdL });
    return res.send(accounts);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'No se listar todas las cuentas' });
  }
};
