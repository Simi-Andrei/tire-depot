"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { revalidate } from "@/lib/revalidate";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import PrimaryButton from "@/components/primaryButton/PrimaryButton";
import SecondaryButton from "@/components/secondaryButton/SecondaryButton";
import { FaTimes } from "react-icons/fa";

const formSchema = z.object({
  customerFirstname: z.string().nonempty("Please enter first name"),
  customerLastname: z.string([z.string()]).nonempty("Please enter last name"),
  periodInMonths: z.coerce.number().min(1, "Please select period"),
  rims: z.boolean().optional(),
  pricePerMonth: z.coerce.number().min(1, "Price must be > 0"),
});

const CreateEstimateForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerFirstname: "",
      customerLastname: "",
      selectedTire: "",
      selectedTires: [],
      periodInMonths: 0,
      rims: false,
      pricePerMonth: 0,
    },
  });

  const router = useRouter();

  const [tires, setTires] = useState([]);
  const [selectedTires, setSelectedTires] = useState([]);

  useEffect(() => {
    const getTires = async () => {
      try {
        const res = await fetch("/api/tires");

        const { tires } = await res.json();
        setTires(tires);
      } catch (error) {
        console.log(error);
      }
    };
    getTires();
  }, []);

  const handleAddTire = (selectedTire) => {
    if (selectedTire) {
      setSelectedTires([...selectedTires, selectedTire]);
    }
  };

  const handleRemoveTire = (index) => {
    const updatedTires = selectedTires.filter((_, i) => i !== index);
    setSelectedTires(updatedTires);
  };

  const handleDuplicateTire = (index) => {
    const duplicatedTire = selectedTires[index];
    setSelectedTires([
      ...selectedTires.slice(0, index + 1),
      duplicatedTire,
      ...selectedTires.slice(index + 1),
    ]);
  };

  const handleSubmit = async (values) => {
    const formData = {
      ...values,
      selectedTires,
    };

    try {
      const res = await fetch("/api/estimates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData }),
      });

      if (res.ok) {
        revalidate("/estimates");
        router.push("/estimates");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="mt-2">
          <FormField
            control={form.control}
            name="customerFirstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer first name</FormLabel>
                <FormControl>
                  <Input placeholder="First name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-2">
          <FormField
            control={form.control}
            name="customerLastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer last name</FormLabel>
                <FormControl>
                  <Input placeholder="Last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-end mt-2 gap-2">
          <FormField
            control={form.control}
            name="selectedTire"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <div className="flex items-center justify-between">
                    <FormLabel className="mb-1">Tires</FormLabel>
                  </div>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="focus:ring-gray-300 focus:ring-offset-0">
                        <SelectValue placeholder="Select tire" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tires.map((tire, index) => (
                        <SelectItem key={index} value={tire._id}>
                          {tire.brand} {tire.width}/{tire.height} - R
                          {tire.diameter}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button
            variant="outline"
            type="button"
            onClick={() => handleAddTire(form.getValues("selectedTire"))}
            className={`h-10 px-10 mb-2 ${
              selectedTires.length >= 4 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={selectedTires.length >= 4}
          >
            Add
          </Button>
        </div>
        <div className="mt-2">
          <h2>Selected Tires:</h2>
          {selectedTires.length === 0 ? (
            <div className="border border-input p-2 rounded-md bg-red-50">
              No tires added to the estimate yet. Add tires from the select
              above.
            </div>
          ) : (
            <div className="border border-input p-2 rounded-md">
              {selectedTires.map((tireId, index) => {
                const selectedTire = tires.find((tire) => tire._id === tireId);
                return (
                  <div
                    key={index}
                    className="flex items-center mb-2 border-b pb-2"
                  >
                    <span>{index + 1}.&nbsp;</span>
                    <p className="mr-4 font-semibold">
                      {selectedTire.brand} - {selectedTire.width}/
                      {selectedTire.height} R{selectedTire.diameter}
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleDuplicateTire(index)}
                      className={` h-8 text-blue-400 ${
                        selectedTires.length >= 4
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={selectedTires.length >= 4}
                    >
                      Duplicate
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleRemoveTire(index)}
                      className="ml-4 text-red-400 h-8 hover:text-red-400"
                    >
                      Remove
                      <FaTimes className="ml-2 mt-0.5" />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="mt-2">
          <FormField
            control={form.control}
            name="periodInMonths"
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel className="mb-1">Period</FormLabel>
                  </div>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="focus:ring-gray-300 focus:ring-offset-0">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="3">3 months</SelectItem>
                      <SelectItem value="6">6 months</SelectItem>
                      <SelectItem value="12">12 months</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <div className="mt-2 flex items-center">
          <Controller
            name="rims"
            control={form.control}
            render={({ field }) => (
              <Checkbox
                id="rims"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <label className="ml-2" htmlFor="rims">
            Customer leaves rims
          </label>
        </div>
        <div className="mt-2">
          <FormField
            control={form.control}
            name="pricePerMonth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price per month</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Price per month"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-2 text-right">
          <SecondaryButton
            role="link"
            href="/estimates"
            label="Cancel"
            className="mr-2"
          />
          <PrimaryButton role="button" label="Create estimate" type="submit" />
        </div>
      </form>
    </Form>
  );
};

export default CreateEstimateForm;
