import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout"; // Ignoring this path
import { useAuth } from "../../context/auth"; // Ignoring this path

const Register = () => {
  // All your existing state and logic are preserved
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signUp(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to create an account. Please try again.");
      console.error("Registration Error:", err);
    }
    setLoading(false);
  };

  return (
    <AuthLayout>
      {/* This outer div replaces the StyledWrapper.
        It centers the card on the screen.
      */}
      <div className="flex justify-center items-center min-h-screen">
        
        {/* This is the ".card" element.
          - 'group' is added to enable the inner card's hover effect.
          - 'bg-gradient-to-tr' creates the gradient border.
          - 'rounded-[22px]' matches the original border-radius.
          - 'hover:shadow-[...]' is the arbitrary glow effect.
        */}
        <div className="group rounded-[22px] bg-gray-900 transition-all duration-500 hover:bg-gradient-to-tr hover:from-green-400 hover:to-blue-600 hover:shadow-[0_0_30px_1px_rgba(0,255,117,0.3)]">
          
          {/* This is the ".card2" element.
            - 'bg-neutral-900' is the Tailwind class for #171717.
            - 'rounded-2xl' matches the original inner radius.
            - 'group-hover:scale-98' creates the press-in effect on hover.
          */}
          <div className="rounded-2xl bg-neutral-900 transition-all duration-200 group-hover:scale-98">
            
            {/* This is the ".form" element.
              - All logic (onSubmit) is preserved.
              - Width is set to 'w-[400px]' as requested.
            */}
            <form
              className="flex w-[400px] flex-col gap-2.5 px-8 pb-2"
              onSubmit={handleSubmit}
            >
              {/* Heading */}
              <p className="my-8 text-center text-xl text-white">
                Create an Account
              </p>
              <p className="-mt-6 mb-4 text-center text-sm text-neutral-400">
                Get started with LocalInsights AI.
              </p>

              {/* Error Message */}
              {error && (
                <p className="rounded-md bg-red-500/10 p-3 text-center text-sm text-red-400">
                  {error}
                </p>
              )}

              {/* Full Name Field */}
              <div className="flex items-center gap-2 rounded-full bg-neutral-900 p-2.5 shadow-[inset_2px_5px_10px_rgb(5,5,5)]">
                <svg
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  height={16}
                  width={16}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                >
                  <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
                </svg>
                <input
                  type="text"
                  className="w-full border-none bg-transparent text-base text-neutral-300 outline-none focus:outline-none focus:ring-0"
                  placeholder="John Doe"
                  autoComplete="off"
                />
              </div>

              {/* Email Field */}
              <div className="flex items-center gap-2 rounded-full bg-neutral-900 p-2.5 shadow-[inset_2px_5px_10px_rgb(5,5,5)]">
                <svg
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  height={16}
                  width={16}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                >
                  <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
                </svg>
                <input
                  type="email"
                  className="w-full border-none bg-transparent text-base text-neutral-300 outline-none focus:outline-none focus:ring-0"
                  placeholder="you@example.com"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Field */}
              <div className="flex items-center gap-2 rounded-full bg-neutral-900 p-2.5 shadow-[inset_2px_5px_10px_rgb(5,5,5)]">
                <svg
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  height={16}
                  width={16}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                >
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                </svg>
                <input
                  type="password"
                  className="w-full border-none bg-transparent text-base text-neutral-300 outline-none focus:outline-none focus:ring-0"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Confirm Password Field */}
              <div className="flex items-center gap-2 rounded-full bg-neutral-900 p-2.5 shadow-[inset_2px_5px_10px_rgb(5,5,5)]">
                <svg
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  height={16}
                  width={16}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                >
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                </svg>
                <input
                  type="password"
                  className="w-full border-none bg-transparent text-base text-neutral-300 outline-none focus:outline-none focus:ring-0"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {/* Terms Checkbox */}
              <div className="mt-2 flex items-center text-sm">
                <label
                  htmlFor="terms"
                  className="flex cursor-pointer items-center gap-1.5 text-neutral-300"
                >
                  <input
                    type="checkbox"
                    id="terms"
                    className="cursor-pointer"
                    required
                  />
                  I agree to the{" "}
                  <span className="font-bold text-green-400">
                    Terms & Conditions
                  </span>
                </label>
              </div>

              {/* Register Button */}
              <div className="mt-10 flex justify-center">
                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-md border-none bg-neutral-800 py-2 text-white transition duration-300 ease-in-out hover:enabled:bg-neutral-950 disabled:cursor-not-allowed disabled:bg-neutral-900 disabled:text-neutral-600"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Register"}
                </button>
              </div>

              {/* Login Button */}
              <button
                type="button"
                className="mb-12 mt-4 w-full cursor-pointer rounded-md border-none bg-neutral-800 py-2 text-white transition duration-300 ease-in-out hover:bg-red-600"
                onClick={() => navigate("/login")}
              >
                Already have an account? Log In
              </button>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
