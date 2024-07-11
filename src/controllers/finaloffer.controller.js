'use strict';

import nodemailer from 'nodemailer';
import finalofferModel from '../models/finaloffer.model.js';
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

export const newFinalOffer = async (req, res) => {
  try {
    let { user, professional, workOffer } = req.params;
    let data = req.body;
    data.user = user;
    const userEcontrado = await userModel.findOne({ _id: user });
    console.log(userEcontrado);
    data.professional = professional;
    data.workOffer = workOffer;
    let finalloffer = new finalofferModel(data);
    await finalloffer.save();

    const mailOptions = {
      from: 'localmakergrupo3@gmail.com',
      to: userEcontrado.email,
      subject: 'Nueva Oferta Final',
      text: `Se ha agregado una nueva oferta final:
      Fecha de Trabajo: ${data.workDate}
      Precio: Q.${data.price}
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
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: 'Error al agregar la oferta final' });
  }
};

export const getFinalOffer = async (req, res) => {
  try {
    let userIdL = req.user._id;
    let foundFinalOffer = await finalofferModel
      .find({
        user: userIdL,
      })
      .populate('professional')
      .populate('workOffer');
    return res.status(200).send({ foundFinalOffer });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'No se encontró la oferta final' });
  }
};

export const deleteOffer = async (req, res) => {
  try {
    let { id } = req.params;
    let data = {
      status: false,
    };
    let deleteFinalOffer = await finalofferModel.findOneAndUpdate(
      { _id: id },
      data,
      { new: true },
    );
    return res.status(200).send({ deleteFinalOffer });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: 'Error al eliminar la oferta final' });
  }
};
