import { storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const uploadFile = async (fileUri: string) => {
    try {
        const response = await fetch(fileUri);
        const blob = await response.blob();
        const storageRef = ref(storage, `images/${Date.now()}.jpg`);
        await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
}