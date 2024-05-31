"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import PrimaryButton from "@/components/primaryButton/PrimaryButton";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z
    .string()
    .nonempty("Please enter email")
    .email("Please enter a valid email address"),
  password: z.string().nonempty("Please enter password"),
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values) => {
    const email = values.email;
    const password = values.password;

    try {
      setIsSubmitting(true);
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid credentials!");
        setIsSubmitting(false);
        return;
      }
      router.replace("dashboard");
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full grid place-items-center p-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full md:max-w-md"
        >
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login into your account as normal user or Admin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    {form.formState.errors.email ? (
                      <FormMessage />
                    ) : (
                      <FormLabel>Email</FormLabel>
                    )}
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative">
                    {form.formState.errors.password ? (
                      <FormMessage />
                    ) : (
                      <FormLabel>Password</FormLabel>
                    )}
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    {form.formState.dirtyFields.password && (
                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword((prevState) => !prevState)
                        }
                        className="absolute top-1/2 right-1.5 -translate-y-[3px] p-1.5 text-gray-500"
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    )}
                  </FormItem>
                )}
              />
              {error && <p className="text-red-500">{error}</p>}
            </CardContent>
            <CardFooter className="justify-center">
              <Button disabled={isSubmitting} type="submit">
                Login
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default LoginPage;
