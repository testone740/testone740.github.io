import React, { useState } from 'react';
import {
  NonEditableCell,
  NumberCell,
  ReactGrid,
  TextCell,
} from '@silevis/reactgrid';
import { peopleArr, rgStyles } from './utils/examplesConfig';
import { handleCopy } from './utils/handleCopy';
import { handleCut } from './utils/handleCut';
import { handlePaste } from './utils/handlePaste';

export const CutCopyPasteExample = () => {
  const [people, setPeople] = useState(peopleArr);

  const columnDefs = Object.keys(peopleArr[0]).reduce((acc, peopleKey, idx) => {
    if (['_id', 'position'].includes(peopleKey)) return acc;
    const cellTemplate = peopleKey === 'age' ? NumberCell : TextCell;
    return [...acc, { title: peopleKey, width: 100 * idx, cellTemplate }];
  }, []);

  const updatePerson = (id, key, newValue) => {
    setPeople((prev) => {
      return prev.map((p) => (p._id !== id ? p : { ...p, [key]: newValue }));
    });
  };

  const gridRows = Array.from({ length: people.length + 1 }, (_, i) => ({
    rowIndex: i,
    height: 40,
  }));

  const gridColumns = columnDefs.map((col, index) => ({
    colIndex: index,
    width: col.width,
  }));

  const cells = [];

  gridRows.forEach((row, rowIndex) => {
    const personRowIndex = row.rowIndex;

    if (rowIndex === 0) {
      columnDefs.forEach((col, colIndex) => {
        cells.push({
          rowIndex,
          colIndex,
          Template: NonEditableCell,
          props: {
            value: col.title,
            style: {
              backgroundColor: '#55bc71',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
            },
          },
          isSelectable: false,
        });
      });
    } else {
      const personCells = columnDefs.map((col) => {
        const numberCellProps = {
          onValueChanged: (newValue) => {
            updatePerson(people[personRowIndex - 1]._id, col.title, newValue);
          },
          value: people[personRowIndex - 1][col.title.toLowerCase()],
        };

        const textCellProps = {
          text: people[personRowIndex - 1][col.title.toLowerCase()],
          onTextChanged: (newText) => {
            updatePerson(people[personRowIndex - 1]._id, col.title, newText);
          },
        };

        return {
          Template: col.cellTemplate,
          props: col.title === 'age' ? numberCellProps : textCellProps,
        };
      });

      columnDefs.forEach((_, colIndex) => {
        cells.push({
          rowIndex,
          colIndex,
          ...personCells[colIndex],
        });
      });
    }
  });

  return (
    <div>
      <ReactGrid
        id="cut-copy-paste-example"
        styles={rgStyles}
        onCut={handleCut}
        onCopy={handleCopy}
        onPaste={handlePaste}
        initialFocusLocation={{ rowIndex: 2, colIndex: 1 }}
        rows={gridRows}
        columns={gridColumns}
        cells={cells}
      />
    </div>
  );
};

export default CutCopyPasteExample;
