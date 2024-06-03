"use client";

import { useParams, useRouter } from "next/navigation";
import * as z from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FaRegEdit } from "react-icons/fa";
import { revalidate } from "@/lib/revalidate";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { AiOutlineInfoCircle } from "react-icons/ai";

const formSchema = z.object({
  brand: z.string().optional(),
  width: z.string().optional(),
  height: z.string().optional(),
  diameter: z.string().optional(),
});

const EditTireForm = ({ tire }) => {
  const { id } = useParams();

  const parsedTire = JSON.parse(tire);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...parsedTire,
      width: parsedTire.width.toString(),
      height: parsedTire.height.toString(),
      diameter: parsedTire.diameter.toString(),
    },
  });

  const brand = useWatch({ control: form.control, name: "brand" });
  const width = useWatch({ control: form.control, name: "width" });
  const height = useWatch({ control: form.control, name: "height" });
  const diameter = useWatch({ control: form.control, name: "diameter" });

  const handleSubmit = async (values) => {
    try {
      const res = await fetch(`/api/tires/${id}`, {
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
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Card className="w-full md:w-1/2 md:max-w-md pt-6">
          {form.formState.isDirty &&
            brand !== "" &&
            width !== "" &&
            height !== "" &&
            diameter !== "" && (
              <CardHeader className="pt-0">
                <CardDescription>
                  <span className="flex items-center">
                    <AiOutlineInfoCircle className="mr-1 text-lg" />
                    Unsaved changes
                  </span>
                </CardDescription>
              </CardHeader>
            )}
          <CardContent>
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input className="h-8 border-gray-400" {...field} />
                    </FormControl>
                    <FaRegEdit className="absolute top-1/2 -translate-y-1/2 right-2 pointer-events-none text-gray-400" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="width"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Width</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input className="h-8 border-gray-400" {...field} />
                    </FormControl>
                    <FaRegEdit className="absolute top-1/2 -translate-y-1/2 right-2 pointer-events-none text-gray-400" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input className="h-8 border-gray-400" {...field} />
                    </FormControl>
                    <FaRegEdit className="absolute top-1/2 -translate-y-1/2 right-2 pointer-events-none text-gray-400" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="diameter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diameter</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input className="h-8 border-gray-400" {...field} />
                    </FormControl>
                    <FaRegEdit className="absolute top-1/2 -translate-y-1/2 right-2 pointer-events-none text-gray-400" />
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        {form.formState.isDirty &&
          brand !== "" &&
          width !== "" &&
          height !== "" &&
          diameter !== "" && (
            <div className="py-2 w-full md:w-1/2 md:max-w-md flex justify-end">
              <Button type="submit">Save</Button>
            </div>
          )}
      </form>
    </Form>
  );
};

export default EditTireForm;
