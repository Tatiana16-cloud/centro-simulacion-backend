const Router = require('express').Router
const ReservationsController = require('../controllers/reservations.controller')

class ReservationsRouter{
    reservationsRouter;
    reservationsController = new ReservationsController()

    constructor(){
        this.reservationsRouter = Router();
    }

    routes(){
        this.reservationsRouter.get('/', async(req,res)=>{
            const {result, error} = await this.reservationsController.getAll();
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });

        this.reservationsRouter.get('/:reservationsId', async(req,res)=>{
            const {reservationsId} = req.params
            const {result, error} = await this.reservationsController.getById(reservationsId);
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });

        this.reservationsRouter.post('/', async(req,res)=>{
            const new_reservations = req.body;
            const {result, error} = await this.reservationsController.create(new_reservations);
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });

        this.reservationsRouter.put('/:reservationsId', async(req,res)=>{
            const {reservationsId} = req.params
            const updatedReservations = req.body
            const {result, error} = await this.reservationsController.update(reservationsId, updatedReservations);
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });

        this.reservationsRouter.delete('/:reservationsId', async(req,res)=>{
            const {reservationsId} = req.params
            const {result, error} = await this.reservationsController.delete(reservationsId);
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });

        return this.reservationsRouter;
    }
}

module.exports = ReservationsRouter;