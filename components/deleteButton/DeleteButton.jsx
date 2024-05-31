"use client";

import { revalidate } from "@/lib/revalidate";

const DeleteButton = ({ id, collection }) => {
  const deleteHandler = async (id) => {
    try {
      const res = await fetch(`/api/${collection}/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        revalidate(`/${collection}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <span onClick={() => deleteHandler(id)}>Delete</span>;
};

export default DeleteButton;
