"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
} from "@nextui-org/react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function ModalComment({ session, forumId, isOpen, onOpenChange }) {
  const URLAPI = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [comment, setComment] = useState("");

  const saveComment = () => {
    try {
      const thread = {
        forum: forumId,
        comment: comment,
      };
      axios
        .post(`${URLAPI}/threads/add-thread`, thread, {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        })
        .then((response) => {
          console.log(response);
          if (response.data.status === 200) {
            onOpenChange(false)
            toast.success(response.data.message, {
              position: "top-right",
              autoClose: 2000,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("No se pudo guardar su aporte", {
              position: "top-right",
              autoClose: 2000,
            });
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        size="5xl"
        onOpenChange={onOpenChange}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Comentario
              </ModalHeader>
              <ModalBody>
                <Textarea
                  placeholder="Ingrese su aporte"
                  minRows={15}
                  maxRows={20}
                  onChange={(e) => setComment(e.target.value)}
                  className="resize-none"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={saveComment}>
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default ModalComment;
