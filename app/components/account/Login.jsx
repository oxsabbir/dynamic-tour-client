"use client";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, Typography } from "@material-tailwind/react";
import { signInAction, signInWithGoogleAction } from "@/app/action/AuthAction";
import BrandLogo from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import googleLogo from "@/public/google_icon.svg";
import { credentialsRegisterHandler } from "@/app/libs/authenticate";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

export function Login({ pathName }) {
  const [status, setStatus] = useState({ loading: false, error: null });
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const isLogin = pathName === "/login";
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const loginHandler = async function (data) {
    const formdata = new FormData();
    formdata.set("email", data?.email);
    formdata.set("password", data?.password);
    try {
      setStatus((prev) => {
        return { ...prev, loading: true };
      });
      await signInAction(formdata);
    } catch (err) {
      setStatus((prev) => {
        return { ...prev, error: err.message, loading: false };
      });
    } finally {
      setStatus((prev) => {
        return { ...prev, loading: false };
      });
    }
  };

  const registrationHandler = async function (inputData) {
    const loginForm = new FormData();
    loginForm.set("email", inputData.email);
    loginForm.set("password", inputData.password);
    try {
      setStatus((prev) => {
        return { ...prev, loading: true };
      });
      const response = await credentialsRegisterHandler(inputData);
      // checking if account created successfully
      if (response.data?.token && response.status === "success") {
        // if succeed login as created user
        await signInAction(loginForm);
      }
    } catch (error) {
      setStatus((prev) => {
        return { ...prev, error: error.message, loading: false };
      });
    } finally {
      setStatus((prev) => {
        return { ...prev, loading: false };
      });
    }
    // Create a user
    // After success login the user
  };

  // login handler
  const googleSignInHandler = async function () {
    const isSignedIn = await signInWithGoogleAction();
  };

  return (
    <div className="p-8 py-4 h-full w-full">
      <div className="my-4">
        <Image src={BrandLogo} height={50} width={125} alt="brand_logo" />
      </div>
      <div>
        <form
          onSubmit={handleSubmit(isLogin ? loginHandler : registrationHandler)}
          className="flex flex-col gap-2 "
        >
          <div className="py-3 ">
            <Typography variant="h3" color="blue-gray" className="mb-2 ">
              {isLogin ? "Log In" : "Sign Up"}
            </Typography>
            <Typography
              variant="paragraph"
              color="blue-gray"
              className="tracking-wide"
            >
              Discover a better way of traveling with us
            </Typography>
          </div>
          <Button
            onClick={googleSignInHandler}
            className="!bg-senseWhite rounded-none flex items-center justify-center font-medium shadow-none normal-case text-[15px] text-blue-gray-900 tracking-wide"
          >
            <Image
              src={googleLogo}
              width={40}
              height={40}
              alt="google_icon"
              className="mr-3 w-6 h-6"
            />
            Sign in with Google
          </Button>

          <div className=" border-b border-[#2a2a2a6b] relative my-4 flex items-center justify-center">
            <p className=" bg-white rounded-full inline-block px-2 absolute ">
              Or
            </p>
          </div>

          {status.error && (
            <Typography variant="paragraph" className="text-red-800">
              {typeof status.error === "string"
                ? status.error
                : "Something went wrong"}
            </Typography>
          )}
          {/* Form part start */}
          <div className="">
            {!isLogin && (
              <>
                <div className="md:flex justify-between gap-4 items-start">
                  <div className="w-full">
                    <label htmlFor="fullname">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-medium mb-2"
                      >
                        Full Name
                      </Typography>
                    </label>
                    <Input
                      id="fullname"
                      color="gray"
                      size="lg"
                      type="text"
                      name="fullname"
                      {...register("fullname", {
                        required: "Insert your fullname",
                      })}
                      placeholder="Enter your name"
                      className="!w-full placeholder:!opacity-100 placeholder:text-shadeBlack !bg-senseWhite border-none rounded-none "
                      labelProps={{
                        className: "hidden",
                      }}
                    />
                    {errors?.fullname && (
                      <Typography
                        variant="small"
                        className="opacity-90 tracking-wide text-red-600 mt-1"
                      >
                        {errors.fullname?.message}
                      </Typography>
                    )}
                  </div>
                  <div className="w-full">
                    <label htmlFor="username">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-medium md:mt-0 my-2"
                      >
                        Username
                      </Typography>
                    </label>
                    <Input
                      id="username"
                      color="gray"
                      size="lg"
                      type="text"
                      name="username"
                      {...register("username", {
                        required: "Insert your username",
                      })}
                      placeholder="Enter your username"
                      className="!w-full placeholder:!opacity-100 placeholder:text-shadeBlack !bg-senseWhite border-none rounded-none "
                      labelProps={{
                        className: "hidden",
                      }}
                    />
                    {errors?.username && (
                      <Typography
                        variant="small"
                        className="opacity-90 tracking-wide text-red-600 mt-1"
                      >
                        {errors.username?.message}
                      </Typography>
                    )}
                  </div>
                </div>
              </>
            )}

            <label htmlFor="email">
              <Typography
                variant="small"
                color="blue-gray"
                className="block font-medium my-2"
              >
                Email {isLogin ? "or username" : ""}
              </Typography>
            </label>
            <Input
              id="email"
              color="gray"
              size="lg"
              type="text"
              name="email"
              {...register("email", {
                // validating email format using regex
                pattern: isLogin
                  ? null
                  : {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Please enter a valid email address",
                    },
                required: isLogin
                  ? "Insert your e-mail or username"
                  : "Insert your e-mail",
              })}
              placeholder="Enter your e-mail"
              className="!w-full placeholder:!opacity-100 placeholder:text-shadeBlack !bg-senseWhite border-none rounded-none "
              labelProps={{
                className: "hidden",
              }}
            />
            {errors?.email && (
              <Typography
                variant="small"
                className="opacity-90 tracking-wide text-red-600 mt-1"
              >
                {errors.email?.message}
              </Typography>
            )}

            {/* passowrd */}

            <div className=" md:flex items-start gap-4 justify-between">
              <div className=" w-full">
                <label htmlFor="password">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="block font-medium my-2 "
                  >
                    Password
                  </Typography>
                </label>
                <Input
                  id="password"
                  size="lg"
                  {...register("password", {
                    required: "Insert your password",
                    minLength: { value: 8, message: "Password minlength is 8" },
                  })}
                  icon={
                    isPasswordShown ? (
                      <HiOutlineEyeOff
                        onClick={() => setIsPasswordShown(false)}
                        className="w-5 h-5 mr-1 cursor-pointer"
                      />
                    ) : (
                      <HiOutlineEye
                        onClick={() => setIsPasswordShown(true)}
                        className="w-5 h-5 mr-1 cursor-pointer"
                      />
                    )
                  }
                  type={isPasswordShown ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="!w-full placeholder:!opacity-100 placeholder:text-shadeBlack rounded-none border-none !bg-senseWhite "
                  labelProps={{
                    className: "hidden",
                  }}
                />
                {errors?.password && (
                  <Typography
                    variant="small"
                    className="opacity-90 tracking-wide text-red-600 mt-1"
                  >
                    {errors.password?.message}
                  </Typography>
                )}
              </div>

              {!isLogin && (
                <>
                  <div className="w-full">
                    <label htmlFor="confirmPassword">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-medium my-2 "
                      >
                        Confirm Password
                      </Typography>
                    </label>
                    <Input
                      id="confirmPassword"
                      size="lg"
                      {...register("confirmPassword", {
                        required: "Confirm your password",
                        minLength: {
                          value: 8,
                          message: "Password minlength is 8",
                        },
                        validate: (value) => {
                          return (
                            value === getValues("password") ||
                            "Passwords do not match"
                          );
                        },
                      })}
                      icon={
                        isPasswordShown ? (
                          <HiOutlineEyeOff
                            onClick={() => setIsPasswordShown(false)}
                            className="w-5 h-5 mr-1 cursor-pointer"
                          />
                        ) : (
                          <HiOutlineEye
                            onClick={() => setIsPasswordShown(true)}
                            className="w-5 h-5 mr-1 cursor-pointer"
                          />
                        )
                      }
                      type={isPasswordShown ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Password"
                      className="!w-full placeholder:!opacity-100 placeholder:text-shadeBlack rounded-none border-none !bg-senseWhite "
                      labelProps={{
                        className: "hidden",
                      }}
                    />

                    {errors?.confirmPassword && (
                      <Typography
                        variant="small"
                        className="opacity-90 tracking-wide text-red-600 mt-1"
                      >
                        {errors.confirmPassword?.message}
                      </Typography>
                    )}
                  </div>
                </>
              )}
            </div>

            {isLogin && (
              <div className=" mt-1 flex items-center justify-between">
                <Typography
                  color="blue-gray"
                  variant="small"
                  className="flex select-none items-center px-0 gap-2"
                >
                  <input type="checkbox" defaultChecked />
                  Remember me
                </Typography>
                <Button
                  variant="text"
                  className="rounded-none hover:bg-white p-1 my-0 normal-case tracking-wide"
                >
                  <Link
                    color="blue-gray"
                    className="text-sm font-medium tracking-wide "
                    href="/forgot-password"
                  >
                    Forgot password
                  </Link>
                </Button>
              </div>
            )}
          </div>

          <Button
            className="bg-actionBlue mt-2 rounded-none font-medium shadow-none normal-case text-white text-[15px] tracking-wide"
            loading={status.loading}
            type="submit"
          >
            {isLogin ? "Login" : "Sign Up"}
          </Button>

          <div className=" my-2">
            {isLogin ? (
              <Typography color="blue-gray" variant="small">
                Not a member ?{" "}
                <Link
                  className="underline font-medium tracking-wide text-textBlack"
                  href="/signup"
                >
                  Create an account
                </Link>
              </Typography>
            ) : (
              <Typography color="blue-gray" variant="small">
                Already have account ?{" "}
                <Link
                  className="underline font-medium tracking-wide text-textBlack"
                  href="/login"
                >
                  Login
                </Link>
              </Typography>
            )}
          </div>

          <Typography
            variant="small"
            className=" tracking-wide text-shadeBlack text-center mt-2"
          >
            &copy; All right reserved by Dynamic Travel
          </Typography>
        </form>
      </div>
    </div>
  );
}

export default Login;
