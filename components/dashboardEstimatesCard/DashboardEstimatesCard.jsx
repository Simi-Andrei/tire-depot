import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const DashboardEstimatesCard = async () => {
  const { estimates, estimatesCount } = await getEstimates();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Estimates</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-semibold">
          Total number of estimates: {estimatesCount}
        </p>
      </CardContent>
    </Card>
  );
};

export default DashboardEstimatesCard;
