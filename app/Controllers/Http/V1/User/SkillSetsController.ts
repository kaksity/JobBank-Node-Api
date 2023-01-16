import { inject } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import NotFoundException from 'App/Exceptions/NotFoundException'
import UnAuthorizedException from 'App/Exceptions/UnAuthorizedException'
import {
  NULL_OBJECT,
  SKILL_DOES_NOT_EXIST,
} from 'App/Helpers/GeneralPurpose/CustomMessages/GenericMessages'
import {
  SKILL_SET_CANNOT_BE_DELETED,
  SKILL_SET_CREATED_SUCCESSFULLY,
  SKILL_SET_DELETED_SUCCESSFULLY,
  SKILL_SET_DOES_NOT_EXIST,
  SKILL_SET_FETCHED_SUCCESSFULLY,
} from 'App/Helpers/GeneralPurpose/CustomMessages/SkillSetMessages'
import SkillSetResource from 'App/Resources/V1/User/SkillSetResource'
import SkillSetService from 'App/Services/SkillSetService'
import DeleteRecordPayloadOptions from 'App/TypeChecking/GeneralPurpose/DeleteRecordPayloadOptions'
import CreateSkillSetValidator from 'App/Validators/V1/User/SkillSet/CreateSkillSetValidator'
import SkillService from 'App/Services/SkillService'
import SkillSetObjectInterface from 'App/TypeChecking/ModelManagement/SkillSetObjectInterface'
import Database from '@ioc:Adonis/Lucid/Database'

@inject()
export default class SkillSetsController {
  constructor(private skillSetService: SkillSetService, private skillService: SkillService) {}
  public async index({ response, auth }: HttpContextContract) {
    const user = auth.user!

    const skillSets = await this.skillSetService.getSkillSetByUserId(user.id)

    const skillSetResponsePayload = SkillSetResource.collection(skillSets)

    return response.json({
      success: true,
      message: SKILL_SET_FETCHED_SUCCESSFULLY,
      status_code: 200,
      result: skillSetResponsePayload,
    })
  }
  public async store({ request, response, auth }: HttpContextContract) {
    await request.validate(CreateSkillSetValidator)

    const { skill_identifier: skillId } = request.body()

    const skill = await this.skillService.getSkillByIdentifier(skillId)

    if (skill === NULL_OBJECT) {
      throw new NotFoundException(SKILL_DOES_NOT_EXIST)
    }
    const user = auth.user!

    const createSkillSetOptions: Partial<SkillSetObjectInterface> = {
      userId: user.id,
      skillId: skill.id,
    }
    await Database.transaction(async (dbTransaction) => {
      createSkillSetOptions.transaction = dbTransaction
      await this.skillSetService.createSkillSetRecord(createSkillSetOptions)
    })

    return response.created({
      success: true,
      message: SKILL_SET_CREATED_SUCCESSFULLY,
      status_code: 200,
      result: {},
    })
  }
  public async destroy({ response, auth, params }: HttpContextContract) {
    const user = auth.user!

    const skillSet = await this.skillSetService.getSkillSetByIdentifier(params.id)

    if (skillSet === NULL_OBJECT) {
      throw new NotFoundException(SKILL_SET_DOES_NOT_EXIST)
    }

    if (skillSet.userId !== user.id) {
      throw new UnAuthorizedException(SKILL_SET_CANNOT_BE_DELETED)
    }

    const deleteSkillSetPayloadOptions: DeleteRecordPayloadOptions = {
      identifierType: 'identifier',
      entityId: params.id,
      transaction: undefined,
    }

    await this.skillSetService.deleteSkillSetRecord(deleteSkillSetPayloadOptions)

    return response.json({
      success: true,
      message: SKILL_SET_DELETED_SUCCESSFULLY,
      status_code: 200,
      result: {},
    })
  }
}
