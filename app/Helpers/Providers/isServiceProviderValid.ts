import { SERVICE_PROVIDER_DOES_NOT_EXIST } from 'App/Helpers/GeneralPurpose/CustomMessages/GenericMessages'

function isServiceProviderValid(serviceProvider: any): string | boolean {
  const SERVICE_PROVIDER_IS_VALID = true

  if (serviceProvider === SERVICE_PROVIDER_DOES_NOT_EXIST) {
    return SERVICE_PROVIDER_DOES_NOT_EXIST
  }
  return SERVICE_PROVIDER_IS_VALID
}
export default isServiceProviderValid
