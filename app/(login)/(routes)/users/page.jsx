import UsersList from "@/components/usersList/UsersList";
import PrimaryButton from "@/components/primaryButton/PrimaryButton";
import PageTitle from "@/components/pageTitle/PageTitle";
import connectDB from "@/lib/database";
import User from "@/models/user";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const getUsers = async (limit, page) => {
  try {
    await connectDB();

    const users = await User.find({})
      .skip((page - 1) * limit)
      .limit(limit);

    const usersCount = await User.countDocuments();

    return { users, usersCount };
  } catch (error) {
    console.log(error);
  }
};

const UsersPage = async ({ searchParams }) => {
  let page = parseInt(searchParams.page, 10);

  page = !page || page < 1 ? 1 : page;

  const limit = 18;

  const { users, usersCount } = await getUsers(limit, page);

  const totalPages = Math.ceil(usersCount / limit);

  const prevPage = page - 1 > 0 ? page - 1 : 1;
  const nextPage = page + 1;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-end justify-between pb-1 my-1">
        <PageTitle title={`Users (${usersCount})`} />
        <PrimaryButton
          role="link"
          label="Create user"
          href={{ pathname: "/users/create", query: { lastPage: totalPages } }}
        />
      </div>
      <UsersList
        users={JSON.stringify(users)}
        page={page}
        limit={limit}
        totalPages={totalPages}
      />
      <div className="p-2 mt-auto text-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={page == 1 ? "pointer-events-none opacity-50" : ""}
                href={`?page=${prevPage}`}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink className="font-semibold" href="#">
                {page}/{totalPages}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                className={
                  page === totalPages ? "pointer-events-none opacity-50" : ""
                }
                href={`?page=${nextPage}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default UsersPage;
