"use client";
import { MapContextProvider } from "@/app/components/dashboard/create/MapContext";
import CreateTour from "@/app/components/dashboard/create/CreateTour";
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
