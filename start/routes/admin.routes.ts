import Route from '@ioc:Adonis/Core/Route'

Route.group(function() {
  Route.group(function () {
    Route.post('/register', 'AuthController.register')
    Route.post('/login', 'AuthController.login')
  })
    .prefix('/auth')
    .namespace('App/Controllers/Http/V1/User/Auth')
}).prefix('/api/v1/admin')
