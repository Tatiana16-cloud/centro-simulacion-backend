const Router = require('express').Router
const { response } = require('express');
const DeviceController = require ('../controllers/devices.controller')

class DeviceRouter{
    deviceRouter;
    deviceController = new DeviceController();

    constructor(){
        this.deviceRouter = Router();
    }

    routes(){
        this.deviceRouter.get('/', (req,res)=>{
            this.deviceController.getAll(req,res);
            
        });

        this.deviceRouter.get('/:deviceId', (req,res)=>{
            this.deviceController.getById(req,res);
        });

        this.deviceRouter.post('/', (req,res)=>{
            this.deviceController.create(req,res);
        });

        this.deviceRouter.put('/:deviceId', (req,res)=>{
            this.deviceController.update(req,res);
        });

        this.deviceRouter.delete('/:deviceId', (req,res)=>{
            this.deviceController.delete(req,res);
        });
        return this.deviceRouter;
    }
}

module.exports = DeviceRouter;