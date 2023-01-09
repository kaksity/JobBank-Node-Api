import { inject } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { RECORDS_FOUND } from 'App/Helpers/GeneralPurpose/GeneralMessages';
import LgaResource from 'App/Resources/V1/General/LgaResource';
import LgaService from 'App/Services/LgaService'

@inject()
export default class LgasController {

  constructor(private lgaService: LgaService) {
  }
  public async index({response}: HttpContextContract) {
    const lgas = await this.lgaService.getLgas()

    const lgasResponsePayload = LgaResource.collection(lgas)

    return response.json({
      success: true,
      status_code: 200,
      message: RECORDS_FOUND,
      result: lgasResponsePayload
    })
  }
}
