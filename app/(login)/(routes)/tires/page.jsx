import TiresList from "@/components/tiresList/TiresList";
import PrimaryButton from "@/components/primaryButton/PrimaryButton";
import PageTitle from "@/components/pageTitle/PageTitle";
import connectDB from "@/lib/database";
import Tire from "@/models/tire";

const getTires = async () => {
  try {
    await connectDB();

    const tires = await Tire.find({});

    const tiresCount = await Tire.countDocuments();

    return { tires, tiresCount };
  } catch (error) {
    console.log(error);
  }
};

const TiresPage = async () => {
  const { tires, tiresCount } = await getTires();

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-end justify-between pb-1 my-1">
        <PageTitle title={`Tires (${tiresCount} items)`} />
        <PrimaryButton role="link" label="Add tire" href="/tires/add" />
      </div>
      <TiresList tires={JSON.stringify(tires)} />
    </div>
  );
};

export default TiresPage;
