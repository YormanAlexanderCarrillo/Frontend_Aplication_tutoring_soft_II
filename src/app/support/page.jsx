"use client";
import SelectSubject from "@/components/Support/SelectSubject";
import TableSupport from "@/components/Support/TableSupport";
import { CircularProgress } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

function SupportPage() {
  const APIURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { data: session, status } = useSession();
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (status === "authenticated") {
      getSubjects();
    }
  }, [status]);

  useEffect(() => {
    if (selectedSubject !== "") {
      getFiles();
    }
  }, [selectedSubject]);

  const getSubjects = async () => {
    await axios
      .get(`${APIURL}/subject/get-all-subjects`, {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      })
      .then((response) => {
        setSubjects(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSelectdChange = (id) => {
    setSelectedSubject(id);
  };

  const getFiles = async () => {
    await axios
      .get(`${APIURL}/file/get-material-by-subject/${selectedSubject}`, {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      })
      .then((response) => {
        setFiles(response.data.supportMaterial);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress color="warning" aria-label="Loading..." />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center pt-20 h-screen ">
      <div className="w-4/5 ">
        <SelectSubject
          subjects={subjects}
          onSelectChange={handleSelectdChange}
        />
      </div>
      <div className="w-4/5 mt-5">
        <TableSupport files={files} />
      </div>
    </div>
  );
}

export default SupportPage;
