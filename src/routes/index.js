const Router = require('express').Router
const DeviceRouter = require('./device.routes');
const UsuarioRouter = require('./user.routes');
const SupportRouter = require('./support.routes');

class MainRouter{
    routes = Router();

    //const instanceExampleRouter = new exampleRouter()
    instanceDeviceRouter = new DeviceRouter()
    instanceUsuarioRouter = new UsuarioRouter()
    instanceSpportRouter = new SupportRouter()

    constructor(){

    }

    setRouters(){
        //routes.use('/example', instanceExampleRouter.routes())
        this.routes.use('/equipos', this.instanceDeviceRouter.routes());
        this.routes.use('/usuarios', this.instanceUsuarioRouter.routes());
        this.routes.use('/supports', this.instanceSpportRouter.routes());
    }
}



module.exports = MainRouter;