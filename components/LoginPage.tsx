"use client";
import { assets } from "@/public/assets/asset";
import { login, verifyToken } from "@/utils/actions/userAuth.action";
import { emailValidationSchema } from "@/utils/zodvalidation/form-validation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [tokenPart, setTokenPart] = useState(false);
  const [token, setToken] = useState<string[]>(Array(6).fill(""));

  const tokenValue = token.join("");

  const updateTokenDigit = (index: number, value: string) => {
    const nextValue = value.replace(/\D/g, "").slice(-1);

    setToken((current) => {
      const updated = [...current];
      updated[index] = nextValue;
      return updated;
    });
  };

  const handleLogin = async (event?: React.FormEvent) => {
    //Check the email and proceed with login or signup
    event?.preventDefault();

    try {
      setLoading(true);
      const emailCheck = emailValidationSchema.safeParse({ email: email });
      if (!emailCheck.success) {
        toast.error("Please enter a valid email address");
        return;
      }

      const formData = new FormData();
      formData.append("email", email.trim());

      const loginUser = await login(formData);

      if (loginUser?.error) {
        toast.error("something went wrong with signing in");
        return;
      }

      setToken(Array(6).fill(""));
      setTokenPart(true);
      toast.success("Check your email for the verification code");
    } catch (error) {
      console.error("Something went wrong. Please try again later.", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyToken = async (event?: React.FormEvent) => {
    event?.preventDefault();

    if (tokenValue.length !== 6) {
      toast.error("Enter the 6-digit token sent to your email");
      return;
    }

    try {
      setVerifying(true);
      const formData = new FormData();
      formData.append("email", email.trim());
      formData.append("token", tokenValue);

      const result = await verifyToken(formData);

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Login verified");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Token verification failed", error);
      toast.error("Unable to verify token right now");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <section className="px-3 py-8 lg:px-16 lg:py-12">
      <div className="mx-auto grid min-h-[620px] max-w-6xl overflow-hidden rounded-[32px] border border-primary/12 bg-white lg:grid-cols-[1.02fr_0.98fr]">
        <div className="relative hidden min-h-[280px] flex-col justify-end overflow-hidden rounded-[28px] bg-primary p-8 text-white lg:flex lg:min-h-full lg:p-10">
          <Image
            src={assets.loginImage}
            alt="Login visual"
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="flex items-center justify-center px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
          {tokenPart ? (
            <div className="w-full max-w-md">
              <div className="space-y-3 text-center lg:text-left">
                <h2 className="text-4xl font-extrabold tracking-tight text-banner">
                  Enter the code sent to your email
                </h2>
                <p className="text-sm leading-7 text-foreground/65 sm:text-base">
                  We sent a 6-digit token to{" "}
                  <span className="font-semibold text-banner">{email}</span>.
                </p>
              </div>

              <form className="mt-10 space-y-6" onSubmit={handleVerifyToken}>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                  {token.map((digit, index) => (
                    <input
                      key={index}
                      value={digit}
                      onChange={(event) =>
                        updateTokenDigit(index, event.target.value)
                      }
                      inputMode="numeric"
                      maxLength={1}
                      aria-label={`Token digit ${index + 1}`}
                      className="h-14 rounded-2xl border border-primary/15  text-center text-xl font-bold text-banner outline-none transition-colors focus:border-primary"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  className="h-14 w-full rounded-2xl bg-primary text-base font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {verifying ? "Verifying..." : "Verify Token"}
                </button>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setTokenPart(false);
                      setToken(Array(6).fill(""));
                    }}
                    className="text-sm font-medium text-foreground/65 underline underline-offset-4"
                  >
                    Change email
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLogin()}
                    className="text-sm font-semibold text-primary underline underline-offset-4"
                  >
                    Resend code
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="w-full max-w-md">
              <div className="space-y-3 text-center lg:text-left">
                <h2 className="text-4xl font-extrabold tracking-tight text-banner">
                  Sign In
                </h2>
                <p className="text-sm leading-7 text-foreground/65 sm:text-base">
                  No password needed. Enter your email and continue with your
                  secure sign-in flow.
                </p>
              </div>

              <form className="mt-10 space-y-6" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold tracking-[0.18em] text-foreground/50"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="youremail@gmail.com"
                    className="h-14 w-full rounded-2xl border border-banner/12 bg-[#fbfbfb] px-5 text-base text-banner outline-none transition-colors placeholder:text-foreground/30 focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="h-14 w-full rounded-2xl bg-primary text-base font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
