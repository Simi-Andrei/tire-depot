const { revalidate } = require("../revalidate");
import { CircleCheck, CircleAlert } from "lucide-react";
import { toast } from "sonner";

export const deleteUserHandler = async (id) => {
  try {
    const res = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      revalidate("/api/users/");
      toast("User deleted successfully!", {
        icon: <CircleCheck className="size-4 mt-1" />,
        className: "bottom-8 -right-6 group-[.toaster]:shadow-md",
      });
    } else {
      toast("An error occurred. Please try again.", {
        icon: <CircleAlert className="size-4 mt-1" />,
        className: "bottom-8 -right-6 group-[.toaster]:shadow-md",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
