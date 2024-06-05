const { revalidate } = require("../revalidate");

export const deleteEstimateHandler = async (id) => {
  try {
    const res = await fetch(`/api/estimates/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      revalidate("/api/estimates/");
    }
  } catch (error) {
    console.log(error);
  }
};
