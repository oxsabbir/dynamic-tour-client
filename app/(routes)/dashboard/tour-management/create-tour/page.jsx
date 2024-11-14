"use client";
import { MapContextProvider } from "@/app/components/dashboard/newTour/MapContext";
import CreateTour from "@/app/components/dashboard/newTour/CreateTour";
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
