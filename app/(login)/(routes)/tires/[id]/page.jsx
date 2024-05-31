import PageTitle from "@/components/pageTitle/PageTitle";
import EditTireForm from "@/components/editTireForm/EditTireForm";
import connectDB from "@/lib/database";
import Tire from "@/models/tire";

const getTireById = async (id) => {
  try {
    await connectDB();

    const tire = await Tire.findById(id);

    return { tire };
  } catch (error) {
    console.log(error);
  }
};

const TirePage = async ({ params }) => {
  const { id } = params;

  const { tire } = await getTireById(id);

  return (
    <div className="h-full flex flex-col">
      <PageTitle title={`Tire no. ${tire._id}`} className="my-1" />
      <div className="my-1">
        <EditTireForm tire={JSON.stringify(tire)} />
      </div>
    </div>
  );
};

export default TirePage;
