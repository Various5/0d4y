import { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import styles from '../styles/0d4y.module.css';

export async function getServerSideProps() {
  const res = await fetch('https://0d4y.ch/api/scrape');
  const data = await res.json();

  return {
    props: {
      items: data,
    },
  };
}

function getScoreColor(score) {
  const hue = ((1 - score / 10) * 120).toString(10);
  return ["hsl(", hue, ",100%,50%)"].join("");
}

function isDarkColor(color) {
  const hsl = color.match(/\d+/g);
  return hsl[2] < 50;
}

export default function Contact({ items }) {
  const data = useMemo(() => items, [items]);
  const columns = useMemo(() => [
    { Header: 'ID', accessor: 'id' },
    { Header: 'CAN', accessor: 'can' },
    { Header: 'Org', accessor: 'org' },
    { Header: 'CVE', accessor: 'cve' },
    { Header: 'Score', accessor: 'score', Cell: ({ value }) => <div style={{backgroundColor: getScoreColor(value), color: isDarkColor(getScoreColor(value)) ? 'white' : 'black'}}>{value}</div> },
    { Header: 'Date', accessor: 'date' },
    { Header: 'Title', accessor: 'title', Cell: ({ row: { original } }) => <a href={`https://www.zerodayinitiative.com/advisories/${original.id}/`}>{original.title.substring(0, 15)}...</a> },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  return (
    <div>
      <h1>0d4y's:</h1>
      <table {...getTableProps()} className={styles.table}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : '' }
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  const cellProps = cell.getCellProps();
                  if (cell.column.id === 'score') {
                    cellProps.style = { backgroundColor: getScoreColor(cell.value), color: isDarkColor(getScoreColor(cell.value)) ? 'white' : 'black' };
                  }
                  return <td {...cellProps}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
