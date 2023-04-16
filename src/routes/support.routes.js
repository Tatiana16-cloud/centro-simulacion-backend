const Router = require('express').Router
const SupportController = require('../controllers/supports.controller')

class SupportRouter{
    supportRouter;
    supportController = new SupportController()

    constructor(){
        this.supportRouter = Router();
    }
    
    routes(){
        this.supportRouter.get('/', (req,res)=>{
            this.supportController.getAll(req,res);
        });

        this.supportRouter.get('/:supportId', (req,res)=>{
            this.supportController.getById(req,res);
        });

        this.supportRouter.post('/', (req,res)=>{
            this.supportController.create(req,res);
        });

        this.supportRouter.put('/:supportId', (req,res)=>{
            this.supportController.update(req,res);
        });

        this.supportRouter.delete('/:supportId', (req,res)=>{
            this.supportController.delete(req,res);
        });
        return this.supportRouter;
    }
}

module.exports = SupportRouter;