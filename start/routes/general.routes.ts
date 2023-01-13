import Route from '@ioc:Adonis/Core/Route'

Route.group(function () {
  Route.resource('/lgas', 'LgasController')
  Route.resource('/skills', 'SkillsController')
  Route.resource('/education-levels', 'EducationLevelsController')
})
  .prefix('/api/v1/general')
  .namespace('App/Controllers/Http/V1/General')
