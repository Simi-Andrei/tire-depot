import CustomersList from "@/components/customersList/CustomersList";
import PrimaryButton from "@/components/primaryButton/PrimaryButton";
import PageTitle from "@/components/pageTitle/PageTitle";
import connectDB from "@/lib/database";
import Customer from "@/models/customer";

const getCustomers = async () => {
  try {
    await connectDB();

    const customers = await Customer.find({});

    const customersCount = await Customer.countDocuments();

    return { customers, customersCount };
  } catch (error) {
    console.log(error);
  }
};

const CustomersPage = async () => {
  const { customers, customersCount } = await getCustomers();

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-1">
        <PageTitle title={`Customers (${customersCount})`} />
        <PrimaryButton
          role="link"
          label="Create customer"
          href="/customers/create"
        />
      </div>
      <CustomersList customers={JSON.stringify(customers)} />
    </div>
  );
};

export default CustomersPage;
