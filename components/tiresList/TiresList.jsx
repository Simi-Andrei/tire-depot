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

const TiresList = ({ tires, page, limit }) => {
  const parsedTires = JSON.parse(tires);

  return (
    <div className="my-1">
      <Card className="pt-6">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-1 py-0.5 h-8 w-[5%] text-center border-r">
                  No.
                </TableHead>
                <TableHead className="px-1 py-0.5 h-8 w-[30%]">BRAND</TableHead>
                <TableHead className="px-1 py-0.5 h-8 w-[15%] text-center">
                  WIDTH
                </TableHead>
                <TableHead className="px-1 py-0.5 h-8 w-[15%] text-center">
                  HEIGHT
                </TableHead>
                <TableHead className="px-1 py-0.5 h-8 w-[15%] text-center">
                  DIAMETER
                </TableHead>
                <TableHead className="px-1 py-0.5 h-8 w-[30%] text-center">
                  ACTIONS
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parsedTires.map((tire, index) => (
                <TableRow key={tire._id}>
                  <TableCell className="px-1 py-0.5 text-center border-r">
                    {(page - 1) * limit + index + 1}.
                  </TableCell>
                  <TableCell className="px-1 py-0.5">{tire.brand}</TableCell>
                  <TableCell className="px-1 py-0.5 text-center">
                    {tire.width}&apos;&apos;
                  </TableCell>
                  <TableCell className="px-1 py-0.5 text-center">
                    {tire.height}&apos;&apos;
                  </TableCell>
                  <TableCell className="px-1 py-0.5 text-center">
                    R{tire.diameter}
                  </TableCell>
                  <TableCell className="px-1 py-0.5 text-center">
                    <Link
                      className="inline-block align-bottom py-1.5 px-3 rounded text-white hover:bg-slate-200 duration-300"
                      href={`/tires/${tire._id}`}
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
                            Are you sure you wish to delete this tire?
                          </DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete the tire document.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose className="bg-slate-800 text-white py-1 px-4 rounded hover:bg-slate-700 duration-300">
                            Cancel
                          </DialogClose>
                          <DialogClose className="bg-red-600 text-white py-1 px-4 rounded hover:bg-red-700 duration-300 ml-2">
                            <DeleteButton id={tire._id} collection="tires" />
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
export default TiresList;
