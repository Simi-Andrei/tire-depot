import TiresList from "@/components/tiresList/TiresList";
import PrimaryButton from "@/components/primaryButton/PrimaryButton";
import PageTitle from "@/components/pageTitle/PageTitle";
import connectDB from "@/lib/database";
import Tire from "@/models/tire";
import PaginationComponent from "@/components/paginationComponent/PaginationComponent";

const getTires = async (limit, page) => {
  try {
    await connectDB();

    const tires = await Tire.find({})
      .skip((page - 1) * limit)
      .limit(limit);

    const tiresCount = await Tire.countDocuments();

    return { tires, tiresCount };
  } catch (error) {
    console.log(error);
  }
};

const TiresPage = async ({ searchParams }) => {
  let page = parseInt(searchParams.page, 10);

  page = !page || page < 1 ? 1 : page;

  const limit = 18;

  const { tires, tiresCount } = await getTires(limit, page);

  const totalPages = Math.ceil(tiresCount / limit);

  const prevPage = page - 1 > 0 ? page - 1 : 1;
  const nextPage = page + 1;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-end justify-between pb-1 my-1">
        <PageTitle title={`Tires (${tiresCount} items)`} />
        <PrimaryButton
          role="link"
          label="Add tire"
          href={{ pathname: "/tires/add", query: { lastPage: totalPages } }}
        />
      </div>
      <TiresList
        tires={JSON.stringify(tires)}
        page={page}
        limit={limit}
        totalPages={totalPages}
      />
      {/* <div className="mt-auto text-center">
        <PaginationComponent
          page={page}
          prevPage={prevPage}
          nextPage={nextPage}
          totalPages={totalPages}
        />
      </div> */}
    </div>
  );
};

export default TiresPage;
