import Route from '@ioc:Adonis/Core/Route';
Route.group(function() {
    Route.resource('/profiles', 'ProfilesController')
}).middleware(['auth']).prefix('/api/v1/users').namespace('App/Controllers/Http/V1/User')
