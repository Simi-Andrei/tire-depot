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
import { FaCheck, FaTimes, FaTrashAlt } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { Card, CardContent } from "@/components/ui/card";

const EstimatesList = ({ estimates, page, limit }) => {
  const parsedEstimates = JSON.parse(estimates);

  return (
    <div className="my-1">
      <Card className="pt-6">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="p-1 h-8 text-center">No.</TableHead>
                <TableHead className="p-1 h-8">ID</TableHead>
                <TableHead className="p-1 h-8">FIRST NAME</TableHead>
                <TableHead className="p-1 h-8">LAST NAME</TableHead>
                <TableHead className="p-1 h-8 text-center">TIRES NO.</TableHead>
                <TableHead className="p-1 h-8 text-center">RIMS</TableHead>
                <TableHead className="p-1 h-8 text-center">
                  PERIOD (MONTHS)
                </TableHead>
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
              {parsedEstimates.map((estimate, index) => (
                <TableRow key={estimate._id}>
                  <TableCell className="p-1 text-center">
                    {(page - 1) * limit + index + 1}.
                  </TableCell>
                  <TableCell className="p-1">{estimate._id}</TableCell>
                  <TableCell className="p-1">
                    {estimate.customerFirstname}
                  </TableCell>
                  <TableCell className="p-1">
                    {estimate.customerLastname}
                  </TableCell>
                  <TableCell className="p-1 text-center">
                    {estimate.tires.length}
                  </TableCell>
                  <TableCell className="p-1">
                    {estimate.rims ? (
                      <FaCheck className="text-green-500 mx-auto" />
                    ) : (
                      <FaTimes className="text-red-500 mx-auto" />
                    )}
                  </TableCell>
                  <TableCell className="p-1 text-center">
                    {estimate.periodInMonths}
                  </TableCell>
                  <TableCell className="p-1 text-center">
                    {estimate.pricePerMonth}
                  </TableCell>
                  <TableCell className="p-1 text-center">
                    {estimate.price}
                  </TableCell>
                  <TableCell className="p-1 text-center">
                    <Link
                      className="inline-block align-bottom py-1.5 px-3 rounded text-white hover:bg-slate-200 duration-300"
                      href={`/estimates/${estimate._id}`}
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
                            Are you sure you wish to delete this estimate?
                          </DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete the estimate document.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose className="bg-slate-800 text-white py-1 px-4 rounded hover:bg-slate-700 duration-300">
                            Cancel
                          </DialogClose>
                          <DialogClose className="bg-red-600 text-white py-1 px-4 rounded hover:bg-red-700 duration-300 ml-2">
                            <DeleteButton
                              id={estimate._id}
                              collection="estimates"
                            />
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
export default EstimatesList;
