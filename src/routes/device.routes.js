const Router = require('express').Router
const DeviceController = require ('../controllers/devices.controller');
const multer  = require('multer');
const storage = require('../storage');
class DeviceRouter{
    deviceRouter;
    deviceController = new DeviceController();
    upload = multer({ storage: storage }).single('image');

    constructor(){
        this.deviceRouter = Router();
    }

    routes(){
        this.deviceRouter.get('/', async(req,res)=>{
            const {result, error} = await this.deviceController.getAll({
                pageSize: req.query.pageSize, 
                pageNumber: req.query.pageNumber
            });
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });

        this.deviceRouter.get('/:deviceId', async(req,res)=>{
            const {deviceId} = req.params
            const {result, error} = await this.deviceController.getById(deviceId);
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });

        this.deviceRouter.post('/', async(req,res)=>{
            const new_device = req.body;
            const {result, error} = await this.deviceController.create(new_device);
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });

        this.deviceRouter.post('/uploadImage', this.upload, async(req,res)=>{
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }
            res.status(200).json({ imageUrl: `${req.file.path}` });
        });

        this.deviceRouter.put('/:deviceId', async(req,res)=>{
            const {deviceId} = req.params
            const updateddevice = req.body
            const {result, error} = await this.deviceController.update(deviceId, updateddevice);
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });

        this.deviceRouter.delete('/:deviceId', async(req,res)=>{
            const {deviceId} = req.params
            const {result, error} = await this.deviceController.delete(deviceId);
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });

        this.deviceRouter.get('/loadDB/all', async(req,res)=>{
            const {result, error} = await this.deviceController.loadDatabase();
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });
        return this.deviceRouter;
    }
}

module.exports = DeviceRouter;