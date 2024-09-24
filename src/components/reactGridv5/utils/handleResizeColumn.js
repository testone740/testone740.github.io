export const handleResizeColumn = (newWidth, columnIndexes, setColumns) => {
  setColumns((prevColumns) => {
    const widthPerColumn =
      columnIndexes.length > 1 ? newWidth / columnIndexes.length : newWidth;

    return prevColumns.map((column, idx) => {
      if (columnIndexes.includes(idx)) {
        return { ...column, width: widthPerColumn };
      }

      return column;
    });
  });
};
