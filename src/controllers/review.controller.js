'use strict';

import reviewModel from '../models/review.model.js';

export const newReview = async (req, res) => {
  try {
    let data = req.body;
    let { user, userProfessional } = req.params;
    data.user = user;
    data.userProfessional = userProfessional;
    let review = new reviewModel(data);
    await review.save();
    return res.status(200).send({ message: 'Se agrego el review ' });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Error al agregar el review' });
  }
};

export const getReview = async (req, res) => {
  try {
    let { userProfessional } = req.params;
    let foundReview = await reviewModel.find({
      userProfessional: userProfessional,
    });
    return res.status(200).send({ foundReview });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'No se pudo listar' });
  }
};
/* 
export const updateReview = async(req,res) =>{
    try {
        let {idReview} = req.params
        let 
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: 'Error al actualizar el review'})
        
    }
} */
