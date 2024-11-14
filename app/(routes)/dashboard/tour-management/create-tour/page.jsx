"use client";
import { MapContextProvider } from "@/app/components/dashboard/createTour/MapContext";
import CreateTour from "@/app/components/dashboard/createTour/CreateTour";
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
