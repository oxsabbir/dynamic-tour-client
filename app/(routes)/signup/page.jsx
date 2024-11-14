import AuthForm from "@/app/components/account/AuthForm";

export const metadata = {
  title: "Dynamic Travel - Sign up to open account",
  description: "Sign up to Dynamic Travel for better exeperience",
};

export default function page() {
  return (
    <>
      <AuthForm />
    </>
  );
}
