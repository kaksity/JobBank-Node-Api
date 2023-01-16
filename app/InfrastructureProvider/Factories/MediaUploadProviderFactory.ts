import { SERVICE_PROVIDER_DOES_NOT_EXIST } from 'App/Helpers/GeneralPurpose/CustomMessages/GenericMessages'
import FileSystemMediaUploadDriver from 'App/InfrastructureProvider/External/MediaUpload/FileSystemMediaUploadDriver'

export default class MediaUploadProviderFactory {
    
    protected CurrentProvider: string

    constructor(currentProvider: string) {

        this.CurrentProvider = currentProvider

    }
    public build() {
        if (this.CurrentProvider === 'disk') {
            const activatedProvider: FileSystemMediaUploadDriver = new FileSystemMediaUploadDriver()
            return activatedProvider
        }

        return SERVICE_PROVIDER_DOES_NOT_EXIST
    }
}
