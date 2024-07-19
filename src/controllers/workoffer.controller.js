'use strict';

import nodemailer from 'nodemailer';
import WorkOffer from '../models/workoffer.model.js';
import userModel from '../models/user.model.js';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'localmakergrupo3@gmail.com',
    pass: 'wuhq sfjh xvmm kggh',
  },
});
export const createWorkOffer = async (req, res) => {
  try {
    let data = req.body;
    let { idProf } = req.params;
    let userIdL = req.user._id;
    data.user = userIdL;
    const userEcontrado = await userModel.findOne({ _id: idProf });
    data.professional = idProf;
    let workoffer = new WorkOffer(data);
    await workoffer.save();
    const mailOptions = {
      from: 'localmakergrupo3@gmail.com',
      to: userEcontrado.email,
      subject: 'Nueva Oferta De trabajo',
      text: `Se ha agregado una nueva oferta de trabajo:
      Titulo: ${data.title}
      Descripcion del problema: ${data.problemDescription}
      Sitio de Trabajo: ${data.workSite}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error al enviar el correo' });
      } else {
        console.log('Correo enviado: ' + info.response);
        return res
          .status(200)
          .send({ message: 'Se agregó la oferta final y se envió el correo' });
      }
    });
    return res.send({ message: 'Work offer created succesfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error creating work offer' });
  }
};

export const updateWorkOffer = async (req, res) => {
  try {
    let data = req.body;
    let { workOfferId } = req.params;
    if (data.user || data.professional || data.status)
      return res.status(401).send({ message: 'Some data cannot be updated' });
    let updateWorkOffer = await WorkOffer.findOneAndUpdate(
      { _id: workOfferId },
      data,
      { new: true },
    );
    if (!updateWorkOffer)
      return res.status(404).send({ message: 'Work offer not found' });
    return res.send({
      message: 'Work offer udpated succesfully',
      updateWorkOffer,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error updating work offer' });
  }
};

export const deleteWorkOffer = async (req, res) => {
  try {
    let { workOfferId } = req.params;
    let deletedWorkOffer = await WorkOffer.findOneAndDelete({
      _id: workOfferId,
    });
    if (!deletedWorkOffer)
      return res.status(404).send({ message: 'Work offer not found' });
    return res.send({
      message: 'Work offer deleted succesfully',
      deleteWorkOffer,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error deleting work offer' });
  }
};

export const getWorkOffers = async (req, res) => {
  try {
    let workoffers = await WorkOffer.find();
    return res.send({ message: 'Work offers finded', workoffers });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error getting work offers' });
  }
};

export const getWorkOffer = async (req, res) => {
  try {
    let workOfferId = req.params.id;
    let workoffer = await WorkOffer.findOne({
      _id: workOfferId,
      status: true,
    }).populate('professional');
    if (!workoffer)
      return res.status(404).send({ message: 'Work offer not find' });
    return res.send({ message: 'Work offer finded', workoffer });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error getting work offer' });
  }
};

export const getWorkOffersByTitle = async (req, res) => {
  try {
    let { title } = req.body;
    let workoffers = await WorkOffer.find({ title: title });
    if (workoffers.length == 0)
      return res.status(404).send({ message: 'Work offers not find' });
    return res.send({ message: 'Work offers finded', workoffers });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error getting work offers' });
  }
};

export const getWorkOffersByLoggedUser = async (req, res) => {
  try {
    let userIdL = req.user._id;
    let workoffers = await WorkOffer.find({
      professional: userIdL,
      status: true,
    })
      .populate('user')
      .populate('professional');
    return res.send({ message: 'Work offers found', workoffers });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error getting work offers' });
  }
};

export const getWorkOffersByUser = async (req, res) => {
  try {
    let userId = req.params.id;
    let workoffers = await WorkOffer.find({ user: userId, status: true });
    return res.send({ message: 'Work offers finded', workoffers });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error getting work offers' });
  }
};
