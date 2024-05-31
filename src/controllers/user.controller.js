'use strict';

import User from '../models/user.model.js';

//TODO: agregar la creación de la cuenta y ligarla al usuario

export const newAdmin = async (req, res) => {
  try {
    let data = req.body;
    data.role = 'ADMIN';
    let admin = new User(data);
    await admin.save();
    return res
      .status(200)
      .send({ message: 'Administrador agregado con exito' });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error al agregar el nuevo administrador' });
  }
};

export const newUser = async (req, res) => {
  try {
    let data = req.body;
    data.role = 'CLIENT';
    let user = new User(data);
    await user.save();
    return res.status(200).send({ message: 'Usuario registrado con exito' });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error al agregar el nuevo usuario' });
  }
};

export const newProfessional = async (req, res) => {
  try {
    let data = req.body;
    data.role = 'PROFESSIONAL';
    let user = new User(data);
    await user.save();
    return res
      .status(200)
      .send({ message: 'Profesional agregado exitosamente' });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Error al agregar su cuenta' });
  }
};

export const userDefault = async (
  name,
  surname,
  email,
  username,
  password,
  phone,
  locality,
  profession,
) => {
  try {
    let data = {
      name: name,
      surname: surname,
      email: email,
      username: username,
      password: password,
      phone: phone,
      locality: locality,
      profession: profession,
    };
    let user = new User(data);
    await user.save();
    return res.status(200).send({ message: 'Usuario registrado con exito' });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error al agregar el usuario default' });
  }
};
