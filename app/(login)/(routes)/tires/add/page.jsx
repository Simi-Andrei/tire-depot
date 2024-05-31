import AddTireForm from "@/components/addTireForm/AddTireForm";

const AddTirePage = ({ searchParams }) => {
  const { lastPage } = searchParams;

  return <AddTireForm lastPage={lastPage} />;
};

export default AddTirePage;
