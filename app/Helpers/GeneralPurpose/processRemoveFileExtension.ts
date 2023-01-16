/**
 * @description
 * @author Dauda Pona
 * @param {string} fileName
 * @returns {*}  {string}
 */
function processRemoveFileExtension(fileName: string): string {
  return fileName.substring(0, fileName.lastIndexOf('.')) || fileName
}
export default processRemoveFileExtension
