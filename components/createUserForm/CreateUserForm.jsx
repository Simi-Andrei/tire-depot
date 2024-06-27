"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import SecondaryButton from "@/components/secondaryButton/SecondaryButton";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TriangleAlert, LoaderCircle } from "lucide-react";

const formSchema = z.object({
  username: z
    .string()
    .min(1, "Please enter username")
    .min(3, "Username must be at least 3 characters long"),
  email: z
    .string()
    .min(1, "Please enter email")
    .email({ message: "Please enter a valid email address" }),
  phoneNumber: z.string().min(1, "Please enter phone number"),
  password: z
    .string()
    .min(1, "Please enter password")
    .min(6, "Password must be at least 6 characters"),
  role: z.string().min(1, "Please select role"),
});

const CreateUserForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [formIsSubmitting, setFormIsSubmitting] = useState(false);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
      role: "",
    },
  });

  const handleSubmit = async (values) => {
    try {
      setFormIsSubmitting(true);
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ values }),
      });

      if (res.ok) {
        revalidate("/users");
        router.replace("/users");
      } else {
        const { error } = await res.json();
        setFormIsSubmitting(false);
        setError(error);
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
            <CardTitle className="text-center">Create user</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-1 mt-0.5 w-96">Username</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-1 mt-0.5 w-96">Email</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-1 mt-0.5 w-96">
                      Phone number
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="mb-1 mt-0.5 w-96">Password</FormLabel>
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="User password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    {form.formState.dirtyFields.password && (
                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword((prevState) => !prevState)
                        }
                        className="absolute top-[27px] right-2 p-1.5 text-gray-400"
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-1 mt-0.5 w-96">Role</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Roles</SelectLabel>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {error && (
              <p className="text-center bg-red-400 text-white rounded-md py-1.5 mt-6 cursor-default">
                <TriangleAlert className="inline size-4 align-middle mr-1 mb-1" />
                {error}
              </p>
            )}
            <div className="col-span-2 grid grid-cols-2 gap-4 mt-6">
              <SecondaryButton role="link" href="/users" label="Cancel" />
              <Button type="submit" disabled={formIsSubmitting}>
                {formIsSubmitting ? (
                  <LoaderCircle className="size-3.5 animate-spin" />
                ) : (
                  "Create user"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default CreateUserForm;
