// services/storage.service.ts

const CLOUD_NAME = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}`;
const ACTION_NAME = 'image/upload';

export const uploadFile = async (fileUri: string): Promise<string> => {
    try {
        const data = new FormData();
        
        data.append('file', {
            uri: fileUri,
            type: 'image/jpeg', 
            name: `dish_${Date.now()}.jpg`,
        } as any);
        
        data.append('upload_preset', UPLOAD_PRESET!);
        
        const response = await fetch(
            `${CLOUDINARY_URL}/${ACTION_NAME}`,
            {
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        const result = await response.json();

        if (result.error) {
            throw new Error(result.error.message);
        }

        return result.secure_url;
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw error;
    }
}