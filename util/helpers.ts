import { storage } from "@/libs/firebase";
import { FiMusic } from "react-icons/fi";
import { SiStylelint } from "react-icons/si";
import { AiOutlineTrophy } from "react-icons/ai";
import { HiOutlineNewspaper } from "react-icons/hi";
import { BiMoviePlay, BiBulb } from "react-icons/bi";
import { IoGameControllerOutline } from "react-icons/io5";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

export const numberFormatter = (num: number) => {
  let newNumber = "";

  if (num >= 1000000000) {
    newNumber = (num / 1000000000).toFixed(1) + "B";
  } else if (num >= 1000000) {
    newNumber = (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    newNumber = (num / 1000).toFixed(1) + "K";
  } else {
    newNumber = `${num}`;
  }

  return newNumber;
};

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

export const categories = [
  {
    label: "Sports",
    value: "sports",
    icon: AiOutlineTrophy,
  },
  {
    label: "Music",
    value: "music",
    icon: FiMusic,
  },
  {
    label: "Movies & TV",
    value: "movies&tv",
    icon: BiMoviePlay,
  },
  {
    label: "Gaming",
    value: "gaming",
    icon: IoGameControllerOutline,
  },
  {
    label: "News",
    value: "news",
    icon: HiOutlineNewspaper,
  },
  {
    label: "Learning",
    value: "learning",
    icon: BiBulb,
  },
  {
    label: "Fashion",
    value: "fashion",
    icon: SiStylelint,
  },
];
