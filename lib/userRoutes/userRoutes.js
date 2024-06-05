const { revalidate } = require("../revalidate");

export const deleteUserHandler = async (id) => {
  try {
    const res = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      revalidate("/api/users/");
    }
  } catch (error) {
    console.log(error);
  }
};
