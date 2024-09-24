import React from 'react';
import { useState } from 'react';
import { ReactGrid, TextCell } from '@silevis/reactgrid';
import rgStyles from './styles';

export const TestGridExample = () => {
  const [columns, setColumns] = useState([
    { colIndex: 0, width: 100 },
    { colIndex: 1, width: 100 },
    { colIndex: 2, width: 100 },
  ]);

  const [cells, setCells] = useState(() => [
    {
      rowIndex: 0,
      colIndex: 0,
      props: {
        text: '0-0',
      },
      Template: TextCell,
    },
    {
      rowIndex: 5,
      colIndex: 5,
      props: {
        text: '5-5',
      },
      Template: TextCell,
    },
    {
      rowIndex: 3,
      colIndex: 3,
      props: {
        text: '3-3',
      },
      Template: TextCell,
    },
  ]);

  return (
    <div>
      <ReactGrid
        id="test-grid"
        styles={rgStyles}
        enableColumnSelectionOnFirstRow
        rows={[]}
        columns={columns}
        cells={cells}
      />
    </div>
  );
};

export default TestGridExample;
