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
import SecondaryButton from "@/components/secondaryButton/SecondaryButton";
import { IoMdClose } from "react-icons/io";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

const formSchema = z.object({
  customerFirstname: z.string().nonempty("Please enter first name"),
  customerLastname: z.string().nonempty("Please enter last name"),
  periodInMonths: z.coerce.number().min(1, "Please select period"),
  tires: z.array(z.string()).nonempty("Please select the tires"),
  rims: z.boolean().optional(),
  pricePerMonth: z.coerce.number().min(1, "Price must be > 0"),
});

const CreateEstimateForm = () => {
  const [tires, setTires] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [selectedTires, setSelectedTires] = useState([]);

  const router = useRouter();

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

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerFirstname: "",
      customerLastname: "",
      periodInMonths: 0,
      tires: [],
      rims: false,
      pricePerMonth: 0,
    },
  });

  const handleSubmit = async (values) => {
    // try {
    //   const res = await fetch("/api/estimates", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ values }),
    //   });

    //   if (res.ok) {
    //     revalidate("/estimates");
    //     router.push("/estimates");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Create estimate</CardTitle>
          </CardHeader>
          <CardContent className="grid items-start grid-cols-1 md:grid-cols-2 gap-2">
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
            <FormField
              control={form.control}
              name="periodInMonths"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="mb-1">Period</FormLabel>
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
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="tires"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="mb-1 mt-0.5">Choose tires</FormLabel>
                    <div className="grid grid-cols-2 gap-2">
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild className="h-10">
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              className={cn(
                                "justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {value
                                ? `${
                                    tires.find((tire) => tire._id === value)
                                      ?.brand
                                  } - ${
                                    tires.find((tire) => tire._id === value)
                                      ?.width
                                  }'' - ${
                                    tires.find((tire) => tire._id === value)
                                      ?.height
                                  }'' - R${
                                    tires.find((tire) => tire._id === value)
                                      ?.diameter
                                  }`
                                : "Select tire..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                          <Command>
                            <CommandInput placeholder="Search tire..." />
                            <CommandList>
                              <CommandEmpty>No tires found.</CommandEmpty>
                              <CommandGroup>
                                {tires.map((tire, index) => (
                                  <CommandItem
                                    key={index}
                                    value={tire._id}
                                    onSelect={(currentValue) => {
                                      const newValue =
                                        currentValue === field.value
                                          ? ""
                                          : currentValue;
                                      setValue(newValue);
                                      const updatedTires = [
                                        ...field.value,
                                        newValue,
                                      ];
                                      field.onChange(updatedTires);
                                      setSelectedTires(updatedTires);
                                      setOpen(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        value === tire._id
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {tire.brand} - {tire.width}&apos;&apos; -{" "}
                                    {tire.height}&apos;&apos; - R{tire.diameter}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <Button
                        variant="outline"
                        type="button"
                        onClick={() => {
                          if (value) {
                            const updatedTires = [...field.value, value];
                            field.onChange(updatedTires);
                            setSelectedTires(updatedTires);
                          }
                        }}
                        className="h-10"
                      >
                        Duplicate
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {selectedTires.length !== 0 && (
                <div>
                  <h3>Selected tires:</h3>
                  {selectedTires.map((tireId, index) => {
                    const selectedTire = tires.find(
                      (tire) => tire._id === tireId
                    );
                    return (
                      <div
                        className="[&:not(:last-child)]:border-b py-2 flex justify-between items-center"
                        key={index}
                      >
                        <p>
                          {index + 1}. {selectedTire.brand} -{" "}
                          {selectedTire.width}
                          &apos;&apos; - {selectedTire.height}&apos;&apos; - R
                          {selectedTire.diameter}
                        </p>
                        <Button
                          variant="outline"
                          type="button"
                          className="ml-2"
                          onClick={() => {
                            const updatedSelectedTires = form
                              .getValues("tires")
                              .filter((_, i) => i !== index);
                            setSelectedTires(updatedSelectedTires);
                            form.setValue("tires", updatedSelectedTires);
                          }}
                        >
                          <IoMdClose className="text-lg text-rose-500" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="mt-1 flex items-center">
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
          </CardContent>
          <CardFooter>
            <div className="mt-2 text-right">
              <SecondaryButton
                role="link"
                href="/estimates"
                label="Cancel"
                className="mr-2"
              />
              <Button type="submit">Create</Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default CreateEstimateForm;
