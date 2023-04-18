const App = require('./app')

//You should set the initial configuration to express app
const api = new App(3000);
api.setMiddlewares()
api.setRouter()
api.run();





