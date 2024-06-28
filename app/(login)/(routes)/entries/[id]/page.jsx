"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PageTitle from "@/components/pageTitle/PageTitle";
import { RiErrorWarningLine } from "react-icons/ri";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const EntryPage = () => {
  const [entry, setEntry] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const getEntryById = async () => {
      try {
        const res = await fetch(`/api/entries/${id}`);

        const { entry } = await res.json();
        setEntry(entry);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getEntryById();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <div className="flex items-center flex-wrap mb-2">
        <PageTitle title={`Entry no ${entry._id}`} />
        {entry.expired && (
          <p className="text-red-500 ml-2">
            <RiErrorWarningLine className="inline align-middle mb-0.5" />
            The custody period for this entry has expired
          </p>
        )}
      </div>
      <Card className="pt-6">
        <CardContent>
          <CardDescription className="mb-2">
            Customer information
          </CardDescription>
          <p>
            First name: <strong>{entry.customerFirstname}</strong>
          </p>
          <p>
            Last name: <strong>{entry.customerLastname}</strong>
          </p>
        </CardContent>
      </Card>
      <Card className="pt-6 mt-2">
        <CardContent>
          <CardDescription className="mb-2">Tires</CardDescription>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="p-1 h-8 text-center">No.</TableHead>
                <TableHead className="p-1 h-8">ID</TableHead>
                <TableHead className="p-1 h-8">BRAND</TableHead>
                <TableHead className="p-1 h-8 text-center">WIDTH</TableHead>
                <TableHead className="p-1 h-8 text-center">HEIGHT</TableHead>
                <TableHead className="p-1 h-8 text-center">DIAMETER</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entry.storedTires.map((tire, index) => (
                <TableRow key={index}>
                  <TableCell className="p-1 text-center">
                    {index + 1}.
                  </TableCell>
                  <TableCell className="p-1">{tire._id}</TableCell>
                  <TableCell className="p-1">{tire.brand}</TableCell>
                  <TableCell className="p-1 text-center">
                    {tire.width}&apos;&apos;
                  </TableCell>
                  <TableCell className="p-1 text-center">
                    {tire.height}&apos;&apos;
                  </TableCell>
                  <TableCell className="p-1 text-center">
                    R{tire.diameter}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="pt-6 mt-2">
        <CardContent>
          <CardDescription className="mb-2">
            Additional information
          </CardDescription>
          <p className="mt-2">
            Period of tires custody (in months):{" "}
            <strong>{entry.periodInMonths}</strong>
          </p>
          <p>
            Customer left rims: <strong>{entry.rims ? "Yes" : "No"}</strong>
          </p>
          <p>
            Price per month: <strong>${entry.pricePerMonth}</strong>
          </p>{" "}
          <p>
            Total price: <strong>${entry.price}</strong>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EntryPage;
