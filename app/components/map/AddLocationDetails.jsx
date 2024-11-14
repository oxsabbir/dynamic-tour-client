"use client";
import { Button, Typography } from "@/app/ui/materialExport";
import { Input, Textarea } from "@material-tailwind/react";
import { useMapContext } from "../dashboard/createTour/MapContext";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddLocationDetails({
  address,
  cancelMaker,
  position,
  setPosition,
}) {
  const { state, dispatch } = useMapContext();
  const {
    register: registerDetails,
    handleSubmit: handleSubmitDetails,
    formState: { errors: errorsDetails },
    watch,
  } = useForm();
  // the main submit fucntion that getting the input data from RHF
  const locationSubmitHandler = function (inputData) {
    const locationData = {
      coordinates: [position[1], position[0]],
      ...inputData,
      dayNumber: +inputData.dayNumber,
    };
    dispatch({ type: "ADD_NEW_LOCATION", payload: locationData });
    setPosition(null);
  };
  // generating the callback function for calling it when the button get clicked
  const submitFormCB = handleSubmitDetails(locationSubmitHandler);
  // Add button triggering the function the stop the Propagation and getting clicked on the map again
  const locationFromHandler = function (event) {
    event.stopPropagation();
    // calling it later when the button clicked
    submitFormCB();
  };

  return (
    <>
      <div className="p-0 w-full ">
        <form>
          <div className=" w-full flex flex-col gap-2 ">
            <div className=" flex flex-col gap-2  ">
              <label htmlFor="adress">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="block font-medium "
                >
                  Location Address
                </Typography>
              </label>
              <Input
                id="adress"
                color="gray"
                size="lg"
                defaultValue={address}
                {...registerDetails("address", {
                  required: "Insert the address",
                })}
                type="text"
                placeholder="Enter tour adress"
                className="!w-full placeholder:!opacity-100 placeholder:text-shadeBlack !bg-senseWhite border-none rounded-none "
                labelProps={{
                  className: "hidden",
                }}
              />
              {errorsDetails?.address && (
                <Typography
                  variant="small"
                  className="opacity-90 tracking-wide text-red-600 mt-1"
                >
                  {errorsDetails.address?.message}
                </Typography>
              )}
            </div>
            <div className=" flex flex-col gap-2  ">
              <label htmlFor="ldescription">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="block font-medium "
                >
                  Location Description
                </Typography>
              </label>
              <Textarea
                id="ldescription"
                color="gray"
                size="lg"
                {...registerDetails("description", {
                  required: "Insert the description",
                })}
                type="text"
                placeholder="Enter tour ldescription"
                className="!w-full placeholder:!opacity-100 placeholder:text-shadeBlack !bg-senseWhite border-none rounded-none "
                labelProps={{
                  className: "hidden",
                }}
              />
              {errorsDetails?.description && (
                <Typography
                  variant="small"
                  className="opacity-90 tracking-wide text-red-600 mt-1"
                >
                  {errorsDetails.description?.message}
                </Typography>
              )}
            </div>
            <div className=" flex flex-col gap-2  ">
              <label htmlFor="day_no">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="block font-medium "
                >
                  Day number
                </Typography>
              </label>
              <Input
                id="day_no"
                color="gray"
                size="lg"
                {...registerDetails("dayNumber", {
                  required: "Insert the day number",
                })}
                type="number"
                min={1}
                max={100}
                placeholder="Enter the day no"
                className="!w-full placeholder:!opacity-100 placeholder:text-shadeBlack !bg-senseWhite border-none rounded-none "
                labelProps={{
                  className: "hidden",
                }}
              />
              {errorsDetails?.dayNumber && (
                <Typography
                  variant="small"
                  className="opacity-90 tracking-wide text-red-600 mt-1"
                >
                  {errorsDetails.dayNumber?.message}
                </Typography>
              )}
            </div>
            <div className=" flex flex-col gap-2  ">
              <label htmlFor="locationImage">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="block font-medium "
                >
                  Location Image
                </Typography>
              </label>
              <input
                id="locationImage"
                color="gray"
                {...registerDetails("images", {
                  validate: {
                    minFile: (image) =>
                      (image && image.length >= 1) ||
                      "Please select at least 1 image.",
                    maxFile: (image) =>
                      (image && image.length <= 3) ||
                      "You can only select up to 3 image.",
                  },
                })}
                size="lg"
                type="file"
                accept="image/*"
                // multiple
              />
              {errorsDetails?.images && (
                <Typography
                  variant="small"
                  className="opacity-90 tracking-wide text-red-600 mt-1"
                >
                  {errorsDetails.images?.message}
                </Typography>
              )}
            </div>
            <div className=" mt-3 flex justify-between itec">
              <Button onClick={locationFromHandler} size="sm">
                Add Location
              </Button>
              <Button onClick={cancelMaker} size="sm">
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
