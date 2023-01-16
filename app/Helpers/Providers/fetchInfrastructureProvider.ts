import InfrastructureProviderGeneratorOptionType from 'App/TypeChecking/GeneralPurpose/InfrastructureProviderGeneratorOptionType'
import isServiceProviderValid from 'App/Helpers/Providers/isServiceProviderValid'

/**
 * @description
 * @author Dauda Pona
 * @param {InfrastructureProviderGeneratorOptionType} infrastructureProviderGeneratorOptions
 * @returns {*}  {(Record<string, string | boolean | any>)}
 */
function fetchInfrastructureProvider(
  infrastructureProviderGeneratorOptions: InfrastructureProviderGeneratorOptionType
): Record<string, string | boolean | any> {
  const { identifierProvider, fetchCurrentProvider } = infrastructureProviderGeneratorOptions

  const infrastructureProvider = fetchCurrentProvider(identifierProvider)
  const checkProviderOutcome = isServiceProviderValid(infrastructureProvider)

  return { infrastructureProvider, checkProviderOutcome }
}
export default fetchInfrastructureProvider
