"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { revalidate } from "@/lib/revalidate";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  customerLastname: z.string().nonempty("Please enter last name"),
  periodInMonths: z.coerce.number().min(1, "Please select period"),
  rims: z.boolean().optional(),
  pricePerMonth: z.coerce.number().min(1, "Price must be > 0"),
  correspEstimate: z.string({
    required_error: "Please select the corresponding estimate for the entry",
  }),
});

const CreateEntryForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerFirstname: "",
      customerLastname: "",
      storedTire: "",
      storedTires: [],
      periodInMonths: 0,
      rims: false,
      pricePerMonth: 0,
    },
  });

  const router = useRouter();

  const [tires, setTires] = useState([]);
  const [estimates, setEstimates] = useState([]);
  const [storedTires, setStoredTires] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    const getTires = async () => {
      try {
        const res = await fetch("/api/tires");

        const { tires } = await res.json();
        setTires(tires);
      } catch (error) {
        console.error(error);
      }
    };
    const getEstimates = async () => {
      try {
        const res = await fetch("/api/estimates");

        const { estimates } = await res.json();

        const estimatesList = estimates.map((estimate) => ({
          ...estimate,
          label: `Estimate - ${estimate.customerFirstname} ${
            estimate.customerLastname
          } - ${new Date(estimate.createdAt).toLocaleDateString()}`,
          value: estimate._id,
        }));

        setEstimates(estimatesList);
      } catch (error) {
        console.error(error);
      }
    };
    getTires();
    getEstimates();
  }, []);

  const handleAddTire = (storedTire) => {
    if (storedTire) {
      setStoredTires([...storedTires, storedTire]);
    }
  };

  const handleRemoveTire = (index) => {
    const updatedTires = storedTires.filter((_, i) => i !== index);
    setStoredTires(updatedTires);
  };

  const handleDuplicateTire = (index) => {
    const duplicatedTire = storedTires[index];
    setStoredTires([
      ...storedTires.slice(0, index + 1),
      duplicatedTire,
      ...storedTires.slice(index + 1),
    ]);
  };

  const handleSubmit = async (values) => {
    const formData = {
      ...values,
      storedTires,
    };

    try {
      const res = await fetch("/api/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData }),
      });

      if (res.ok) {
        revalidate("/entries");
        router.push("/entries");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="mt-2">
          <FormField
            control={form.control}
            name="correspEstimate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                {form.formState.errors.correspEstimate ? (
                  <FormMessage />
                ) : (
                  <FormLabel className="mb-1 mt-0.5 w-96">
                    Corresponding estimate for the entry
                  </FormLabel>
                )}
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn(
                          "w-96 justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {form.watch("correspEstimate")
                          ? estimates.find(
                              (estimate) =>
                                estimate.value === form.watch("correspEstimate")
                            )?.label
                          : "Select estimate"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-96 p-0">
                    <Command>
                      <CommandInput placeholder="Search estimate..." />
                      <CommandEmpty>No estimate found.</CommandEmpty>
                      <CommandGroup>
                        <CommandList>
                          {estimates.map((estimate) => (
                            <CommandItem
                              key={estimate.value}
                              value={estimate.value}
                              onSelect={(currentValue) => {
                                const selectedValue =
                                  currentValue === form.watch("correspEstimate")
                                    ? ""
                                    : currentValue;
                                form.setValue(
                                  "correspEstimate",
                                  selectedValue,
                                  {
                                    shouldValidate: true,
                                  }
                                );
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  estimate.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {estimate.label}
                            </CommandItem>
                          ))}
                        </CommandList>
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
        </div>
        <div className="mt-2">
          <FormField
            control={form.control}
            name="customerFirstname"
            render={({ field }) => (
              <FormItem>
                {form.formState.errors.customerFirstname ? (
                  <FormMessage />
                ) : (
                  <FormLabel className="mb-1 mt-0.5">
                    Customer first name
                  </FormLabel>
                )}
                <FormControl>
                  <Input placeholder="First name" {...field} />
                </FormControl>
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
                {form.formState.errors.customerLastname ? (
                  <FormMessage />
                ) : (
                  <FormLabel className="mb-1 mt-0.5">
                    Customer last name
                  </FormLabel>
                )}
                <FormControl>
                  <Input placeholder="Last name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-end mt-2 gap-2">
          <FormField
            control={form.control}
            name="storedTire"
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
            onClick={() => handleAddTire(form.getValues("storedTire"))}
            className={`h-10 px-10 mb-2 ${
              storedTires.length >= 4 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={storedTires.length >= 4}
          >
            Add
          </Button>
        </div>
        <div className="mt-2">
          <h2>Selected Tires:</h2>
          {storedTires.length === 0 ? (
            <div className="border border-input p-2 rounded-md">
              <p className="italic">
                No tires added to the entry yet. Add tires from the select
                above.
              </p>
            </div>
          ) : (
            <div className="border border-input p-2 rounded-md">
              {storedTires.map((tireId, index) => {
                const storedTire = tires.find((tire) => tire._id === tireId);
                return (
                  <div
                    key={index}
                    className="flex items-center mb-2 [&:not(:first-child)]:border-t pt-2"
                  >
                    <span>{index + 1}.&nbsp;</span>
                    <p className="mr-4 font-semibold">
                      {storedTire.brand} - {storedTire.width}/
                      {storedTire.height} R{storedTire.diameter}
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleDuplicateTire(index)}
                      className={` h-8 text-blue-400 ${
                        storedTires.length >= 4
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={storedTires.length >= 4}
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
                    {form.formState.errors.periodInMonths ? (
                      <FormMessage />
                    ) : (
                      <FormLabel className="mb-1 mt-0.5">Period</FormLabel>
                    )}
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
                {form.formState.errors.pricePerMonth ? (
                  <FormMessage />
                ) : (
                  <FormLabel className="mb-1 mt-0.5">Price per month</FormLabel>
                )}
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Price per month"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="mt-2 text-right">
          <SecondaryButton
            role="link"
            href="/entries"
            label="Cancel"
            className="mr-2"
          />
          <PrimaryButton role="button" label="Create entry" type="submit" />
        </div>
      </form>
    </Form>
  );
};

export default CreateEntryForm;
