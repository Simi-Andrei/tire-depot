import CreateEntryForm from "@/components/createEntryForm/CreateEntryForm";
import PageTitle from "@/components/pageTitle/PageTitle";

const CreateEntryPage = () => {
  return (
    <div>
      <PageTitle title="Create entry" className="text-center mb-6" />
      <CreateEntryForm />
    </div>
  );
};

export default CreateEntryPage;
