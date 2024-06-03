import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import DeleteButton from "@/components/deleteButton/DeleteButton";
import { FaTrashAlt } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { FaCheck, FaTimes } from "react-icons/fa";

const UsersList = ({ users, page, limit }) => {
  const parsedUsers = JSON.parse(users);

  return (
    <div className="my-1">
      <Card className="pt-6">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-1 py-0.5 h-8 text-center w-[5%] border-r">
                  No.
                </TableHead>
                <TableHead className="px-1 py-0.5 h-8 w-[30%]">NAME</TableHead>
                <TableHead className="px-1 py-0.5 h-8 w-[35%]">EMAIL</TableHead>
                <TableHead className="px-1 py-0.5 h-8 text-center w-[10%]">
                  ADMIN
                </TableHead>
                <TableHead className="px-1 py-0.5 h-8 text-center w-[10%]">
                  ACTIONS
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parsedUsers.map((user, index) => (
                <TableRow key={user._id}>
                  <TableCell className="px-1 py-0.5 text-center border-r">
                    {(page - 1) * limit + index + 1}.
                  </TableCell>
                  <TableCell className="px-1 py-0.5">{user.name}</TableCell>
                  <TableCell className="px-1 py-0.5">{user.email}</TableCell>
                  <TableCell className="px-1 py-0.5">
                    {user.isAdmin ? (
                      <FaCheck className="mx-auto text-green-500" />
                    ) : (
                      <FaTimes className="mx-auto text-red-500" />
                    )}
                  </TableCell>
                  <TableCell className="px-1 py-0.5 text-center">
                    <Link
                      className="inline-block align-bottom py-1.5 px-3 rounded text-white hover:bg-slate-200 duration-300"
                      href={`/users/${user._id}`}
                    >
                      <FiEye className="text-blue-500" />
                    </Link>
                    <Dialog>
                      <DialogTrigger className="py-1.5 px-3 rounded text-white hover:bg-red-100 duration-300 ml-2">
                        <FaTrashAlt className="text-red-400" />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Are you sure you wish to delete this user?
                          </DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete the user document.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose className="bg-slate-800 text-white py-1 px-4 rounded hover:bg-slate-700 duration-300">
                            Cancel
                          </DialogClose>
                          <DialogClose className="bg-red-600 text-white py-1 px-4 rounded hover:bg-red-700 duration-300 ml-2">
                            <DeleteButton id={user._id} collection="users" />
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
export default UsersList;
