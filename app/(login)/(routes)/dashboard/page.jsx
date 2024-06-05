import DashboardEntriesCard from "@/components/dashboardEntriesCard/DashboardEntriesCard";
import DashboardEstimatesCard from "@/components/dashboardEstimatesCard/DashboardEstimatesCard";
import DashboardTiresCard from "@/components/dashboardTiresCard/DashboardTiresCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// function wait(milliseconds) {
//   return new Promise((resolve) => setTimeout(resolve, milliseconds));
// }

const DashboardPage = async () => {
  // await wait(100000);

  return (
    <div className="h-full flex flex-col gap-2">
      <div className="h-1/2 flex gap-2">
        <div className="w-1/2">
          <DashboardTiresCard />
        </div>
        <div className="w-1/2">
          <DashboardEstimatesCard />
        </div>
      </div>
      <div className="h-1/2">
        <DashboardEntriesCard />
      </div>
    </div>
  );
};

export default DashboardPage;
