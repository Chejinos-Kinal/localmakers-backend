'use strict';

import finalofferModel from '../models/finaloffer.model.js';

export const newFinalOffer = async (req, res) => {
  try {
    let { user, professional, workOffer } = req.params;
    let data = req.body;
    data.user = user;
    data.professional = professional;
    data.workOffer = workOffer;
    let finalloffer = new finalofferModel(data);
    await finalloffer.save();
    return res.status(200).send({ message: 'Se agrego el final offer' });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: 'Error al agregar la oferta final' });
  }
};

export const getFinalOffer = async (req, res) => {
  try {
    let { userProfessional } = req.params;
    let foundFinalOffer = await finalofferModel.find({
      userProfessional: userProfessional,
    });
    return res.status(200).send({ foundFinalOffer });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'no se encontro' });
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
    return res.status(500).send({ message: 'Error al eliminar' });
  }
};
