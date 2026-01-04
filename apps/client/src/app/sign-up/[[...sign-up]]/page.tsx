import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex-center mt-16">
      <SignUp />;
    </div>
  );
}
