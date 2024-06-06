import CreateEntryFromEstimateForm from "@/components/createEntryFromEstimateForm/CreateEntryFromEstimateForm";
import PageTitle from "@/components/pageTitle/PageTitle";

const CreateEntryFromEstimatePage = () => {
  return (
    <div>
      <div className="my-1">
        <PageTitle title="Create entry" />
        <CreateEntryFromEstimateForm />
      </div>
    </div>
  );
};

export default CreateEntryFromEstimatePage;
