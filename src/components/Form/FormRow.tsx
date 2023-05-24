import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
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
}
function FormRow({
  type,
  helperElement = null,
  error = "",
  label,
  placeholder,
}: FormRowProps) {
  return (
    <FormControl>
      <FormLabel fontSize={"1rem"}>{label}</FormLabel>
      <Input fontSize={"sm"} placeholder={placeholder} type={type} />
      {helperElement}

      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
}
export default FormRow;
