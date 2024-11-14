"use client";
import { MapContextProvider } from "./MapContext";
import CreateTour from "./CreateTour";
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
