"use client";
import CreateTour from "@/app/components/dashboard/createTour/CreateTour";
import { MapContextProvider } from "@/app/components/dashboard/createTour/MapContext";
export default function page({ pageType }) {
  return (
    <>
      <div>
        <MapContextProvider>
          <CreateTour />
        </MapContextProvider>
      </div>
    </>
  );
}
