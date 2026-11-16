
import { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setSuccess(false);

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password
    ) {
      setMessage("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            password: formData.password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Registration failed.");
        return;
      }

      console.log("Registration API Response:", data);

      setSuccess(true);
      setMessage(data.message || "Registration successful!");

      setFormData({
        name: "",
        email: "",
        password: ""
      });

    } catch (error) {
      console.error("Registration API Error:", error);
      setMessage("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">

      {/* Left Showcase */}
      <section className="login-showcase">

        <a href="/login" className="brand">
          <span className="brand-mark">T</span>
          <span>
            TAiM<span className="brand-light"> Connect</span>
          </span>
        </a>

        <div className="showcase-copy">
          <span className="eyebrow">
            A better way to work together
          </span>

          <h1>Good things happen when we connect.</h1>

          <p>
            Bring your team, ideas, and important work
            together in one place.
          </p>
        </div>

        <div className="showcase-footer">
          <span className="status-dot"></span>
          Your workspace, ready when you are
        </div>

      </section>

      {/* Right Registration Panel */}
      <section className="login-panel">

        <a href="/login" className="mobile-brand">
          <span className="brand-mark">T</span>
          <span>
            TAiM<span className="brand-light"> Connect</span>
          </span>
        </a>

        <div className="login-card">

          <span className="eyebrow login-eyebrow">
            GET STARTED
          </span>

          <h2>Create your account</h2>

          <div className="login-intro">
            <p>
              Enter your details to create your TAiM Connect account.
            </p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>

            <label htmlFor="name">Full name</label>

            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              autoComplete="name"
              required
            />

            <label htmlFor="email" style={{ marginTop: "21px" }}>
              Email address
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
              required
            />

            <label htmlFor="password" style={{ marginTop: "21px" }}>
              Password
            </label>

            <div className="password-input-wrap">
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                autoComplete="new-password"
                required
              />
            </div>

            <button
              type="submit"
              className="sign-in-button"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            {message && (
              <p
                className="form-message"
                role="status"
                style={{
                  color: success ? "#15803d" : "#b42318"
                }}
              >
                {message}
              </p>
            )}

          </form>

          <p className="signup-prompt">
            Already have an account? <a href="/login">Sign in</a>
          </p>

        </div>

        <p className="legal-note">
          © 2026 TAiM Connect
        </p>

      </section>
    </div>
  );
}

export default Register;
