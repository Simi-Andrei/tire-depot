import UsersList from "@/components/usersList/UsersList";
import PrimaryButton from "@/components/primaryButton/PrimaryButton";
import PageTitle from "@/components/pageTitle/PageTitle";
import connectDB from "@/lib/database";
import User from "@/models/user";

const getUsers = async () => {
  try {
    await connectDB();

    const users = await User.find({});

    const usersCount = await User.countDocuments();

    return { users, usersCount };
  } catch (error) {
    console.log(error);
  }
};

const UsersPage = async () => {
  const { users, usersCount } = await getUsers();

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-1">
        <PageTitle title={`Users (${usersCount})`} />
        <PrimaryButton role="link" label="Create user" href="/users/create" />
      </div>
      <UsersList users={JSON.stringify(users)} />
    </div>
  );
};

export default UsersPage;
