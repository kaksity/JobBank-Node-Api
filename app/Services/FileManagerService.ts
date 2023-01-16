import { SERVICE_PROVIDER_DOES_NOT_EXIST } from 'App/Helpers/GeneralPurpose/CustomMessages/GenericMessages'
import fetchCurrentMediaUploadProvider from 'App/Helpers/Providers/fetchCurrentMediaUploadProvider'
import fetchInfrastructureProvider from 'App/Helpers/Providers/fetchInfrastructureProvider'
import InfrastructureProviderGeneratorOptionType from 'App/TypeChecking/GeneralPurpose/InfrastructureProviderGeneratorOptionType'
import MediaUploadInterface from 'App/TypeChecking/MediaUpload/MediaUploadInterface'
import Drive from '@ioc:Adonis/Core/Drive'
import Env from '@ioc:Adonis/Core/Env'

export default class FileManagerService {
  /**
   * @description
   * @author Dauda Pona
   * @param {*} file
   * @param {string} [storageFolder='']
   * @returns {*}  {Promise<string>}
   * @memberof FileManagerService
   */
  public async save(file: any, storageFolder: string = ''): Promise<string> {
    const infrastructureProviderGenerator: InfrastructureProviderGeneratorOptionType = {
      identifierProvider: '',
      fetchCurrentProvider: fetchCurrentMediaUploadProvider,
    }
    const { infrastructureProvider, checkProviderOutcome } = fetchInfrastructureProvider(
      infrastructureProviderGenerator
    )

    if (checkProviderOutcome === SERVICE_PROVIDER_DOES_NOT_EXIST) {
      return 'Error'
    }

    const mediaUploadInterface: MediaUploadInterface = infrastructureProvider

    const uploadPayload = {
      uploadedFile: file,
      storageFolder,
    }
    return await mediaUploadInterface.upload(uploadPayload)
  }

  /**
   * @description
   * @author Dauda Pona
   * @param {string} fileName
   * @param {string} [storageFolder='']
   * @returns {*}  {Promise<string>}
   * @memberof FileManagerService
   */
  public async get(fileName: string, storageFolder: string = ''): Promise<string> {
    const url = await Drive.getUrl(
      `${Env.get('DISK_FILE_UPLOAD_PATH')}/${storageFolder}/${fileName}`
    )
    return url
  }
}
