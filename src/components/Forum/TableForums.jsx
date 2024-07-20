"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  CircularProgress,
  Button,
  Input,
} from "@nextui-org/react";
import { FaRegEye } from "react-icons/fa";
import { FaArrowDownWideShort, FaArrowUpWideShort } from "react-icons/fa6";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import ModalThread from "./ModalThread";
import { useSession } from "next-auth/react";

const columns = [
  { name: "Título", uid: "title", minWidth: "150px" },
  { name: "Fecha", uid: "dateCreated", minWidth: "150px" },
  { name: "Descripción", uid: "description", minWidth: "300px" },
  { name: "Acciones", uid: "actions", minWidth: "100px" },
];

export default function TableForum() {
  const URLAPI = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { data: session, status } = useSession();
  const [forums, setForums] = useState([]);
  const [filteredForums, setFilteredForums] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [isAscending, setIsAscending] = useState(false);
  const [selectedForum, setSelectedForum] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      getForums();
    }
  }, [status]);

  useEffect(() => {
    handleSearch();
  }, [searchTitle, forums]);

  const getForums = async () => {
    axios
      .get(`${URLAPI}/forum/get-forums`, {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      })
      .then((response) => {
        setForums(response.data.data);
        setFilteredForums(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openEditModal = (forum) => {
    setSelectedForum(forum);
    setIsModalOpen(!isModalOpen);
  };

  const handleSearch = () => {
    const filtered = forums.filter((forum) =>
      forum.title.toLowerCase().includes(searchTitle.toLowerCase())
    );
    setFilteredForums(filtered);
  };

  const handleSort = () => {
    const sorted = [...filteredForums].sort((a, b) => {
      const dateA = new Date(a.dateCreated);
      const dateB = new Date(b.dateCreated);
      return isAscending ? dateA - dateB : dateB - dateA;
    });
    setFilteredForums(sorted);
    setIsAscending(!isAscending);
  };

  const renderCell = useCallback((forum, columnKey) => {
    const cellValue = forum[columnKey];
    switch (columnKey) {
      case "title":
        return (
          <div>
            <p>{cellValue}</p>
          </div>
        );
      case "dateCreated":
        return (
          <div className="w-28">
            <p>{new Date(cellValue).toLocaleString()}</p>
          </div>
        );
      case "description":
        return (
          <div className=" overflow-hidden">
            <p className="line-clamp-2">{cellValue}</p>
          </div>
        );
      case "actions":
        return (
          <div className="flex items-center justify-center">
            <Tooltip color="warning" content="Ver foro">
              <span
                className="text-lg  text-warning cursor-pointer active:opacity-50"
                onClick={() => openEditModal(forum)}
              >
                <FaRegEye />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress color="warning" aria-label="Loading..." />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-3/4">
      <div className="flex justify-between space-x-10 items-center w-full mb-4">
        <Input
          clearable
          placeholder="Buscar por título"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <Button onClick={handleSort}>
          {isAscending ? <FaArrowUpWideShort /> : <FaArrowDownWideShort />}
        </Button>
      </div>
      <Table isStriped aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              style={{ minWidth: column.minWidth }}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={filteredForums}>
          {(forum) => (
            <TableRow key={forum._id}>
              {(columnKey) => (
                <TableCell>{renderCell(forum, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ModalThread
        session={session}
        forum={selectedForum}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
}
