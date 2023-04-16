const Router = require('express').Router
const UserController = require('../controllers/users.controller')

class UsuarioRouter{
    userRouter;
    userController = new UserController()

    constructor(){
        this.userRouter = Router();
    }


    routes(){
        this.userRouter.get('/', (req,res)=>{
            this.userController.getAll(req,res);
        });

        this.userRouter.get('/:userId', (req,res)=>{
            this.userController.getById(req,res);
        });

        this.userRouter.post('/', (req,res)=>{
            this.userController.create(req,res);
        });

        this.userRouter.put('/:userId', (req,res)=>{
            this.userController.update(req,res);
        });

        this.userRouter.delete('/:userId', (req,res)=>{
            this.userController.delete(req,res);
        });
        return this.userRouter;
    }
}

module.exports = UsuarioRouter;