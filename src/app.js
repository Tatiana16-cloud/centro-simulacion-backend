const express = require('express');
const MainRouter = require('./routes/index')

class MainApp{
    
    app = express();
    port = 3000;

    constructor(port){
        this.port = port
        this.app.set('port',this.port);
        console.log(`API port: ${port}`)
    }

    /**
     * Set the router for express API
     */
    setRouter(){
        const instanceRouter = new MainRouter();
        instanceRouter.setRouters();
        this.app.use('/api',instanceRouter.routes);
    }

    /**
     * Set middlewares for express API
     */
    setMiddlewares(){
        this.app.use(express.urlencoded({ extended: false })); // Allow to receive messages with form format
        this.app.use(express.json()); // Allow to receive messages with json format
    }

    run(){
        this.app.listen(
            this.port, 
            ()=>{
                console.log(`App is running on port: ${this.port}`);
            }
        )
    }

    move(){
        console.log("Moviendose")
    }
}

module.exports = MainApp;
