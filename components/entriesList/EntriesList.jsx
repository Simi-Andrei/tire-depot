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
import { Card, CardContent } from "@/components/ui/card";

const EntriesList = ({ entries, page, limit }) => {
  const parsedEntries = JSON.parse(entries);

  return (
    <div className="my-1">
      <Card className="pt-6">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="p-1 h-8 text-center">No.</TableHead>
                <TableHead className="p-1 h-8">ID</TableHead>
                <TableHead className="p-1 h-8">CUSTOMER</TableHead>
                <TableHead className="p-1 h-8 text-center">
                  STORED TIRES NO.
                </TableHead>
                <TableHead className="p-1 h-8 text-center">MONTHS</TableHead>
                <TableHead className="p-1 h-8 text-center">
                  PRICE PER MONTH ($)
                </TableHead>
                <TableHead className="p-1 h-8 text-center">
                  TOTAL PRICE ($)
                </TableHead>
                <TableHead className="p-1 h-8 text-center">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parsedEntries.map((entry, index) => (
                <TableRow key={entry._id}>
                  <TableCell className="p-1 text-center">
                    {(page - 1) * limit + index + 1}.
                  </TableCell>
                  <TableCell className="p-1">{entry._id}</TableCell>
                  <TableCell className="p-1">
                    {entry.customerFirstname} {entry.customerLastname}
                  </TableCell>
                  <TableCell className="p-1 text-center">
                    {entry.storedTires.length}
                  </TableCell>
                  <TableCell className="p-1 text-center">
                    {entry.periodInMonths}
                  </TableCell>
                  <TableCell className="p-1 text-center">
                    {entry.pricePerMonth}
                  </TableCell>
                  <TableCell className="p-1 text-center">
                    {entry.price}
                  </TableCell>
                  <TableCell className="p-1 text-center">
                    <Link
                      className="inline-block align-bottom py-1.5 px-3 rounded text-white hover:bg-slate-200 duration-300"
                      href={`/entries/${entry._id}`}
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
                            Are you sure you wish to delete this entry?
                          </DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete the entry document.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose className="bg-slate-800 text-white py-1 px-4 rounded hover:bg-slate-700 duration-300">
                            Cancel
                          </DialogClose>
                          <DialogClose className="bg-red-600 text-white py-1 px-4 rounded hover:bg-red-700 duration-300 ml-2">
                            <DeleteButton id={entry._id} collection="entries" />
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
export default EntriesList;
