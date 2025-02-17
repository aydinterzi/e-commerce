import { SignUp } from "@clerk/nextjs";

export const metadata = {
  title: "Sign Up | My E-Commerce",
};

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        appearance={{
          elements: {
            formButtonPrimary:
              "bg-green-500 hover:bg-green-600 text-white font-semibold",
          },
        }}
      />
    </div>
  );
}
