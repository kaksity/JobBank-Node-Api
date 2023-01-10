import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database"

/**
 * Shape of Identification data for a service class
 */
type UpdateRecordPayloadOptions = {
    /**
     * Identification options
     */
    identifierType: 'id' | 'identifier' | string
    /**
     * Entity Identifier Options
     */
    entityId: string | number
    /**
     * Data that is to be updated
     */
    modifiedData: Record<string, string | number | boolean | undefined>
    /**
     * Adonis Transaction Client
     */
    transaction: TransactionClientContract | undefined
}
export default UpdateRecordPayloadOptions
