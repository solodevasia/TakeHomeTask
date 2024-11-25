import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  MRT_PaginationState,
  MRT_TableOptions,
  useMaterialReactTable,
  type MRT_ColumnDef, //if using TypeScript (optional, but recommended)
} from "material-react-table";
import {
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const role = ["member", "staff", "admin"];

export default function App() {
  const [data, setData] = useState<object[]>([]);
  const [pagination,setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [count,setCount] = useState(0)
  const [isDeleted, setIsDeleted] = useState(false);
  const [isUpdated,setIsUpdated] = useState(false)
  const columns = useMemo<MRT_ColumnDef<object>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'id',
        visibleInShowHideMenu: false,
        enableEditing: false
      },
      {
        accessorKey: "name",
        header: "Name",
        enableHiding: false,
      },
      {
        accessorKey: "email",
        header: "Email",
        enableHiding: false,
      },
      {
        accessorKey: "pic",
        id: "pic",
        header: "pic",
        Cell: ({ cell }) => <div>{cell.getValue() || ("" as any)}</div>,
      },
      {
        accessorKey: "role",
        accessorFn: (row) => `${role[(row as {role: number}).role]}`,
        id: "role",
        editVariant: 'select',
        editSelectOptions() {
          return ["Member", "Staff","Admin"]
        },
        header: "role",
      },
      {
        accessorKey: "created_at",
        id: "created_at",
        header: "Created Date",
        Cell: ({ cell }) => (
          <div>{moment(cell.getValue() as any).format("DD-MM-YYYY")}</div>
        ),
        enableEditing: false,
      },
    ],
    []
  );


  const handleSaveUser: MRT_TableOptions<object>['onEditingRowSave'] = async ({
    values,
    table,
  }) => {
    fetch('/api/user/updated', {method: 'PUT', body: JSON.stringify(values)}).then(async() => {
      table.setEditingRow(null)
      setIsUpdated(() => true)
    })
  };

  const table = useMaterialReactTable({
    columns,
    data,
    createDisplayMode: "modal", 
    editDisplayMode: "modal", 
    enableEditing: true,
    enableRowSelection: false,
    enableColumnOrdering: true,
    enableGlobalFilter: false,
    rowCount: count,
    manualPagination: true,
    state: {pagination},
    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [10, 20, 30],
      shape: "rounded",
      variant: "outlined",
    },
    onPaginationChange: setPagination,
    onEditingRowSave: handleSaveUser,
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  });
  

  function fetchUserList(page = 1, limit = 10) {
    fetch(`/api/user/list?page=${page === 0 ? 2 : page + 1}&limit=${limit}`).then(async (res) => {
      const result = await res.json();
      setData(() => result.result);
      setCount(() => result.count)
    });
  }

  useEffect(() => {
    fetchUserList(pagination.pageIndex, pagination.pageSize);
    setIsDeleted(() => false);
    setIsUpdated(() => false)
  }, [isDeleted, isUpdated]);

  function Logout() {
    fetch("/api/logout").then(async () => {
      window.location.reload();
    });
  }

  useEffect(() => {
    fetchUserList(pagination.pageIndex, pagination.pageSize)
  },[pagination.pageIndex,pagination.pageSize])

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="https://flowbite.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Task Home BRI
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  onClick={Logout}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <MaterialReactTable table={table}/>
    </div>
  );
}
