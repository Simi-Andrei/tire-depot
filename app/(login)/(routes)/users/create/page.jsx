import PageTitle from "@/components/pageTitle/PageTitle";
import CreateUserForm from "@/components/createUserForm/CreateUserForm";

const CreateUserPage = ({ searchParams }) => {
  const { lastPage } = searchParams;

  return (
    <div>
      <PageTitle className="text-center" title="Create user" />
      <CreateUserForm lastPage={lastPage} />
    </div>
  );
};

export default CreateUserPage;
