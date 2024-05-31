"use client";

import { useEffect, useState } from "react";
import { useRef } from "react";
import { useParams } from "next/navigation";
import { ReactToPrint } from "react-to-print";
import PageTitle from "@/components/pageTitle/PageTitle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PrintEstimatePage = () => {
  const [estimate, setEstimate] = useState({});
  const [loading, setLoading] = useState(true);

  const componentToPrint = useRef();

  const { id } = useParams();

  useEffect(() => {
    const getEstimateById = async () => {
      try {
        const res = await fetch(`/api/estimates/${id}`);

        const { estimate } = await res.json();
        setEstimate(estimate);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getEstimateById();
  }, [id]);

  const estimateDate = new Date();

  const day = String(estimateDate.getDate()).padStart(2, "0");
  const month = String(estimateDate.getMonth() + 1).padStart(2, "0");
  const year = estimateDate.getFullYear();
  const hours = String(estimateDate.getHours()).padStart(2, "0");
  const minutes = String(estimateDate.getMinutes()).padStart(2, "0");

  const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}`;

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <div className="flex items-end justify-between pb-1 my-1">
        <PageTitle title={`Estimate no ${estimate._id}`} />
        <ReactToPrint
          trigger={() => {
            return (
              <button className="inline-block bg-gradient-to-b from-orange-400 via-orange-600 to-red-900 text-white py-1 px-8 rounded font-semibold hover:brightness-110 duration-300 disabled:brightness-90 disabled:pointer-events-none">
                Download
              </button>
            );
          }}
          content={() => componentToPrint.current}
          documentTitle={`Document - ${estimate.customerLastname} ${estimate.customerFirstname}`}
        />
      </div>
      <div>
        <div className="border p-2 mb-20 m-10" ref={componentToPrint}>
          <div className="flex items-center justify-between">
            <div className="font-semibold">
              <p>TIRE DEPOT S.R.L.</p>
              <p>tiredepot@contact.com</p>
              <p>+40 724 724 724</p>
            </div>
            <div className="font-semibold text-center">
              <p>ESTIMATE NO. 1/2024</p>
            </div>
            <div className="font-semibold">
              <p>Date/Time: {formattedDateTime}</p>
            </div>
          </div>
          <div className="mt-24 font-semibold">
            <p>
              <span className="font-normal">Customer full name:</span>{" "}
              {estimate.customerFirstname} {estimate.customerLastname}
            </p>
            <p>
              <span className="font-normal">Custody period (in months):</span>{" "}
              {estimate.periodInMonths}
            </p>
            <p>
              <span className="font-normal">Customer left rims:</span>{" "}
              {estimate.rims === true ? "Yes" : "No"}
            </p>
            <p>
              <span className="font-normal">Tires:</span>
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="p-1 h-10 border text-center">
                    No.
                  </TableHead>
                  <TableHead className="p-1 h-10 border">ID</TableHead>
                  <TableHead className="p-1 h-10 border">BRAND</TableHead>
                  <TableHead className="p-1 h-10 border text-center">
                    WIDTH
                  </TableHead>
                  <TableHead className="p-1 h-10 border text-center">
                    HEIGHT
                  </TableHead>
                  <TableHead className="p-1 h-10 border text-center">
                    DIAMETER
                  </TableHead>
                  <TableHead className="p-1 h-10 border w-44 text-center">
                    PRICE PER MONTH ($)
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {estimate.tires.map((tire, index) => (
                  <TableRow key={index}>
                    <TableCell className="p-1 border text-center">
                      {index + 1}.
                    </TableCell>
                    <TableCell className="p-1 border">{tire._id}</TableCell>
                    <TableCell className="p-1 border">{tire.brand}</TableCell>
                    <TableCell className="p-1 border text-center">
                      {tire.width}&apos;&apos;
                    </TableCell>
                    <TableCell className="p-1 border text-center">
                      {tire.height}&apos;&apos;
                    </TableCell>
                    <TableCell className="p-1 border text-center">
                      R{tire.diameter}
                    </TableCell>
                    <TableCell className="p-1 border text-center">
                      {estimate.pricePerMonth}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="border-t mt-4 py-2 px-10 flex items-center justify-between">
              <p className="text-xl">
                Total <span className="text-sm">(for 6 months):</span>
              </p>
              <p className="text-xl">${estimate.price}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintEstimatePage;
