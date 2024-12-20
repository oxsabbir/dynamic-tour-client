import { getUserByUserName } from "@/app/libs/userApi";
import { auth } from "@/auth";
import Nav from "@/app/components/Header/Nav";
import Container from "@/app/components/Extras/Container";
import { Typography, Avatar, Button } from "@/app/ui/materialExport";
import ProfileTour from "./ProfileTour";
import profileGradient from "../../../../public/image/profileGradient.jpg";
import UpdateProfile from "./UpadateProfile";
import BecomeGuide from "./BecomeGuide";
import { getUserBookingCount } from "@/app/libs/bookingApi";

export default async function page({ params }) {
  const userName = params.userName;
  const session = await auth();

  let userData = await getUserByUserName(userName);
  const bookingCount = await getUserBookingCount(userName);
  console.log(bookingCount);

  if (session?.user?.email) {
    userData.email = session?.user?.email;
  }

  return (
    <>
      <div>
        <div className=" relative">
          <div
            style={{
              backgroundImage: `url("${profileGradient.src}")`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "bottom",
            }}
            className=" h-[250px]"
          >
            <Nav />
          </div>
          <div className=" absolute top-[55%] left-[50%] -translate-x-[50%] w-full">
            <Container>
              <div className="w-full flex flex-col pb-4 lg:flex-row lg:justify-start gap-2 items-center justify-center">
                <Avatar
                  src={userData?.profileImage}
                  alt="profileImage"
                  width={250}
                  variant="rounded"
                  height={250}
                  className="lg:w-[265px] lg:h-[265px] h-[240px] w-[240px] object-cover  border-[8px] border-[#b6b6b64c] rounded-[45px]"
                />
                <div className=" self-end p-2 lg:p-5 gap-4 flex flex-col lg:flex-row items-center justify-between w-full">
                  <div className=" text-center lg:text-left">
                    <Typography
                      variant="lead"
                      className=" text-textBlack tracking-wider font-bold text-3xl mb-3  flex flex-col-reverse lg:flex-row items-center"
                    >
                      <span>{userData?.fullName}</span>{" "}
                      <span className="  bg-gradient-to-r from-red-500 to-orange-500 lg:my-0 my-2 lg:ml-3 rounded-xl text-sm font-normal px-2.5 py-0.5  text-white">
                        {userData?.role === "user"
                          ? "Explorer"
                          : userData?.role}
                      </span>
                      {session?.user?.userName === userData?.userName && (
                        <UpdateProfile userData={userData} />
                      )}
                    </Typography>
                    <Typography
                      variant="paragraph"
                      className="tracking-wide text-offGray  max-w-[300px]"
                    >
                      {userData?.bio}
                    </Typography>
                  </div>
                  <div className=" flex flex-col  items-center lg:items-start lg:flex-row ">
                    <div className=" lg:mt-4">
                      <BecomeGuide
                        readyForGuide={userData?.readyForGuide}
                        role={userData?.role}
                      />
                    </div>
                    <div className="flex gap-3  items-center lg:p-2 pb-0">
                      <div className=" p-2">
                        <Typography className=" text-offBlack font-medium tracking-wide text-base">
                          Completed
                        </Typography>
                        <Typography className=" font-extrabold text-4xl text-offBlack mt-2 tracking-wider">
                          {bookingCount?.completed || 0}
                        </Typography>
                      </div>
                      <div className=" p-2">
                        <Typography className=" text-offBlack font-medium tracking-wide text-base">
                          Upcoming
                        </Typography>
                        <Typography className=" font-extrabold text-4xl text-offBlack mt-2 tracking-wider">
                          {bookingCount?.upcoming || 0}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="min-h-[300px] ">
                <ProfileTour userName={userName} />
              </div>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}
