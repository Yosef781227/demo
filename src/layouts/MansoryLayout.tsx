import { useRef, useState, useEffect } from "react";

const MasonryLayout = ({
  items,
  columnWidth,
  gap,
}: {
  items: any;
  columnWidth: any;
  gap: any;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(4);

  useEffect(() => {
    const recalculateColumns = () => {
      const containerWidth = containerRef?.current?.offsetWidth || 0;
      const newColumns = Math.floor(containerWidth / (columnWidth + gap));
      setColumns(newColumns);
    };

    recalculateColumns();
    window.addEventListener("resize", recalculateColumns);
    return () => {
      window.removeEventListener("resize", recalculateColumns);
    };
  }, [columnWidth, gap]);

  const generateColumns = () => {
    const columnsArr: any[] = [];
    for (let i = 0; i < columns; i++) {
      columnsArr.push([]);
    }
    items.forEach((item: any, index: any) => {
      const columnIndex = index % columns;
      columnsArr[columnIndex].push(item);
    });
    return columnsArr;
  };

  return (
    <div ref={containerRef} style={{ display: "flex", flexWrap: "wrap" }}>
      {generateColumns().map((column, index) => (
        <div key={index} style={{ flex: 1, margin: `0 ${gap / 2}px` }}>
          {column.map((item: any, itemIndex: any) => (
            <div key={itemIndex} style={{ marginBottom: gap }}>
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MasonryLayout;
