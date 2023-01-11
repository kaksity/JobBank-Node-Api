import { TransactionClientContract } from '@ioc:Adonis/Lucid/Database'
interface SkillSetObjectInterface {
  id: number

  identifier: number

  userId: number

  skillId: number

  transaction: TransactionClientContract | undefined
}
export default SkillSetObjectInterface
