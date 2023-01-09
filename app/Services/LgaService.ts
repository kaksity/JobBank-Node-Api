import Lga from 'App/Models/Lga';
export default class LgaService {
    public async getLgaById(id: number): Promise<Lga | null> {
        return Lga.query().where('is_deleted', false).where('id', id).first()
    }
    public async getLgaByIdentifier(identifier: string): Promise<Lga | null> {
        return Lga.query().where('is_deleted', false).where('id', identifier).first()
    }
    public async getLgas(): Promise<Lga[]> {
        return Lga.query().where('is_deleted', false)
    }
}
