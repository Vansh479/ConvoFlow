
import Link from "next/link";
import LoginForm from "./form";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-950">
      <div className="max-w-md w-full border border-border p-8 rounded-2xl bg-neutral-900/50">
        <LoginForm />
        <p className="mt-4 text-sm text-center text-gray-400">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}