import { FC } from "react";
import { ButtonGroup, Button } from "@chakra-ui/react";

type Props = {
  items: { value: string; label: string }[];
  value?: string;
  onChange: (value: string) => void;
};

export const RadioButton: FC<Props> = props => {
  const { items, value, onChange } = props;

  return (
    <ButtonGroup isAttached colorScheme="blue">
      {items.map(item => (
        <Button key={item.value} onClick={() => onChange(item.value)} isActive={item.value === value}>
          {item.label}
        </Button>
      ))}
    </ButtonGroup>
  );
};
