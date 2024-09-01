import React, { createContext, useEffect, useState, useMemo } from "react";
import { collection, onSnapshot, doc, addDoc, setDoc, deleteDoc } from "firebase/firestore";

import { firestore } from "~/utils/firebase";
import { DataConverter } from "~/utils/data_converter";
import { GameItem } from "~/types";

const ItemsContext = createContext<{
  items: GameItem[];
  getItem: (id: GameItem["id"]) => GameItem | undefined;
  saveItem: (item: GameItem) => Promise<void>;
  deleteItem: (id: GameItem["id"]) => Promise<void>;
}>({
  items: [],
  getItem: () => undefined,
  saveItem: async () => {},
  deleteItem: async () => {},
});

export const ItemsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [items, setItems] = useState<GameItem[]>([]);
  const col = useMemo(() => collection(firestore, `/games`).withConverter(DataConverter), []);

  useEffect(() => {
    const unsubscribe = onSnapshot(col, {
      next: snapshot => {
        setItems(snapshot.docs.map(doc => doc.data()));
      },
    });
    return unsubscribe;
  }, [col]);

  const getItem = (id: GameItem["id"]): GameItem | undefined => {
    if (!id || id == "new") {
      return { id: "", title: "", done: false, platform: "ps", point: "", releaseDate: "" };
    }
    return items.find(item => item.id === id);
  };

  const saveItem = async (item: GameItem) => {
    if (item.id) {
      await setDoc(doc(col, item.id), item);
    } else {
      await addDoc(col, item);
    }
  };

  const deleteItem = async (id: GameItem["id"]) => {
    if (!id) return;
    await deleteDoc(doc(col, id));
  };

  return <ItemsContext value={{ items, getItem, saveItem, deleteItem }}>{children}</ItemsContext>;
};

export default ItemsContext;
