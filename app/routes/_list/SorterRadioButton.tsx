import React from "react";
import { RadioButton } from "~/components";

import { useItems } from "~/hooks";
import { Sorter } from "~/types";

const SorterRadioButton: React.FC = () => {
  const { sorter, setSorter } = useItems();

  return (
    <RadioButton
      items={[
        { value: "releaseDate", label: "Release" },
        { value: "createdAt", label: "Created" },
      ]}
      value={sorter}
      onChange={value => setSorter(value as Sorter)}
    />
  );
};

export default SorterRadioButton;
