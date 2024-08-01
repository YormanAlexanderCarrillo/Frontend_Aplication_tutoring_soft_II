import TableForum from "@/components/Forum/TableForums";
import React from "react";

function Forum() {
  return (
    <div className="h-screen overflow-hidden">
      <div className="flex justify-center items-center bg-yellow-500 mt-16">
        <h2>Foros academicos</h2>
      </div>
      <div className="flex justify-center pt-5 h-screen">
        <TableForum />
      </div>
    </div>
  );
}

export default Forum;
