"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PageTitle from "@/components/pageTitle/PageTitle";
import { RiErrorWarningLine } from "react-icons/ri";

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
      <PageTitle title={`Entry no ${entry._id}`} />
      {entry.expired && (
        <p className="text-red-500">
          <RiErrorWarningLine className="inline align-middle mb-0.5 mr-1" />
          The custody period for this entry has expired
        </p>
      )}
      <div>
        <p className="font-bold">First name: {entry.customerFirstname}</p>
        <p className="font-bold">Last name: {entry.customerLastname}</p>
        <div>
          <h2 className="font-bold">Tires:</h2>
          {entry.storedTires.map((tire, index) => (
            <div
              key={index}
              className="flex gap-2 border border-gray-300 w-fit p-1"
            >
              <span className="border-x border-gray-300 px-4 w-20">
                {tire.brand}
              </span>
              <span className="border-x border-gray-300 px-4 w-20">
                {tire.width}
              </span>
              <span className="border-x border-gray-300 px-4 w-20">
                {tire.height}
              </span>
              <span className="border-x border-gray-300 px-4 w-20">
                R{tire.diameter}
              </span>
            </div>
          ))}
        </div>
        <p className="font-bold">Months: {entry.periodInMonths}</p>
        <p className="font-bold">
          Rims: {entry.rims ? "With Rims" : "Without Rims"}
        </p>
        <p className="font-bold">Price: ${entry.price}</p>
      </div>
    </div>
  );
};

export default EntryPage;
