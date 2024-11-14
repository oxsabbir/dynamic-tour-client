import SideNav from "@/app/components/dashboard/SideNav";
import MobileMenu from "@/app/components/dashboard/MobileMenu";
import ProfileMenu from "@/app/components/header/ProfileMenu";
import LargeHeading from "@/app/components/dashboard/LargeHeading";

export default function layout({ children }) {
  return (
    <>
      <div className="bg-offWhite w-full min-h-screen md:flex">
        <div className="hidden md:block h-full">
          <SideNav />
        </div>
        <div className=" md:hidden ">
          <MobileMenu />
        </div>
        <div className=" p-3 py-0 md:py-3  w-full h-screen overflow-auto">
          <div className=" hidden lg:flex items-center border-b mb-2 justify-between py-1 ">
            <LargeHeading />
            <ProfileMenu />
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
