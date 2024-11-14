"use client";
import { usePathname } from "next/navigation";
import Login from "@/app/components/account/Login";
import authImage from "@/public/image/auth_form.png";

export function AuthForm() {
  const pathName = usePathname();
  return (
    <>
      <div className="w-full min-h-screen flex items-center justify-center loginGradient">
        <div className="flex w-full h-full md:rounded-xl md:h-fit rounded-none md:w-[95%] xl:w-[85%] 2xl:w-[75%] shadow-xl bg-white">
          <div
            className="w-2/3 2xl:w-[60%] hidden md:block bg-cover bg-center bg-no-repeat rounded-tl-xl rounded-bl-xl"
            style={{ backgroundImage: `url('${authImage.src}')` }}
          ></div>

          <div className=" w-full 2xl:w-[40%] md:w-2/3 flex items-center">
            {pathName === "/signup" && <Login pathName={pathName} />}
            {pathName === "/login" && <Login pathName={pathName} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthForm;
