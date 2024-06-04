const { revalidate } = require("../revalidate");

export const deleteTireHandler = async (id) => {
  try {
    const res = await fetch(`/api/tires/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      revalidate("/api/tires/");
    }
  } catch (error) {
    console.log(error);
  }
};
