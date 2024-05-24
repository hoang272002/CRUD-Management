const express = require('express');
const route = express.Router()
const services = require('../services/render')
const controller = require('../controller/controller')
/**
* @description login root
* @method GET/
 */
route.get('/login', services.loginRoute)
/**
* @description Root Route
* @method GET/
 */
route.get('/', services.homeRoutes )

/**
* @description add user
* @method GET/ add user
 */
route.get('/add_user',services.addUserRoutes )

/**
* @description update user
* @method GET/ update user
 */
route.get('/update_user', services.updateUserRoutes)

//API
route.post('/api/users', controller.create)
route.get('/api/users', controller.find)
route.put('/api/users/:id', controller.update)
route.delete('/api/users/:id', controller.delete)

route.post('/api/users/login', controller.login)

module.exports = route;