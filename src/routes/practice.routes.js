const Router = require('express').Router
const PracticesController = require('../controllers/practices.controller')

class PracticesRouter{
    practicesRouter;
    practicesController = new PracticesController()

    constructor(){
        this.practicesRouter = Router();
    }

    routes(){
        this.practicesRouter.get('/', async(req,res)=>{
            const {result, error} = await this.practicesController.getAll();
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });

        this.practicesRouter.get('/:practicesId', async(req,res)=>{
            const {practicesId} = req.params
            const {result, error} = await this.practicesController.getById(practicesId);
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });

        this.practicesRouter.post('/', async(req,res)=>{
            const new_practices = req.body;
            const {result, error} = await this.practicesController.create(new_practices);
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });

        this.practicesRouter.put('/:practicesId', async(req,res)=>{
            const {practicesId} = req.params
            const updatedPractices = req.body
            const {result, error} = await this.practicesController.update(practicesId, updatedPractices);
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });

        this.practicesRouter.delete('/:practicesId', async(req,res)=>{
            const {practicesId} = req.params
            const {result, error} = await this.practicesController.delete(practicesId);
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });

        return this.practicesRouter;
    }
}

module.exports = PracticesRouter;