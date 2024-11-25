import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef, //if using TypeScript (optional, but recommended)
} from "material-react-table";
import moment from "moment";

const role = ["member", "staff", "admin"];

export default function App() {
  const [data, setData] = useState([]);
  const columns = useMemo<MRT_ColumnDef<object>[]>(
    () => [
      {
        accessorKey: "name", //simple recommended way to define a column
        header: "Name",
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorKey: "email", //simple recommended way to define a column
        header: "Email",
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorKey: "pic",
        id: "pic", //id required if you use accessorFn instead of accessorKey
        header: "pic",
        Cell: ({ cell }) => <div>{cell.getValue() || ("" as any)}</div>, //optional custom cell render
      },
      {
        accessorKey: "role",
        id: "role", //id required if you use accessorFn instead of accessorKey
        header: "role",
        Cell: ({ cell }) => <i>{role[cell.getValue() as any]}</i>, //optional custom cell render
      },
      {
        accessorKey: "created_at",
        id: "created_at", //id required if you use accessorFn instead of accessorKey
        header: "Created Date",
        Cell: ({ cell }) => (
          <div>{moment(cell.getValue() as any).format("DD-MM-YYYY")}</div>
        ), //optional custom cell render
      },
    ],
    []
  );

  //pass table options to useMaterialReactTable
  const table = useMaterialReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowSelection: true, //enable some features
    enableColumnOrdering: true, //enable a feature for all columns
    enableGlobalFilter: false, //turn off a feature
  });

  function fetchUserList() {
    fetch("/api/user/list").then(async (res) => {
      const data = await res.json();
      setData(() => data.result);
    });
  }

  useEffect(() => {
    fetchUserList();
  }, []);
  return <MaterialReactTable table={table} />;
}
