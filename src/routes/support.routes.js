const Router = require('express').Router
const SupportController = require('../controllers/supports.controller')

class SupportRouter{
    supportRouter;
    supportController = new SupportController()

    constructor(){
        this.supportRouter = Router();
    }
    
    routes(){
        this.supportRouter.get('/', async(req,res)=>{
            const {result, error} = await this.supportController.getAll();
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });

        this.supportRouter.get('/:supportId', async(req,res)=>{
            const {supportId} = req.params
            const {result, error} = await this.supportController.getById(supportId);
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });

        this.supportRouter.post('/', async(req,res)=>{
            const new_support = req.body;
            const {result, error} = await this.supportController.create(new_support);
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });

        this.supportRouter.put('/:supportId', async(req,res)=>{
            const {supportId} = req.params
            const updatedsupport = req.body
            const {result, error} = await this.supportController.update(supportId, updatedsupport);
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });

        this.supportRouter.delete('/:supportId', async(req,res)=>{
            const {supportId} = req.params
            const {result, error} = await this.supportController.delete(supportId);
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });
        return this.supportRouter;
    }
}

module.exports = SupportRouter;