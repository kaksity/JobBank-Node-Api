import MediaUploadProviderFactory from "App/InfrastructureProvider/Factories/MediaUploadProviderFactory"
import Env from '@ioc:Adonis/Core/Env';

function fetchCurrentMediaUploadProvider() {
    const mediaUploadProvider = new MediaUploadProviderFactory(Env.get('CURRENT_MEDIA_UPLOAD_PROVIDER'))
    return mediaUploadProvider.build()
}

export default fetchCurrentMediaUploadProvider
