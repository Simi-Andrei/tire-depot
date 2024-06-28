import CreateUserForm from "@/components/createUserForm/CreateUserForm";

const CreateUserPage = async ({ searchParams }) => {
  const { lastPage } = searchParams;

  return <CreateUserForm lastPage={lastPage} />;
};

export default CreateUserPage;
