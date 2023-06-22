import { storage } from "@/libs/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

export const uploadFile = (e: React.FormEvent, setSelectedFile: any) => {
  const reader = new FileReader();

  const file = (e.target as HTMLFormElement).files?.[0];

  reader.readAsDataURL(file);

  reader.onload = (readerEvent) => {
    setSelectedFile(readerEvent.target?.result);
  };
};

export const getFileUrl = async (selectedFile: any, path: string) => {
  if (!selectedFile) return "";

  const curRef = ref(storage, path);

  const url = await uploadString(curRef, selectedFile, "data_url").then(
    async (snapshot) => {
      const downloadUrl = await getDownloadURL(curRef);

      return downloadUrl;
    }
  );

  return url;
};
