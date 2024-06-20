import EntriesList from "@/components/entriesList/EntriesList";
import PrimaryButton from "@/components/primaryButton/PrimaryButton";
import PageTitle from "@/components/pageTitle/PageTitle";
import connectDB from "@/lib/database";
import Entry from "@/models/entry";

const getEntries = async () => {
  try {
    await connectDB();

    const entries = await Entry.find({});

    const entriesCount = await Entry.countDocuments();

    return { entries, entriesCount };
  } catch (error) {
    console.log(error);
  }
};

const EntriesPage = async () => {
  const { entries, entriesCount } = await getEntries();

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-1">
        <PageTitle title={`Entries (${entriesCount})`} />
        <PrimaryButton label="Create entry" href="/entries/create" />
      </div>
      <EntriesList entries={JSON.stringify(entries)} />
    </div>
  );
};

export default EntriesPage;
