import React, { createContext, useEffect, useState, useMemo } from "react";
import { collection, onSnapshot, doc, addDoc, setDoc, deleteDoc, query, where, orderBy } from "firebase/firestore";

import { firestore } from "~/utils/firebase";
import { DataConverter } from "~/utils/data_converter";
import { GameItem, Condition, Sorter } from "~/types";

const ItemsContext = createContext<{
  items: GameItem[];
  getItem: (id: GameItem["id"]) => GameItem | undefined;
  saveItem: (item: GameItem) => Promise<void>;
  deleteItem: (id: GameItem["id"]) => Promise<void>;
  condition?: Condition;
  setCondition: (condition: Condition) => void;
  sorter?: Sorter;
  setSorter: (sorter: Sorter) => void;
}>({
  items: [],
  getItem: () => undefined,
  saveItem: async () => {},
  deleteItem: async () => {},
  setCondition: () => {},
  setSorter: () => {},
});

export const ItemsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [items, setItems] = useState<GameItem[]>([]);
  const [condition, setCondition] = useState<Condition>("todo");
  const [sorter, setSorter] = useState<Sorter>("releaseDate");
  const col = useMemo(() => collection(firestore, `/games`).withConverter(DataConverter), []);

  useEffect(() => {
    const order = orderBy(sorter, "asc");
    const q = condition === "todo" ? query(col, where("done", "==", false), order) : query(col, order);
    const unsubscribe = onSnapshot(q, {
      next: snapshot => {
        setItems(snapshot.docs.map(doc => doc.data()));
      },
    });
    return unsubscribe;
  }, [col, condition, sorter]);

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
      await addDoc(col, { ...item, createdAt: new Date() });
    }
  };

  const deleteItem = async (id: GameItem["id"]) => {
    if (!id) return;
    await deleteDoc(doc(col, id));
  };

  return (
    <ItemsContext value={{ items, getItem, saveItem, deleteItem, condition, setCondition, sorter, setSorter }}>
      {children}
    </ItemsContext>
  );
};

export default ItemsContext;
