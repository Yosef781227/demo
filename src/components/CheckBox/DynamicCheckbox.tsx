import { Checkbox, CheckboxProps, useColorModeValue, BoxProps, Box } from '@chakra-ui/react';
import { Check, Minus } from '@phosphor-icons/react';
import theme from "@/constants/theme";
import { FC, useState } from 'react';

type Size = 'sm' | 'md' | 'lg';

interface DynamicCheckboxProps extends Omit<CheckboxProps, 'size' | 'children'> {
    size: Size;
    label: string;
    iconType: 'check' | 'minus';
}

const boxSizes: Record<Size, BoxProps> = {
    sm: { width: "12px", height: "12px" },
    md: { width: "16px", height: "16px" },
    lg: { width: "20px", height: "20px" },
};

const DynamicCheckbox: FC<DynamicCheckboxProps> = ({ size, label, iconType, ...rest }) => {
    const [isChecked, setIsChecked] = useState(false);
    const bg = useColorModeValue(theme.colors.primary[400], theme.colors.primary[400]);

    console.log(isChecked);

    const Icon = iconType === 'minus' ? Minus : Check; 

    return (
        <Checkbox 
            {...rest}
            isChecked={isChecked}
            size={theme.fontSizes[size]}
            onChange={e => setIsChecked(e.target.checked)}
            
            icon={
                <Box 
                    {...boxSizes[size]}
                    backgroundColor={isChecked ? bg : "transparent"}
                >
                    <Icon size={size} color={isChecked ? "white" : "transparent"} /> 
                </Box>
            }
        >
            {label}
        </Checkbox>
    );
};

export default DynamicCheckbox;
