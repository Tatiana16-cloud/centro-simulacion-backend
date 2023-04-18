const Router = require('express').Router
const SupplierController = require('../controllers/suppliers.controller')

class SupplierRouter{
    supplierRouter;
    supplierController = new SupplierController()

    constructor(){
        this.supplierRouter = Router();
    }

    routes(){
        this.supplierRouter.get('/', async(req,res)=>{
            const {result, error} = await this.supplierController.getAll();
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });

        this.supplierRouter.get('/:supplierId', async(req,res)=>{
            const {supplierId} = req.params
            const {result, error} = await this.supplierController.getById(supplierId);
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });

        this.supplierRouter.post('/', async(req,res)=>{
            const new_supplier = req.body;
            const {result, error} = await this.supplierController.create(new_supplier);
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });

        this.supplierRouter.put('/:supplierId', async(req,res)=>{
            const {supplierId} = req.params
            const updatedSupplier = req.body
            const {result, error} = await this.supplierController.update(supplierId, updatedSupplier);
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });

        this.supplierRouter.delete('/:supplierId', async(req,res)=>{
            const {supplierId} = req.params
            const {result, error} = await this.supplierController.delete(supplierId);
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });
        return this.supplierRouter;
    }
}

module.exports = SupplierRouter;