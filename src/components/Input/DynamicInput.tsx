import React, { useState } from "react";
import { Box, Input, InputGroup, InputLeftElement, InputRightElement, Text } from "@chakra-ui/react";

import theme from "@/constants/theme";


interface DynamicInputProps {
  height: string;
  label : string;
  Caption?: string;
  placeholder?: string;
  activeBorderColor?: string;
  placeholder_fontsize?: string;
  
}

const DynamicInput: React.FC<DynamicInputProps> = ({ 
  height, 
  label ,
  Caption,
  placeholder,
  placeholder_fontsize = "14px",
  
  activeBorderColor = theme.colors.primary[400] 
}) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const borderColor = focused 
    ? theme.colors[activeBorderColor] 
    : theme.colors.gray[300];

  return (
    <Box>
      <Text fontSize="12" fontWeight="medium">{label}</Text>
      
      
      <Input
        borderColor={borderColor}
        placeholder={placeholder}
         textAlign={"start"}       
         fontSize={placeholder_fontsize}
        mt={"5px"}
        fontWeight="regular"
        style={{ width: "222px", height }}
        focusBorderColor={activeBorderColor}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      
      
      <Text color="#737373" fontSize="12" fontWeight="medium" mt="5px">{Caption}</Text>
    </Box>
  );
};

export default DynamicInput;
