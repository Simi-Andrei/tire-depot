import { Card, CardContent } from "@/components/ui/card";
import EntriesDataTable from "./entries-data-table";

const EntriesList = ({ entries }) => {
  const data = JSON.parse(entries);

  return (
    <div className="my-1">
      <Card className="pt-6">
        <CardContent>
          <EntriesDataTable data={data} />
        </CardContent>
      </Card>
    </div>
  );
};

export default EntriesList;
