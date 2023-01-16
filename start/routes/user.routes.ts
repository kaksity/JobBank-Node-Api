import Route from '@ioc:Adonis/Core/Route'
Route.group(function () {
  Route.resource('/profiles', 'ProfilesController')
  Route.resource('/work-experiences', 'WorkExperiencesController')
  Route.resource('/skill-sets', 'SkillSetsController')
  Route.resource('/educations', 'UserEducationsController')
  Route.resource('/qualification-documents', 'UserQualificationDocumentsController')
})
  .middleware(['auth'])
  .prefix('/api/v1/users')
  .namespace('App/Controllers/Http/V1/User')
