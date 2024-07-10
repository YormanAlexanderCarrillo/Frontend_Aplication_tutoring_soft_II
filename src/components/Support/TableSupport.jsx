import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import React, { useCallback } from "react";
import { IoMdCloudDownload } from "react-icons/io";

const columns = [
  { name: "Nombre", uid: "name" },
  { name: "Tamaño", uid: "size" },
  { name: "Descargar", uid: "actions" },
];

function TableSupport({ files }) {
  const renderCell = useCallback((file, columnKey) => {
    const cellValue = file[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <div>
            <p>{cellValue}</p>
          </div>
        );
      case "size":
        return (
          <div>
            <p>{parseFloat(cellValue).toFixed(2)} MB</p>
          </div>
        );
      case "actions":
        return (
          <div className="items-center">
            <Tooltip color="success" content="Descargar archivo">
              <a
                className="text-lg text-success cursor-pointer active:opacity-50"
                href={file.urlDownload}
                target="_blank"
              >
                <IoMdCloudDownload />
              </a>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={files}>
          {(file) => (
            <TableRow key={file._id}>
              {(columnKey) => (
                <TableCell>{renderCell(file, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default TableSupport;
