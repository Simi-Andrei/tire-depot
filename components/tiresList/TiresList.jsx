import { Card, CardContent } from "@/components/ui/card";
import TiresDataTable from "./tires-data-table";

const TiresList = ({ tires }) => {
  const data = JSON.parse(tires);

  return (
    <div className="my-1">
      <Card className="pt-6">
        <CardContent>
          <TiresDataTable data={data} />
        </CardContent>
      </Card>
    </div>
  );
};

export default TiresList;
