import { useState } from "react";

export type InputType = {
  value: string;
  onChange: ({
    target,
  }: {
    target: HTMLInputElement | HTMLTextAreaElement;
  }) => void;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const useInput = (
  defaultValue: string,
  filter?: (text: string) => string
): InputType => {
  const [value, setValue] = useState(
    filter ? filter(defaultValue) : defaultValue
  );

  const onChange = ({
    target,
  }: {
    target: HTMLInputElement | HTMLTextAreaElement;
  }) => {
    const { value } = target;
    setValue(filter ? filter(target.value) : value);
  };

  return { value, onChange, setValue };
};

export default useInput;
