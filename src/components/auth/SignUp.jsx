"use client";

import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { signupUser } from "@/redux/slices/authSlice";

export default function SignUp() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(
      signupUser({ name, phoneNumber, email, password })
    );

    if (res.meta.requestStatus === "fulfilled") {
      const token = res.payload?.token;
      if (token) {
        Cookies.set("token", token, { expires: 7 });
      }

      toast.success("Signup successful!");
      router.push("/account");
    } else {
      toast.error(res.payload || "Signup failed!");
    }
  };

  return (
    
    <div className="container d-flex align-items-center justify-content-center min-vh-100 my-5 py-5">
      <div className="w-100" style={{ maxWidth: 450 }}>
        <div className="card p-4 shadow-sm">
          <h3 className="text-start fw-bold">Sign Up</h3>
          <p className="text-muted text-small text-start mb-4">
            Create your account for free to list your company and connect with India’s entrepreneurs.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3 position-relative">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="position-absolute top-50 end-0 translate-bottom-y me-3 text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            {error && <div className="text-danger mb-2">{error}</div>}

            <div className="d-grid mb-3">
              <button
                type="submit"
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </div>

            <p className="text-center mb-0">
              Already have an account? <Link href="/signin">Sign In</Link>
            </p>
            <p className="text-muted text-small text-start mb-4">
              Already have an account? Sign in and continue your journey.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
