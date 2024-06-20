import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const DashboardTiresCard = async () => {
  const { tires, tiresCount } = await getTires();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Tires</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-semibold">Total number of tires: {tiresCount}</p>
      </CardContent>
    </Card>
  );
};

export default DashboardTiresCard;
