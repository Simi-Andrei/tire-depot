import EntriesList from "@/components/entriesList/EntriesList";
import PrimaryButton from "@/components/primaryButton/PrimaryButton";
import PageTitle from "@/components/pageTitle/PageTitle";
import connectDB from "@/lib/database";
import Entry from "@/models/entry";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import PaginationComponent from "@/components/paginationComponent/PaginationComponent";

const getEntries = async (limit, page) => {
  try {
    await connectDB();

    const entries = await Entry.find({})
      .skip((page - 1) * limit)
      .limit(limit);

    const entriesCount = await Entry.countDocuments();

    return { entries, entriesCount };
  } catch (error) {
    console.log(error);
  }
};

const EntriesPage = async ({ searchParams }) => {
  let page = parseInt(searchParams.page, 10);

  page = !page || page < 1 ? 1 : page;

  const limit = 18;

  const { entries, entriesCount } = await getEntries(limit, page);

  const totalPages = Math.ceil(entriesCount / limit);

  const prevPage = page - 1 > 0 ? page - 1 : 1;
  const nextPage = page + 1;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-end justify-between pb-1 my-1">
        <PageTitle title={`Entries (${entriesCount})`} />
        <PrimaryButton
          role="link"
          label="Create entry"
          href={{
            pathname: "/entries/create",
            query: { lastPage: totalPages },
          }}
        />
      </div>
      <EntriesList
        entries={JSON.stringify(entries)}
        page={page}
        limit={limit}
        totalPages={totalPages}
      />
      <div className="p-2 mt-auto text-center">
        <PaginationComponent
          page={page}
          prevPage={prevPage}
          nextPage={nextPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default EntriesPage;
