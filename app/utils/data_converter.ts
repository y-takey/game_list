import { FirestoreDataConverter } from "firebase/firestore";
import { GameItem } from "~/types";

export const DataConverter: FirestoreDataConverter<GameItem> = {
  toFirestore: item => {
    return {
      ...item,
      point: item.point || "",
      releaseDate: item.releaseDate || "",
      platform: item.platform || "",
      note: item.note || "",
    };
  },
  fromFirestore: snapshot => {
    const data = snapshot.data();
    const item = {
      ...data,
      point: data.point || "",
      releaseDate: data.releaseDate || "",
      platform: data.platform || "",
      note: data.note || "",
      id: snapshot.id,
    } as GameItem;

    return item;
  },
};
