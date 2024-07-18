'use strict';

import Profession from '../models/profession.model.js';

export const newProffession = async (req, res) => {
  try {
    let data = req.body;
    let profession = new Profession(data);
    await profession.save();
    return res
      .status(200)
      .send({ message: 'Se agregó la profesión con exito.' });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error al agregar la nueva profesión' });
  }
};

export const professionDefault = async (name, description, image) => {
  try {
    let data = {
      name: name,
      description: description,
      image: image,
    };
    let foundedProfession = await Profession.findOne({ name: data.name });
    if (!foundedProfession) {
      let profession = new Profession(data);
      await profession.save();
      console.log('Profesión default creada con exito');
    } else {
      console.log('Profesión default creada anteriormente');
    }
  } catch (err) {
    console.error(err);
    return console.log('Error al ingresar la profesión por default');
  }
};

export const getProfessions = async (req, res) => {
  try {
    let foundedProfessions = await Profession.find({ status: true });
    return res.status(200).send({ foundedProfessions });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error al obtener todas las profesiones' });
  }
};

export const getIdProf = async (name) => {
  try {
    let foundedProffession = await Profession.findOne({
      name: name,
      status: true,
    });
    if (!foundedProffession)
      return console.log(
        'No se ha encontrado la profesión, no se ha podido obtener el id',
      );
    return foundedProffession;
  } catch (err) {
    console.error(err);
    return console.log('Error al obtener el id de la profesión');
  }
};

export const getProfById = async (req, res) => {
  try {
    let { idProf } = req.params;
    let foundedProf = await Profession.findOne({ _id: idProf, status: true });
    if (!foundedProf)
      return res
        .status(404)
        .send({ message: 'No se encontro ninguna profesion' });
    return res.status(200).send({ foundedProf });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error al obtener la profesion por el id' });
  }
};

export const updateProf = async (req, res) => {
  try {
    let { idProf } = req.params;
    let data = req.body;
    let updatedProf = await Profession.findOneAndUpdate({ _id: idProf }, data, {
      new: true,
    });
    if (!updatedProf)
      return res
        .status(404)
        .send({ message: 'Profesion no encontrada, no ha sido actualizada' });
    return res
      .status(200)
      .send({ message: 'Profesion actualizada correctamente' });
  } catch (err) {
    return res
      .status(500)
      .send({ message: 'Error al actualizar la profesion' });
  }
};

export const deleteProf = async (req, res) => {
  try {
    let { idProf } = req.params;
    let data = {
      status: false,
    };
    let updatedProf = await Profession.findOneAndUpdate(
      { _id: idProf, status: true },
      data,
      { new: true },
    );
    if (!updatedProf)
      return res
        .status(404)
        .send({ message: 'Profesion no encontrada, no ha sido eliminada' });
    return res
      .status(200)
      .send({ message: 'Profesion eliminada correctamente' });
  } catch (err) {
    return res.status(500).send({ message: 'Error al eliminar la profesion' });
  }
};
