"use client";

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
import SecondaryButton from "@/components/secondaryButton/SecondaryButton";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  firstName: z.string().nonempty("Please enter first name"),
  lastName: z.string().nonempty("Please enter last name"),
  email: z
    .string()
    .nonempty("Please enter email")
    .email("Please enter a valid email address"),
});

const CreateCustomerForm = () => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const handleSubmit = async (values) => {
    try {
      const res = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ values }),
      });

      if (res.ok) {
        revalidate("/customers");
        router.push("/customers");
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
            <CardTitle className="text-center">Create customer</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  {form.formState.errors.firstName ? (
                    <FormMessage />
                  ) : (
                    <FormLabel className="mb-1 mt-0.5 w-96">
                      Customer first name
                    </FormLabel>
                  )}
                  <FormControl>
                    <Input type="text" placeholder="First name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  {form.formState.errors.lastName ? (
                    <FormMessage />
                  ) : (
                    <FormLabel className="mb-1 mt-0.5 w-96">
                      Customer last name
                    </FormLabel>
                  )}
                  <FormControl>
                    <Input type="text" placeholder="Last name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  {form.formState.errors.email ? (
                    <FormMessage />
                  ) : (
                    <FormLabel className="mb-1 mt-0.5 w-96">
                      User email
                    </FormLabel>
                  )}
                  <FormControl>
                    <Input type="email" placeholder="User email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="col-span-2 text-right mt-4">
              <SecondaryButton
                role="link"
                href="/users"
                label="Cancel"
                className="mr-2"
              />
              <Button type="submit">Create customer</Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default CreateCustomerForm;
