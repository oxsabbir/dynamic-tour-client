"use client";

import React from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  Input,
  Button,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

import { signIn } from "@/auth";

export function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const registerHandler = function (data) {
    const formdata = new FormData();
    formdata.set("email", data?.email);
    formdata.set("password", data?.password);
    signIn("credentials", formdata);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="md:max-w-[450px] shadow-none md:shadow-md py-8 md:px-6 md:border md:border-gray-300">
        <CardBody>
          <form
            action={async () => {
              "use server";
              signIn("credentials");
            }}
            onSubmit={handleSubmit(registerHandler)}
            className="flex flex-col gap-4 "
          >
            <div>
              <label htmlFor="email">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="block font-medium mb-2"
                >
                  Email
                </Typography>
              </label>
              <Input
                id="email"
                color="gray"
                size="lg"
                type="email"
                name="email"
                {...register("email", { required: "Email is required" })}
                placeholder="name@mail.com"
                className="!w-full placeholder:!opacity-100 focus:!border-t-offGray !border-offGray"
                labelProps={{
                  className: "hidden",
                }}
              />
              {errors?.email && (
                <p role="alert" className=" text-red-400 mt-2 text-sm">
                  {errors?.email?.message}
                </p>
              )}

              <label htmlFor="password">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="block font-medium mb-2 mt-3"
                >
                  Password
                </Typography>
              </label>
              <Input
                id="password"
                color="gray"
                size="lg"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Password minlength is 8" },
                })}
                type="password"
                name="password"
                placeholder="name@mail.com"
                className="!w-full placeholder:!opacity-100 focus:!border-t-offGray !border-offGray"
                labelProps={{
                  className: "hidden",
                }}
              />
              {errors?.password && (
                <p role="alert" className=" text-red-400 mt-2 text-sm">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <Button type="submit">Login</Button>

            <Typography
              variant="small"
              className="text-center mx-auto max-w-[19rem] !font-medium !text-gray-600"
            >
              Upon signing in, you consent to abide by our{" "}
              <a href="#" className="text-gray-900">
                Terms of Service
              </a>{" "}
              &{" "}
              <a href="#" className="text-gray-900">
                Privacy Policy.
              </a>
            </Typography>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default Login;