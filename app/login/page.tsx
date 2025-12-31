"use client";

import Link from "next/link";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!res || res.error) {
      setError("Invalid email or password");
      return;
    }

    const session = await getSession();

    if (session?.user?.role === "ADMIN") {
      router.push("/admin/dashboard");
    } else {
      router.push("/hr");
    }
    router.refresh();
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handlesubmit}>
        <input
          type="email"
          placeholder="abc@text.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="passwrod"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p>
          Don't have account? <Link href={"/signup"}>Sign-up</Link>
        </p>
        <button
          type="submit"
          className="bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white p-2 border rounded flex items-center justify-center hover:cursor-pointer"
        >
          submit
        </button>
      </form>
    </div>
  );
}