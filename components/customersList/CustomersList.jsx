import { Card, CardContent } from "@/components/ui/card";
import CustomersDataTable from "./customers-data-table";

const CustomersList = ({ customers }) => {
  const data = JSON.parse(customers);

  return (
    <div className="my-1">
      <Card className="pt-6">
        <CardContent>
          <CustomersDataTable data={data} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomersList;
