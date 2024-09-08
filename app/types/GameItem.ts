export type GameItem = {
  id?: string;
  title: string;
  done: boolean;
  releaseDate?: string;
  point?: string | number;
  platform?: string;
  note?: string;
  createdAt?: Date;
};
