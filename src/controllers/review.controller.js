'use strict';

import reviewModel from '../models/review.model.js';

export const newReview = async (req, res) => {
  try {
    let data = req.body;
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
    let foundReviews = await reviewModel.find({
      userProfessional: userProfessional,
    });

    if (foundReviews.length === 0) {
      return res.status(404).send({ message: 'No se encontraron reseñas' });
    }
    let totalRating = foundReviews.reduce(
      (acc, review) => acc + review.rating,
      0,
    );
    let averageRating = Math.round(totalRating / foundReviews.length);
    let response = {
      averageRating,
      reviews: foundReviews.map((review) => ({
        description: review.description,
        rating: review.rating,
      })),
    };

    return res.status(200).send(response);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'No se pudo listar' });
  }
};

export const getReviewProfesionl = async (req, res) => {
  try {
    let userProfessional = req.user._id;
    console.log(userProfessional);
    let foundReviews = await reviewModel.find({
      userProfessional: userProfessional,
    });

    if (foundReviews.length === 0) {
      return res.status(404).send({ message: 'No se encontraron reseñas' });
    }
    let totalRating = foundReviews.reduce(
      (acc, review) => acc + review.rating,
      0,
    );
    let averageRating = Math.round(totalRating / foundReviews.length);
    let response = {
      averageRating,
      reviews: foundReviews.map((review) => ({
        description: review.description,
        rating: review.rating,
      })),
    };

    return res.status(200).send(response);
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
