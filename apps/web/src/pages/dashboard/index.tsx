import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef, //if using TypeScript (optional, but recommended)
} from "material-react-table";
import moment from "moment";
import Image from "next/image";

const role = ["member", "staff", "admin"];

export default function App() {
  const [data, setData] = useState([]);
  const columns = useMemo<MRT_ColumnDef<object>[]>(
    () => [
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
        id: "role", 
        header: "role",
        Cell: ({ cell }) => <i>{role[cell.getValue() as any]}</i>, 
      },
      {
        accessorKey: "created_at",
        id: "created_at", 
        header: "Created Date",
        Cell: ({ cell }) => (
          <div>{moment(cell.getValue() as any).format("DD-MM-YYYY")}</div>
        ), 
      },
    ],
    []
  );

  
  const table = useMaterialReactTable({
    columns,
    data, 
    enableRowSelection: true, 
    enableColumnOrdering: true,
    enableGlobalFilter: false,
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

  function Logout() {
    fetch("/api/logout").then(async () => {
      window.location.reload();
    });
  }
  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="https://flowbite.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
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

      <MaterialReactTable table={table} />
    </div>
  );
}
