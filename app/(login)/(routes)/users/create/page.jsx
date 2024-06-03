import CreateUserForm from "@/components/createUserForm/CreateUserForm";

const CreateUserPage = ({ searchParams }) => {
  const { lastPage } = searchParams;

  return <CreateUserForm lastPage={lastPage} />;
};

export default CreateUserPage;
