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
import DeleteButton from "@/components/deleteButton/DeleteButton";
import { FaTrashAlt } from "react-icons/fa";
import { FiEye } from "react-icons/fi";

const UsersList = ({ users, page, limit }) => {
  const parsedUsers = JSON.parse(users);

  return (
    <div className="my-1">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="p-1 w-1/12 h-10 border text-center">
              No.
            </TableHead>
            <TableHead className="p-1 w-3/12 h-10 border">ID</TableHead>
            <TableHead className="p-1 w-3/12 h-10 border">NAME</TableHead>
            <TableHead className="p-1 w-3/12 h-10 border">EMAIL</TableHead>
            <TableHead className="p-1 w-2/12 h-10 border text-center">
              ACTIONS
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {parsedUsers.map((user, index) => (
            <TableRow key={user._id}>
              <TableCell className="p-1 border text-center">
                {(page - 1) * limit + index + 1}.
              </TableCell>
              <TableCell className="p-1 border">{user._id}</TableCell>
              <TableCell className="p-1 border">{user.name}</TableCell>
              <TableCell className="p-1 border">{user.email}</TableCell>
              <TableCell className="p-1 border text-center">
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
    </div>
  );
};
export default UsersList;
