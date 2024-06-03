import EstimatesList from "@/components/estimatesList/EstimatesList";
import PrimaryButton from "@/components/primaryButton/PrimaryButton";
import PageTitle from "@/components/pageTitle/PageTitle";
import connectDB from "@/lib/database";
import Estimate from "@/models/estimate";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { RiErrorWarningLine } from "react-icons/ri";
import PaginationComponent from "@/components/paginationComponent/PaginationComponent";

const getEstimates = async (limit, page) => {
  try {
    await connectDB();

    const estimates = await Estimate.find({})
      .skip((page - 1) * limit)
      .limit(limit);

    const estimatesCount = await Estimate.countDocuments();

    return { estimates, estimatesCount };
  } catch (error) {
    console.log(error);
  }
};

const EstimatesPage = async ({ searchParams }) => {
  let page = parseInt(searchParams.page, 10);

  page = !page || page < 1 ? 1 : page;

  const limit = 18;

  const { estimates, estimatesCount } = await getEstimates(limit, page);

  const totalPages = Math.ceil(estimatesCount / limit);

  const prevPage = page - 1 > 0 ? page - 1 : 1;
  const nextPage = page + 1;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-end justify-between pb-1 my-1">
        <PageTitle title={`Estimates (${estimatesCount})`} />
        <PrimaryButton label="Create estimate" href="/estimates/create" />
      </div>
      {estimates.length === 0 ? (
        <p className="text-center p-2">
          <RiErrorWarningLine className="mx-auto text-2xl text-blue-500" />
          There are no estimates at this moment. Please create one by pressing
          the button above.
        </p>
      ) : (
        <>
          <EstimatesList
            estimates={JSON.stringify(estimates)}
            page={page}
            limit={limit}
          />
          <div className="p-2 mt-auto text-center">
            <PaginationComponent
              page={page}
              prevPage={prevPage}
              nextPage={nextPage}
              totalPages={totalPages}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default EstimatesPage;
