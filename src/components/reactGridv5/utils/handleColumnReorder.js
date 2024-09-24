export const handleColumnReorder = (
  selectedColIndexes,
  destinationColIdx,
  setColumns
) => {
  setColumns((prevColumns) => {
    const selectedColumns = prevColumns.filter((_, index) =>
      selectedColIndexes.includes(index)
    );
    const unselectedColumns = prevColumns.filter(
      (_, index) => !selectedColIndexes.includes(index)
    );

    const adjustedDestinationColIdx =
      selectedColIndexes[0] > destinationColIdx
        ? destinationColIdx
        : destinationColIdx - selectedColumns.length + 1;

    const newColumns = [
      ...unselectedColumns.slice(0, adjustedDestinationColIdx),
      ...selectedColumns,
      ...unselectedColumns.slice(adjustedDestinationColIdx),
    ];

    return newColumns;
  });
};
