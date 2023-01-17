import MediaUploadInterface from 'App/TypeChecking/MediaUpload/MediaUploadInterface'
import UploadPayloadInterface from 'App/TypeChecking/MediaUpload/UploadPayloadInterface'
import Env from '@ioc:Adonis/Core/Env'
import FileUploadClient from 'App/InfrastructureProvider/Internal/FileUploadClient'

export default class FileSystemMediaUploadDriver implements MediaUploadInterface {
  private _processUploadToDisk = async (
    uploadPayloadOptions: UploadPayloadInterface
  ): Promise<string> => {
    return await FileUploadClient.uploadToDisk(uploadPayloadOptions)
  }
  private _processUploadToCloud = async (uploadPayloadOptions: UploadPayloadInterface) => {
    return 'Error'
  }
  private _processUploadToDiskOrCloud = async (uploadPayloadOptions: UploadPayloadInterface) => {
    const defaultUploadDestination = Env.get('DEFAULT_UPLOAD_DESTINATION')

    if (defaultUploadDestination === 'disk') {
      return this._processUploadToDisk(uploadPayloadOptions)
    } else {
      return this._processUploadToCloud(uploadPayloadOptions)
    }
  }

  public uploadToDisk: Function = this._processUploadToDisk

  public uploadToCloud: Function = this._processUploadToCloud

  public upload: Function = this._processUploadToDiskOrCloud

  public currentProvider: string
}
