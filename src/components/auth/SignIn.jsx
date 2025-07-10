"use client";

import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { signinUser } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next"; // ✅ cookies-next used
import toast from "react-hot-toast";


export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(signinUser({ email, password }));

    if (res.meta.requestStatus === "fulfilled") {
      const { token, user } = res.payload;

      const options = {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      };

      if (token) {
        setCookie("token", token, options);
      }

      if (user) {
        setCookie("user", JSON.stringify(user), options);
        setCookie("userId", user._id, options);
        setCookie("userRole", user.role || "user", options);
        setCookie("userName", user.name, options);
      }

      toast.success("Login successful!");
      router.push("/account");
    } else {
      toast.error(res.payload || "Login failed!");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="w-100" style={{ maxWidth: 400 }}>
        <div className="card p-4 shadow-sm">
          <h3 className="text-start fw-bold">Sign In</h3>
          <p className="text-muted text-small text-start mb-4">
            Sign in to share your startup journey, update your profile, and connect with entrepreneurs across India.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3 position-relative">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <span
                className="position-absolute top-50 end-0 translate-middle-y me-3 text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            {error && <div className="text-danger mb-2">{error}</div>}

            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </div>

            <p className="text-center mb-0">
              Don&apos;t have an account? <Link href="/signup">Sign Up</Link>
              <p className="text-muted text-small text-start mt-4">
                Don’t have an account yet? Sign up now and join India’s most inspiring startup community.
              </p>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
