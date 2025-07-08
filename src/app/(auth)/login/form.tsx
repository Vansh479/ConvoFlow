"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/auth/auth.actions";
import { useFormState } from "react-dom";
import { LoginSchema, LoginSchemaType } from "@/lib/auth/validation";

export default function LoginForm() {
  const [errorMessage, formAction] = useFormState(login as any, null);

  return (
    <form action={formAction} className="flex flex-col gap-1 [&>input]:text-xl">
      <h1 className="font-medium text-3xl mb-2">Sign in</h1>

      <Input name="username" placeholder="Username" required />
      <Input name="password" placeholder="Password" type="password" required />

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <Button variant="default" type="submit" className="text-xl">
        Sign in
      </Button>
    </form>
  );
}