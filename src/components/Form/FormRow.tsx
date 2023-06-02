import {
  FormControl,
  FormErrorMessage,

  FormLabel,
  Input,
} from "@chakra-ui/react";
import { HTMLInputTypeAttribute } from "react";
interface FormRowProps {
  type: HTMLInputTypeAttribute;
  placeholder: string;
  label: string;
  helperElement?: React.ReactNode | null;
  error?: string;
  ref?: React.LegacyRef<HTMLInputElement> | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function FormRow({
  type,
  helperElement = null,
  error = "",
  label,
  ref,
  onChange,
  placeholder,
}: FormRowProps) {
  return (
    <FormControl>
      <FormLabel fontSize={"1rem"}>{label}</FormLabel>
      <Input fontSize={"sm"} placeholder={placeholder} type={type} ref={ref} onChange={onChange} />
      {helperElement}

      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
}
export default FormRow;
