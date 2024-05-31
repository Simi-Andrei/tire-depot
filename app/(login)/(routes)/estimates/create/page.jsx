import PageTitle from "@/components/pageTitle/PageTitle";
import CreateEstimateForm from "@/components/createEstimateForm/CreateEstimateForm";

const CreateEstimatePage = () => {
  return (
    <div>
      <PageTitle title="Create estimate" className="text-center mb-6" />
      <CreateEstimateForm />
    </div>
  );
};

export default CreateEstimatePage;
