import Route from '@ioc:Adonis/Core/Route'

Route.group(function () {
  Route.post('/register', 'AuthController.register')
})
  .prefix('/api/v1/auth')
  .namespace('App/Controllers/Http/V1/User/Auth')
