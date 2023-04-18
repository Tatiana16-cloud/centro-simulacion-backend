const Router = require('express').Router
const UserController = require('../controllers/users.controller')

class UsuarioRouter{
    userRouter;
    userController = new UserController()

    constructor(){
        this.userRouter = Router();
    }

    routes(){
        this.userRouter.get('/', async(req,res)=>{
            const {result, error} = await this.userController.getAll();
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });

        this.userRouter.get('/:userId', async(req,res)=>{
            const {userId} = req.params
            const {result, error} = await this.userController.getById(userId);
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });

        this.userRouter.post('/', async(req,res)=>{
            const new_user = req.body;
            const {result, error} = await this.userController.create(new_user);
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });

        this.userRouter.put('/:userId', async(req,res)=>{
            const {userId} = req.params
            const updatedUser = req.body
            const {result, error} = await this.userController.update(userId, updatedUser);
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });

        this.userRouter.delete('/:userId', async(req,res)=>{
            const {userId} = req.params
            const {result, error} = await this.userController.delete(userId);
            if(error) return res.status(500).send(error);
            return res.status(200).send(result);
        });
        return this.userRouter;
    }
}

module.exports = UsuarioRouter;