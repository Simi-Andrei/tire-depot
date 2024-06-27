"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TriangleAlert } from "lucide-react";

const formSchema = z.object({
  username: z.string().min(1, "Username can't be empty"),
  email: z.string().min(1, "Email can't be empty"),
  phoneNumber: z.string().min(1, "Phone number can't be empty"),
  role: z.string(),
});

const EditUserForm = ({ user }) => {
  const parsedUser = JSON.parse(user);

  const [formIsSubmitting, setFormIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...parsedUser,
      username: parsedUser.username,
      email: parsedUser.email,
      phoneNumber: parsedUser.phoneNumber,
      role: parsedUser.role,
    },
  });

  console.log("before submitting", form.formState.isDirty);

  // const username = useWatch({ control: form.control, name: "username" });
  // const email = useWatch({ control: form.control, name: "email" });
  // const phoneNumber = useWatch({ control: form.control, name: "phoneNumber" });

  const handleSubmit = async (values) => {
    try {
      setFormIsSubmitting(true);
      const res = await fetch(`/api/users/${parsedUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ values }),
      });
      if (res.ok) {
        form.resetField("username", { keepDirty: false });
        form.resetField("email", { keepDirty: false });
        form.resetField("phoneNumber", { keepDirty: false });
        form.resetField("role", { keepDirty: false });
        setError("");
        setFormIsSubmitting(false);
        form.reset();
        console.log("after submitting", form.formState.isDirty);
      } else {
        const { error } = await res.json();
        setFormIsSubmitting(false);
        setError(error);
      }
    } catch (error) {
      console.log(error);
      setFormIsSubmitting(false);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Card className="w-full md:w-1/2 md:max-w-md pt-6">
          {form.formState.isDirty && !form.formState.isSubmitSuccessful && (
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input className="h-8 border-gray-400" {...field} />
                    </FormControl>
                    <FormMessage />
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
                    <FormMessage />
                    <FaRegEdit className="absolute top-1/2 -translate-y-1/2 right-2 pointer-events-none text-gray-400" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input className="h-8 border-gray-400" {...field} />
                    </FormControl>
                    <FormMessage />
                    <FaRegEdit className="absolute top-1/2 -translate-y-1/2 right-2 pointer-events-none text-gray-400" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="border-gray-400 h-8">
                          <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FaRegEdit className="absolute top-1/2 -translate-y-1/2 right-8 pointer-events-none text-gray-400" />
                  </div>
                </FormItem>
              )}
            />
            {error && (
              <p className="text-center bg-red-400 text-white rounded-md py-1.5 mt-6 cursor-default">
                <TriangleAlert className="inline size-4 align-middle mr-1 mb-1" />
                {error}
              </p>
            )}
          </CardContent>
        </Card>
        {form.formState.isDirty && !form.formState.isSubmitSuccessful && (
          <div className="py-2 w-full md:w-1/2 md:max-w-md flex justify-end">
            <Button className="w-24" disabled={formIsSubmitting} type="submit">
              {formIsSubmitting ? (
                <CgSpinner className="animate-spin text-xl" />
              ) : (
                "Save"
              )}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};

export default EditUserForm;
