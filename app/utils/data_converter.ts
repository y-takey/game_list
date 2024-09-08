import { FirestoreDataConverter, Timestamp } from "firebase/firestore";
import { GameItem } from "~/types";

export const DataConverter: FirestoreDataConverter<GameItem> = {
  toFirestore: item => {
    return {
      ...item,
      point: item.point || "",
      releaseDate: item.releaseDate || "",
      platform: item.platform || "",
      note: item.note || "",
      createdAt: item.createdAt && Timestamp.fromDate(item.createdAt as Date),
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
      createdAt: data.createdAt?.toDate(),
    } as GameItem;

    return item;
  },
};
