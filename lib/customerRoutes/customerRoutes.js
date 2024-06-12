const { revalidate } = require("../revalidate");

export const deleteCustomerHandler = async (id) => {
  try {
    const res = await fetch(`/api/customers/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      revalidate("/api/customers/");
    }
  } catch (error) {
    console.log(error);
  }
};
