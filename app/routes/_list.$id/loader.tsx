import { LoaderFunctionArgs } from "@remix-run/node";

import { GameItem } from "~/types";

export const loader = async ({ params }: LoaderFunctionArgs): Promise<GameItem> => {
  const id = +(params?.id || 0);
  if (!id || id == 0) {
    return { id: 0, title: `new item`, point: 0 };
  }

  const data = await { id, title: `title id: ${id}`, point: 3 };
  if (!data) {
    throw new Response("Item not found", { status: 404 });
  }

  return data;
};
