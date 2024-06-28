"use client";

import { useState } from "react";
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
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaRegEdit } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CircleAlert, CircleCheck, TriangleAlert } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  username: z.string().min(1, "Username can't be empty"),
  email: z.string().min(1, "Email can't be empty"),
  phoneNumber: z.string().min(1, "Phone number can't be empty"),
  role: z.string(),
});

const hasUnsavedChanges = (defaultValues, currentValues) => {
  return Object.keys(defaultValues).some(
    (key) => defaultValues[key] !== currentValues[key]
  );
};

const EditUserForm = ({ user }) => {
  const parsedUser = JSON.parse(user);

  const [formIsSubmitting, setFormIsSubmitting] = useState(false);
  const [error, setError] = useState("");

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

  const currentValues = useWatch({
    control: form.control,
    defaultValue: form.formState.defaultValues,
  });

  const handleSubmit = async (values) => {
    try {
      setFormIsSubmitting(true);
      const res = await fetch(`/api/users/${parsedUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ values }),
      });
      if (res.ok) {
        setError("");
        setFormIsSubmitting(false);
        toast("User saved successfully!", {
          icon: <CircleCheck className="size-4 mt-1" />,
          className: "bottom-8 -right-6 group-[.toaster]:shadow-md",
        });
      } else {
        const { error } = await res.json();
        setFormIsSubmitting(false);
        setError(error);
        toast("An error occurred. Please try again.", {
          icon: <CircleAlert className="size-4 mt-1" />,
          className: "bottom-8 -right-6 group-[.toaster]:shadow-md",
        });
        console.log(form.formState.errors);
      }
    } catch (error) {
      console.log(error);
      setFormIsSubmitting(false);
      setError("An error occurred. Please try again.");
    }
    form.reset(values, {
      keepIsSubmitSuccessful: false,
      keepIsSubmitted: false,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Card className="w-full md:w-1/2 md:max-w-md">
          <CardHeader className="flex-row gap-2 items-start space-y-1">
            <CardTitle className="text-lg">General info</CardTitle>
            {hasUnsavedChanges(form.formState.defaultValues, currentValues) && (
              <CardDescription className="mb-4">
                (You have unsaved changes)
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input className="h-9 border-gray-400" {...field} />
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
                      <Input className="h-9 border-gray-400" {...field} />
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
                      <Input className="h-9 border-gray-400" {...field} />
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
                        <SelectTrigger className="border-gray-400 h-9">
                          <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FaRegEdit className="absolute top-1/2 -translate-y-1/2 right-9 pointer-events-none text-gray-400" />
                  </div>
                </FormItem>
              )}
            />
            {error && (
              <p className="text-center border bg-red-50 border-red-200 text-red-400 rounded-md py-1.5 mt-6 cursor-default">
                <TriangleAlert className="inline size-4 align-middle mr-1 mb-1" />
                {error}
              </p>
            )}
          </CardContent>
        </Card>
        {(hasUnsavedChanges(form.formState.defaultValues, currentValues) ||
          error) && (
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
