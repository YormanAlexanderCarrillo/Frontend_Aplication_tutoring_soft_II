import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

function ModalThread({ session, forum, isOpen, onOpenChange }) {
  const URLAPI = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (isOpen) {
      getComments();
    }
  }, [isOpen]);

  const getComments = async () => {
    try {
      const response = await axios.get(
        `${URLAPI}/threads/get-comments/${forum._id}`,
        {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        }
      );
      if (response.status === 200) {
        setComments(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Modal
        backdrop="blur"
        size="5xl"
        scrollBehavior="outside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {forum.title}
              </ModalHeader>
              <ModalBody>
                <div className="border-solid border-2 rounded-lg p-3 flex flex-col gap-3">
                  <p>{forum.description}</p>
                  <Button color="danger" variant="light" className="self-end">
                    Participar
                  </Button>
                </div>
                <div className="flex flex-col items-end">
                  {comments.map((comment, index) => (
                    <div
                      className="relative border-solid border-2 w-11/12 rounded-lg p-2 mb-2"
                      key={index}
                    >
                      <p>{comment.comment}</p>
                      <p className="absolute bottom-2 right-2 text-xs text-gray-500">
                        {new Date(comment.dateCreated).toLocaleString()}{" "}
                      </p>
                    </div>
                  ))}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ModalThread;
