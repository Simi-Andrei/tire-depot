import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardPage = () => {
  return (
    <div className="h-full flex flex-col gap-2">
      <div className="h-1/2 flex gap-2">
        <div className="w-1/2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Tires</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>
        <div className="w-1/2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Estimates</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>
      </div>
      <div className="h-1/2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Entries</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
