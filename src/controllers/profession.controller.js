'use strict'

import Profession from '../models/profession.model.js'

export const newProffession = async(req, res) => {
    try{
        let data = req.body
        let profession = new Profession(data)
        await profession.save()
        return res.status(200).send({message: 'Se agregó la profesión con exito.'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error al agregar la nueva profesión'})
    }
}

export const professionDefault = async(name, description, image) => {
    try{
        let data = {
            name: name,
            description: description,
            image: image
        }
        let foundedProfession = await Profession.findOne({name: data.name})
        if(!foundedProfession){
            let profession = new Profession(data)
            await profession.save()
            console.log('Profesión default creada con exito')
        }else{
            console.log('Profesión default creada anteriormente')
        }
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error al ingresar la profesión por default'})
    }
}