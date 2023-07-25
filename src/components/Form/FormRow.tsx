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
  mt?: string | number; // margin-top
  pt?: string | number; // padding-top

}
function FormRow({
  type,
  helperElement = null,
  error = "",
  label,
  ref,
  onChange,
  placeholder,
  pt,
  mt,

}: FormRowProps) {
  return (
    <FormControl mt={mt} pt={pt}>
      <FormLabel fontSize={"1rem"}>{label}</FormLabel>
      <Input fontSize={"sm"} placeholder={placeholder} type={type} ref={ref} onChange={onChange} height={"40px"} w={"440px"} borderRadius={"9px"} />
      {helperElement}

      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
}
export default FormRow;
