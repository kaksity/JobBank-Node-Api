import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database"

/**
 * Shape of Identification data for a service class
 */
type DeleteRecordPayloadOptions = {
    /**
     * Identification options
     */
    identifierType: 'id' | 'identifier' | string
    /**
     * Entity Identifier Options
     */
    entityId: string | number
    /**
     * Adonis Transaction Client
     */
    transaction: TransactionClientContract | undefined
}
export default DeleteRecordPayloadOptions
