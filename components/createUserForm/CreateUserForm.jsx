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
import PrimaryButton from "@/components/primaryButton/PrimaryButton";
import SecondaryButton from "@/components/secondaryButton/SecondaryButton";
import { FiEye, FiEyeOff } from "react-icons/fi";

const formSchema = z.object({
  name: z.string().nonempty("Please enter name"),
  email: z
    .string()
    .nonempty("Please enter email")
    .email("Please enter a valid email address"),
  password: z.string().nonempty("Please enter password"),
});

const CreateUserForm = ({ lastPage }) => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values) => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ values }),
      });

      if (res.ok) {
        revalidate("/users");
        router.push(`/users?page=${lastPage}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid grid-cols-2 gap-2 w-full max-w-lg mx-auto my-6 px-6 py-8 shadow rounded"
      >
        <div className="mt-2 col-span-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                {form.formState.errors.name ? (
                  <FormMessage />
                ) : (
                  <FormLabel className="mb-1 mt-0.5 w-96">User name</FormLabel>
                )}
                <FormControl>
                  <Input type="text" placeholder="User name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="mt-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                {form.formState.errors.email ? (
                  <FormMessage />
                ) : (
                  <FormLabel className="mb-1 mt-0.5 w-96">User email</FormLabel>
                )}
                <FormControl>
                  <Input type="email" placeholder="User email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="mt-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                {form.formState.errors.password ? (
                  <FormMessage />
                ) : (
                  <FormLabel className="mb-1 mt-0.5 w-96">
                    User password
                  </FormLabel>
                )}
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="User password"
                    {...field}
                  />
                </FormControl>
                {form.formState.dirtyFields.password && (
                  <button
                    type="button"
                    onClick={() => setShowPassword((prevState) => !prevState)}
                    className="absolute top-1/2 right-1.5 -translate-y-[3px] p-1.5 text-gray-500"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                )}
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-2 text-right mt-4">
          <SecondaryButton
            role="link"
            href="/users"
            label="Cancel"
            className="mr-2"
          />
          <PrimaryButton type="submit" role="button" label="Create user" />
        </div>
      </form>
    </Form>
  );
};

export default CreateUserForm;
