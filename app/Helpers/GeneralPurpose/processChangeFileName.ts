import { string } from '@ioc:Adonis/Core/Helpers'
import processRemoveFileExtension from 'App/Helpers/GeneralPurpose/processRemoveFileExtension'

/**
 * @description
 * @author Dauda Pona
 * @param {*} file
 * @returns {*}  {string}
 */
function processChangeFileName(file: any): string {
  const timestamp = new Date().valueOf()
  const customFileName = processRemoveFileExtension(file.clientName)
  return `${timestamp}_${string.snakeCase(customFileName)}.${file.extname}`
}

export default processChangeFileName
