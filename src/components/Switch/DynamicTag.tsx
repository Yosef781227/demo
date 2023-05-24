
import { Tag, TagLabel } from "@chakra-ui/react";

import { X } from "@phosphor-icons/react";

interface DynamicTagProps {
  height: string;
  width: string;
  icon_size: string;
  gap: string;
  label: string;
}

const DynamicTag: React.FC<DynamicTagProps> = ({
  height,
  width,
  icon_size,
  gap,
  label,
}) => {
  return (
    <Tag h={height} w={width} gap={gap}>
      <TagLabel>{label}</TagLabel>
     < X size={icon_size} />
    </Tag>
  );
};

export default DynamicTag;
