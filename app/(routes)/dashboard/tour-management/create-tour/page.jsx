"use client";
import { MapContextProvider } from "@/app/components/dashboard/create_Tour/MapContext";
import CreateTour from "@/app/components/dashboard/create_Tour/CreateTour";
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
