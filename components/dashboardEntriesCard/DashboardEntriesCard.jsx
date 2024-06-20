import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import connectDB from "@/lib/database";
import Entry from "@/models/entry";

const getEntries = async () => {
  try {
    await connectDB();

    const entries = await Entry.find({});

    const entriesCount = await Entry.countDocuments();

    const expiredEntriesCount = await Entry.find({
      expired: true,
    }).countDocuments();

    return { entries, entriesCount, expiredEntriesCount };
  } catch (error) {
    console.log(error);
  }
};

const DashboardEntriesCard = async () => {
  const { entries, entriesCount, expiredEntriesCount } = await getEntries();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Entries</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-semibold">
          Total number of estimates: {entriesCount}
        </p>
        <p className="font-semibold">Expired entries: {expiredEntriesCount}</p>
      </CardContent>
    </Card>
  );
};

export default DashboardEntriesCard;
