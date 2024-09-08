import React from "react";
import { RadioButton } from "~/components";

import { useItems } from "~/hooks";
import { Condition } from "~/types";

const ConditionRadioButton: React.FC = () => {
  const { condition, setCondition } = useItems();

  return (
    <RadioButton
      items={[
        { value: "todo", label: "TODO" },
        { value: "all", label: "All" },
      ]}
      value={condition}
      onChange={value => setCondition(value as Condition)}
    />
  );
};

export default ConditionRadioButton;
