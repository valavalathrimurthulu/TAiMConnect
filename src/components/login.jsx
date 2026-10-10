import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
      setMessage('Please enter your email and password.');
      return;
    }

    setMessage('Signing you in...');
    navigate('/dashboard');
  }

  return (
    <main className="login-page">
      <section className="login-showcase" aria-label="login TAiM Connect">
        <Link className="brand" to="/login" aria-label="TAiM Connect home">
          <span className="brand-mark" aria-hidden="true">T</span>
          <span>TAiM<span className="brand-light">Connect</span></span>
        </Link>

        <div className="showcase-copy">
          <span className="eyebrow">A better way to work together</span>
          <h1>Good things happen when we connect.</h1>
          <p>
            Bring your team, ideas, and important work together in one place.
          </p>
        </div>

        <div className="showcase-footer">
          <span className="status-dot" aria-hidden="true" />
          Your workspace, ready when you are
        </div>
      </section>

      <section className="login-panel" aria-labelledby="login-title">
        <div className="login-card">
          <div className="mobile-brand">
            <span className="brand-mark" aria-hidden="true">T</span>
            <span>TAiM<span className="brand-light">Connect</span></span>
          </div>
          <span className="eyebrow login-eyebrow">Welcome back</span>
          <h2 id="login-title">Sign in to your account</h2>
          <p className="login-intro">Enter your details to access your workspace.</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
              required
            />

            <div className="password-label-row">
              <label htmlFor="password">Password</label>
              <button
                className="text-button"
                type="button"
                onClick={() => setMessage('Please contact your workspace administrator to reset your password.')}
              >
                Forgot password?
              </button>
            </div>
            <div className="password-input-wrap">
              <input
                id="password"
                name="password"
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
              <button
                className="password-toggle"
                type="button"
                onClick={() => setPasswordVisible((visible) => !visible)}
                aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                aria-pressed={passwordVisible}
              >
                {passwordVisible ? 'Hide' : 'Show'}
              </button>
            </div>

            <div className="form-options">
              <label className="remember-option" htmlFor="remember">
                <input id="remember" name="remember" type="checkbox" />
                <span>Remember me</span>
              </label>
            </div>

            <button className="sign-in-button" type="submit">Sign in</button>
            <p className="form-message" role="status" aria-live="polite">{message}</p>
          </form>

          <p className="signup-prompt">
            New to TAiM Connect? Contact your workspace administrator.
          </p>
        </div>
        <p className="legal-note">© {new Date().getFullYear()} TAiM Connect</p>
      </section>
    </main>
  );
}

export default Login;
