"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { CgSpinner } from "react-icons/cg";
import { Checkbox } from "@/components/ui/checkbox";
import { revalidate } from "@/lib/revalidate";

const formSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  isAdmin: z.boolean().optional(),
});

const EditUserForm = ({ user }) => {
  const parsedUser = JSON.parse(user);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...parsedUser,
      name: parsedUser.name,
      email: parsedUser.email,
      isAdmin: parsedUser.isAdmin,
    },
  });

  const name = useWatch({ control: form.control, name: "name" });
  const email = useWatch({ control: form.control, name: "email" });

  const handleSubmit = async (values) => {
    try {
      const res = await fetch(`/api/users/${parsedUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ values }),
      });

      if (res.ok) {
        revalidate("/users");
        router.push("/users");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Card className="w-full md:w-1/2 md:max-w-md pt-6">
          {form.formState.isDirty && name !== "" && email !== "" && (
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input className="h-8 border-gray-400" {...field} />
                    </FormControl>
                    <FaRegEdit className="absolute top-1/2 -translate-y-1/2 right-2 pointer-events-none text-gray-400" />
                  </div>
                </FormItem>
              )}
            />
            <div className="mt-2 flex items-center">
              <Controller
                name="isAdmin"
                control={form.control}
                render={({ field }) => (
                  <Checkbox
                    id="isAdmin"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <label className="ml-2" htmlFor="isAdmin">
                User is Admin
              </label>
            </div>
          </CardContent>
        </Card>
        {form.formState.isDirty && name !== "" && email !== "" && (
          <div className="py-2 w-full md:w-1/2 md:max-w-md flex justify-end">
            {isSubmitting ? (
              <Button className="w-24" disabled={isSubmitting} type="submit">
                <CgSpinner className="animate-spin text-xl" />
              </Button>
            ) : (
              <Button className="w-24" disabled={isSubmitting} type="submit">
                Save
              </Button>
            )}
          </div>
        )}
      </form>
    </Form>
  );
};

export default EditUserForm;
