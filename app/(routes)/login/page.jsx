import AuthForm from "@/app/components/account/AuthForm";
export const metadata = {
  title: "Dynamic Travel - Login to get access",
  description: "Login to Dynamic Travel for better exeperience",
};

export default function page() {
  return (
    <>
      <AuthForm />
    </>
  );
}
