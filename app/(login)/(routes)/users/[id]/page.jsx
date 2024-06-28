import PageTitle from "@/components/pageTitle/PageTitle";
import EditUserForm from "@/components/editUserForm/EditUserForm";
import connectDB from "@/lib/database";
import User from "@/models/user";

const getUserById = async (id) => {
  try {
    connectDB();

    const user = await User.findById(id);

    return { user };
  } catch (error) {
    console.log(error);
  }
};

const UserPage = async ({ params }) => {
  const { id } = params;

  const { user } = await getUserById(id);

  return (
    <div className="h-full flex flex-col">
      <PageTitle title={`User no ${user._id}`} className="mb-1" />
      <div className="my-1">
        <EditUserForm user={JSON.stringify(user)} />
      </div>
    </div>
  );
};

export default UserPage;
