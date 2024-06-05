"use client";

import { brands, widths, heights, diameters } from "@/lib/tires";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SecondaryButton from "@/components/secondaryButton/SecondaryButton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

const formSchema = z.object({
  brand: z.string().nonempty("Please select brand"),
  width: z.string().nonempty("Please select width"),
  height: z.string().nonempty("Please select height"),
  diameter: z.string().nonempty("Please select diameter"),
});

const AddTireForm = () => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brand: "",
      width: "",
      height: "",
      diameter: "",
    },
  });

  const handleSubmit = async (values) => {
    try {
      const res = await fetch("/api/tires", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ values }),
      });

      if (res.ok) {
        revalidate("/tires");
        router.push("/tires");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full max-w-lg mx-auto mt-10"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Add tire</CardTitle>
          </CardHeader>
          <CardContent className="">
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => {
                return (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="mb-1">Brand</FormLabel>
                    </div>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="focus:ring-gray-300 focus:ring-offset-0">
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {brands.map((brand, index) => (
                          <SelectItem key={index} value={brand}>
                            {brand}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="width"
              render={({ field }) => {
                return (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="mb-1">Width</FormLabel>
                    </div>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="focus:ring-gray-300 focus:ring-offset-0">
                          <SelectValue placeholder="Select width" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {widths.map((width, index) => (
                          <SelectItem key={index} value={width}>
                            {width}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => {
                return (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="mb-1">Height</FormLabel>
                    </div>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="focus:ring-gray-300 focus:ring-offset-0">
                          <SelectValue placeholder="Select height" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {heights.map((height, index) => (
                          <SelectItem key={index} value={height}>
                            {height}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="diameter"
              render={({ field }) => {
                return (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="mb-1">Diameter</FormLabel>
                    </div>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="focus:ring-gray-300 focus:ring-offset-0">
                          <SelectValue placeholder="Select diameter" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {diameters.map((diameter, index) => (
                          <SelectItem key={index} value={diameter}>
                            R{diameter}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </CardContent>
          <CardFooter>
            <SecondaryButton
              role="link"
              href="/tires"
              label="Cancel"
              className="mr-2"
            />

            <Button type="submit">Add tire</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default AddTireForm;
