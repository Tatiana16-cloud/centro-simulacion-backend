const Router = require('express').Router
const DeviceRouter = require('./device.routes');
const UsuarioRouter = require('./user.routes');
const SupportRouter = require('./support.routes');
const SupplierRouter = require('./supplier.routes')
const LabsRouter = require('./labs.routes')
const PlacesRouter = require('./places.routes')
const ReservationsRouter = require('./reservation.routes')


class MainRouter{
    routes = Router();

    //const instanceExampleRouter = new exampleRouter()
    instanceDeviceRouter = new DeviceRouter()
    instanceUsuarioRouter = new UsuarioRouter()
    instanceSupportRouter = new SupportRouter()
    instanceSupplierRouter = new SupplierRouter()
    instanceLabsRouter = new LabsRouter()
    instancePlacesRouter = new PlacesRouter()
    instanceReservationsRouter = new ReservationsRouter()

    constructor(){

    }

    setRouters(){
        //routes.use('/example', instanceExampleRouter.routes())
        this.routes.use('/devices', this.instanceDeviceRouter.routes());
        this.routes.use('/users', this.instanceUsuarioRouter.routes());
        this.routes.use('/supports', this.instanceSupportRouter.routes());
        this.routes.use('/suppliers', this.instanceSupplierRouter.routes());
        this.routes.use('/labs', this.instanceLabsRouter.routes());
        this.routes.use('/places', this.instancePlacesRouter.routes());
        this.routes.use('/reservations', this.instanceReservationsRouter.routes());
    }
}


module.exports = MainRouter;