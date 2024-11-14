"use client";
import CreateTour from "@/app/components/dashboard/create_Tour/CreateTour";
import { MapContextProvider } from "@/app/components/dashboard/create_Tour/MapContext";

export default function UpdateTour({ tourData }) {
  return (
    <>
      <div>
        <MapContextProvider>
          <CreateTour tourData={tourData} actionType={"update"} />
        </MapContextProvider>
      </div>
    </>
  );
}
