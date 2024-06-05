import { Card, CardContent } from "@/components/ui/card";
import UsersDataTable from "./users-data-table";

const UsersList = ({ users }) => {
  const data = JSON.parse(users);

  return (
    <div className="my-1">
      <Card className="pt-6">
        <CardContent>
          <UsersDataTable data={data} />
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersList;
