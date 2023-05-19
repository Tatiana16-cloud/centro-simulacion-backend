const Router = require('express').Router
const PlacesController = require('../controllers/places.controller')

class PlacesRouter{
    placesRouter;
    placesController = new PlacesController()

    constructor(){
        this.placesRouter = Router();
    }

    routes(){
        this.placesRouter.get('/', async(req,res)=>{
            const {result, error} = await this.placesController.getAll();
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });

        this.placesRouter.get('/:placesId', async(req,res)=>{
            const {placesId} = req.params
            const {result, error} = await this.placesController.getById(placesId);
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });

        this.placesRouter.post('/', async(req,res)=>{
            const new_places = req.body;
            const {result, error} = await this.placesController.create(new_places);
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });

        this.placesRouter.put('/:placesId', async(req,res)=>{
            const {placesId} = req.params
            const updatedPlaces = req.body
            const {result, error} = await this.placesController.update(placesId, updatedPlaces);
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });

        this.placesRouter.delete('/:placesId', async(req,res)=>{
            const {placesId} = req.params
            const {result, error} = await this.placesController.delete(placesId);
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });

        return this.placesRouter;
    }
}

module.exports = PlacesRouter;