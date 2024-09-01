import { useContext } from "react";

import ItemsContext from "~/contexts/ItemsContext";

export const useItems = () => {
  return useContext(ItemsContext);
};
