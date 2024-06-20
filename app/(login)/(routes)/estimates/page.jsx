import EstimatesList from "@/components/estimatesList/EstimatesList";
import PrimaryButton from "@/components/primaryButton/PrimaryButton";
import PageTitle from "@/components/pageTitle/PageTitle";
import connectDB from "@/lib/database";
import Estimate from "@/models/estimate";

const getEstimates = async () => {
  try {
    await connectDB();

    const estimates = await Estimate.find({});

    const estimatesCount = await Estimate.countDocuments();

    return { estimates, estimatesCount };
  } catch (error) {
    console.log(error);
  }
};

const EstimatesPage = async () => {
  const { estimates, estimatesCount } = await getEstimates();

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-1">
        <PageTitle title={`Estimates (${estimatesCount})`} />
        <PrimaryButton label="Create estimate" href="/estimates/create" />
      </div>
      <EstimatesList estimates={JSON.stringify(estimates)} />
    </div>
  );
};

export default EstimatesPage;
