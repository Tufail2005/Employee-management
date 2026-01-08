"use client";

import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!res || res.error) {
      setError("Invalid email or password");

      setTimeout(() => {
        setError("");
        setEmail("");
        setPassword("");
        setIsSubmitting(false);
      }, 5000);

      return;
    }

    const session = await getSession();

    if (session?.user?.role === "Admin") {
      router.push("/dashboard");
    } else {
      router.push("/employeedashboard");
    }
    router.refresh();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="py-20 px-10 border border-amber-200 rounded-3xl items-center flex flex-col">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handlesubmit} className="flex flex-col gap-5 w-80">
          <input
            type="email"
            placeholder="abc@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white p-2 border rounded flex items-center justify-center hover:cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
                        5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 
                        5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        {error && <p className="text-red-500 mt-3">{error}</p>}
      </div>
    </div>
  );
}
