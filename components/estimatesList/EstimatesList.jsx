import { Card, CardContent } from "@/components/ui/card";
import EstimatesDataTable from "./estimates-data-table";

const EstimatesList = ({ estimates }) => {
  const data = JSON.parse(estimates);

  return (
    <div className="my-1">
      <Card className="pt-6">
        <CardContent>
          <EstimatesDataTable data={data} />
        </CardContent>
      </Card>
    </div>
  );
};

export default EstimatesList;
