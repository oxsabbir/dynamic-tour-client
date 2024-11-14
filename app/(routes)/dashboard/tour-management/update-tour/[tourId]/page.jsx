import { getTour } from "@/app/libs/getTour";
import UpdateTour from "@/app/components/dashboard/create_Tour/UpdateTour";

export default async function page({ params }) {
  const tourId = params?.tourId;
  const updatableTour = await getTour(tourId);
  return (
    <>
      <UpdateTour tourData={updatableTour?.tour} />
    </>
  );
}
