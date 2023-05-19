const Router = require('express').Router
const LabsController = require('../controllers/labs.controller')

class LabsRouter{
    labsRouter;
    labsController = new LabsController()

    constructor(){
        this.labsRouter = Router();
    }

    routes(){
        this.labsRouter.get('/', async(req,res)=>{
            const {result, error} = await this.labsController.getAll();
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });

        this.labsRouter.get('/:labsId', async(req,res)=>{
            const {labsId} = req.params
            const {result, error} = await this.labsController.getById(labsId);
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });

        this.labsRouter.post('/', async(req,res)=>{
            const new_labs = req.body;
            const {result, error} = await this.labsController.create(new_labs);
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });

        this.labsRouter.put('/:labsId', async(req,res)=>{
            const {labsId} = req.params
            const updatedLabs = req.body
            const {result, error} = await this.labsController.update(labsId, updatedLabs);
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });

        this.labsRouter.delete('/:labsId', async(req,res)=>{
            const {labsId} = req.params
            const {result, error} = await this.labsController.delete(labsId);
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });

        return this.labsRouter;
    }
}

module.exports = LabsRouter;