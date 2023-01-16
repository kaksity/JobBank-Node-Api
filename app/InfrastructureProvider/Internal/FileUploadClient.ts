import UploadPayloadInterface from 'App/TypeChecking/MediaUpload/UploadPayloadInterface'
import processChangeFileName from 'App/Helpers/GeneralPurpose/processChangeFileName'
import Env from '@ioc:Adonis/Core/Env'

import {
  NULL_OBJECT,
  FILE_DOES_NOT_EXIST,
} from 'App/Helpers/GeneralPurpose/CustomMessages/GenericMessages'

export default class FileUploadClient {
  /**
   * @description
   * @author Dauda Pona
   * @static
   * @param {UploadPayloadInterface} uploadPayloadOptions
   * @returns {*}  {Promise<string>}
   * @memberof FileUploadClient
   */
  public static async uploadToDisk(uploadPayloadOptions: UploadPayloadInterface): Promise<string> {
    const { uploadedFile, storageFolder } = uploadPayloadOptions

    if (uploadedFile === NULL_OBJECT) {
      return FILE_DOES_NOT_EXIST
    }

    const newFileName = processChangeFileName(uploadedFile)

    await uploadedFile.move(`${Env.get('DISK_FILE_UPLOAD_PATH')}/${storageFolder}`, {
      name: newFileName,
      overwrite: true,
    })

    return newFileName
  }
}
