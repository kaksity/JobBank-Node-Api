import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new AlreadyExistException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class AlreadyExistException extends Exception {
  constructor(message: string) {
    super(message, 400)
  }
  public async handle(error: this, { response }: HttpContextContract) {
    return response.notFound({
      success: false,
      type: 'https://tools.ietf.org/html/rfc7231#section-6.5.4',
      title: 'The specified resource already exist',
      detail: error.message,
    })
  }
}
