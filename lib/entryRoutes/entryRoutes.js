const { revalidate } = require("../revalidate");

export const deleteEntryHandler = async (id) => {
  try {
    const res = await fetch(`/api/entries/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      revalidate("/api/entries/");
      revalidate("/api/notifications/");
    }
  } catch (error) {
    console.log(error);
  }
};
