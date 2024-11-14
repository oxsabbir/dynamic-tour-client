import dynamic from "next/dynamic";
const TourMain = dynamic(() => import("@/app/components/Tour/TourMain"), {
  ssr: false,
});
// import TourMain from "@/app/components/tour/TourMain";
export default function page() {
  return (
    <>
      <div className="">
        <TourMain />
      </div>
    </>
  );
}
