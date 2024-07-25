import { useState } from 'react';
import { ReactGrid } from '@silevis/reactgrid';
import '@silevis/reactgrid/styles.css';
import { CellTemplates } from './cells';

const departmentOptions = [
  { label: '---', value: '' },
  { label: 'HR', value: 'hr' },
  { label: 'Sales', value: 'sales' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Finance', value: 'finance' },
  { label: 'IT', value: 'it' },
];

const getEmployees = () => [
  {
    empId: 11,
    empName: 'Thomas',
    dept: 'hr',
    hiredAt: new Date('01/01/2020'),
  },
  {
    empId: 12,
    empName: 'Susie',
    dept: 'sales',
    hiredAt: new Date('10-15-2020'),
  },
  { empId: '', empName: '', dept: '', hiredAt: '' },
];

const getColumns = () => [
  { columnId: 'empId', width: 100 },
  { columnId: 'empName', width: 150 },
  { columnId: 'dept', width: 150 },
  { columnId: 'hiredAt', width: 150 },
];

const headerRow = {
  rowId: 'header',
  cells: [
    { type: 'header', text: 'Emp. ID' },
    { type: 'header', text: 'Emp. Name' },
    { type: 'header', text: 'Department' },
    { type: 'header', text: 'Hired Date' },
  ],
};

const getRows = (items) => [
  headerRow,
  ...items.map((item, idx) => {
    // console.log('item', item);
    return {
      rowId: idx,
      cells: [
        { type: 'number', value: item.empId },
        { type: 'text', text: item.empName },
        {
          type: 'dropdown',
          values: departmentOptions,
          isOpen: item.isOpen,
          selectedValue: item.dept,
        },
        { type: 'date', date: item.hiredAt },
      ],
    };
  }),
];

const applyCellChanges = (changes, prevRows) => {
  console.log('changes', changes);
  // console.log('prevRows', prevRows);

  changes.forEach((change) => {
    const { rowId, columnId, previousCell, newCell, type } = change;
    if (type === 'number') {
      prevRows[rowId][columnId] = newCell.value;
    }
    if (type === 'text') {
      prevRows[rowId][columnId] = newCell.text;
    }
    if (type === 'date') {
      prevRows[rowId][columnId] = new Date(newCell.value);
    }
    if (type === 'dropdown') {
      prevRows[rowId].isOpen = newCell.isOpen;
      if (newCell.selectedValue !== previousCell.selectedValue) {
        prevRows[rowId][columnId] = newCell.selectedValue;
      }
    }
  });

  return [...prevRows];
};

const CustomReactGrid = () => {
  const [employees, setEmployees] = useState(getEmployees());

  const [columns] = useState(getColumns());
  const rows = getRows(employees);

  const handleChanges = (changes) => {
    setEmployees((prevItems) => applyCellChanges(changes, prevItems));
  };

  const handleContextMenu = (
    selectedRowIds,
    selectedColIds,
    selectionMode,
    menuOptions
  ) => {
    if (selectionMode === 'row') {
      menuOptions = [
        ...menuOptions,
        {
          empId: 'removePerson',
          label: 'Remove person',
          handler: () => {
            setEmployees((prevPeople) => {
              return [
                ...prevPeople.filter(
                  (person, idx) => !selectedRowIds.includes(idx)
                ),
              ];
            });
          },
        },
      ];
    }
    return menuOptions;
  };

  return (
    <>
      <h3>Table with Custom Cells</h3>
      <ReactGrid
        columns={columns}
        rows={rows}
        customCellTemplates={CellTemplates}
        onCellsChanged={handleChanges}
        onContextMenu={handleContextMenu}
        enableColumnSelection
        enableRowSelection
        enableRangeSelection
        enableFillHandle
      />
    </>
  );
};

export default CustomReactGrid;
