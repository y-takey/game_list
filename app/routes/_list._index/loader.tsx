type GameItem = {
  id: number;
  title: string;
  point: number;
};

const getList = async () => {
  const items: GameItem[] = [
    { id: 1, title: "aaa", point: 5 },
    { id: 2, title: "bbb", point: 4 },
  ];

  return items;
};

export const loader = async () => {
  const gameItems: GameItem[] = await getList();

  return { gameItems };
};
