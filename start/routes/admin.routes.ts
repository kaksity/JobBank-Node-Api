import Route from '@ioc:Adonis/Core/Route'

Route.group(function () {
  Route.post('/register', 'AuthController.register')
  Route.post('/login', 'AuthController.login')
})
  .prefix('/api/v1/admin/auth')
  .namespace('App/Controllers/Http/V1/Admin/Auth')


Route.group(function () {
  Route.resource('/users', 'UsersController')
  Route.resource('/users/:userId/profiles', 'UserProfilesController')
  Route.resource('/users/:userId/work-experiences', 'UserWorkExperiencesController')
  Route.resource('/users/:userId/qualifications', 'UserQualificationDocumentsController')
  Route.resource('/users/:userId/skill-sets', 'UserSkillSetsController')
  Route.resource('/users/:userId/educations', 'UserEducationsController')
})
  .middleware(['auth'])
  .prefix('/api/v1/admin')
  .namespace('App/Controllers/Http/V1/Admin')
