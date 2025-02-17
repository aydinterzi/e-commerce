import { SignIn } from "@clerk/nextjs";

export const metadata = {
  title: "Sign In | My E-Commerce",
};

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        appearance={{
          elements: {
            formButtonPrimary:
              "bg-blue-500 hover:bg-blue-600 text-white font-semibold",
          },
        }}
      />
    </div>
  );
}
