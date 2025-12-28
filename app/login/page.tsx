// "use client";

// import Link from "next/link";
// import { signIn, getSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { useState } from "react";

// export default function LoginPage() {
//   const router = useRouter;
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handlesubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const res = await signIn("credentials", {
//       email,
//       password,
//       redirect: false,
//     });

//     if (!res || res.error) {
//       setError("Invalid email or password");
//       return;
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handlesubmit}>
//         <input
//           type="email"
//           placeholder="abc@text.com"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="email"
//           placeholder="abc@text.com"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <p>
//           Don't have account? <Link href={"/signup"}>Sign-up</Link>
//         </p>
//         <button
//           type="submit"
//           className="bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white p-2 border rounded flex items-center justify-center hover:cursor-pointer"
//         >
//           submit
//         </button>
//       </form>
//     </div>
//   );
// }
