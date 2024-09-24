export const handleCut = (event, cellsRange, cellsLookup) => {
  const { startRowIdx, endRowIdx, startColIdx, endColIdx } = cellsRange;
  const cellsLookupCallbacks = [];

  for (let rowIdx = startRowIdx; rowIdx < endRowIdx; rowIdx++) {
    for (let colIdx = startColIdx; colIdx < endColIdx; colIdx++) {
      const element = cellsLookup.get(`${rowIdx} ${colIdx}`);
      if (element) {
        cellsLookupCallbacks.push(element);
      }
    }
  }

  const values = cellsLookupCallbacks.map((element) =>
    element.onStringValueRequsted()
  );

  cellsLookupCallbacks.forEach((element) => element.onStringValueReceived(''));

  const htmlData = `
      <table>
        ${Array.from(
          { length: cellsRange.endRowIdx - cellsRange.startRowIdx },
          (_, rowIndex) => `
          <tr>
            ${Array.from(
              { length: cellsRange.endColIdx - cellsRange.startColIdx },
              (_, colIndex) => {
                const cell = cellsLookup.get(
                  `${cellsRange.startRowIdx + rowIndex} ${
                    cellsRange.startColIdx + colIndex
                  }`
                );
                const value = cell?.onStringValueRequsted() || '';
                return `<td>${value}</td>`;
              }
            ).join('')}
          </tr>
        `
        ).join('')}
      </table>
    `;

  event.clipboardData.setData('text/html', htmlData);
  event.clipboardData.setData('text/plain', values.join('\t'));
};
