const pageCopy = {
  login: {
    icon: "user",
    heading: "Welcome back to Pulp Ayurveda",
    sub: "Sign in to manage orders, saved details, and faster checkout.",
    backHref: "/",
    backText: "Back to home",
    switchText: "New here?",
    switchHref: "/register",
    switchLink: "Create an account",
    terms: "By signing in, you agree to our wellness terms.",
  },
  register: {
    icon: "addUser",
    heading: "Create your Pulp account",
    sub: "Join us for Ayurvedic rituals, offers, and smoother checkout.",
    backHref: "/login",
    backText: "Back to sign in",
    switchText: "Already have an account?",
    switchHref: "/login",
    switchLink: "Sign in",
    terms: "By creating an account, you agree to our wellness terms.",
  },
  forgot: {
    icon: "lock",
    heading: "Forgot your password?",
    sub: "No worries. Enter your email and we will send reset instructions.",
    backHref: "/login",
    backText: "Back to sign in",
    switchText: "Remember your password?",
    switchHref: "/login",
    switchLink: "Sign in",
    terms: "By continuing, you agree to our wellness terms.",
  },
};

function AuthIcon({ type }) {
  if (type === "addUser") {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M19 8v6" /><path d="M22 11h-6" /></svg>;
  }
  if (type === "lock") {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>;
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
}

export default function AuthPageShell({ mode, success, children }) {
  const copy = pageCopy[mode] || pageCopy.login;

  return (
    <section className="pulp-auth-page">
      <div className="pulp-auth-card">
        <div className="pulp-auth-titlebar">
          <a className="pulp-auth-back" href={copy.backHref} title={copy.backText} aria-label={copy.backText}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
            {copy.backText}
          </a>
          <a href="/" aria-label="Pulp Ayurveda home"><img src="/img/faviicon.png" alt="Pulp Ayurveda" /></a>
        </div>
        <div className="pulp-auth-split">
          <div className="pulp-auth-form-panel">
            <div className="pulp-auth-icon" aria-hidden="true"><AuthIcon type={copy.icon} /></div>
            <h1 className="pulp-auth-heading">{copy.heading}</h1>
            <p className="pulp-auth-sub">{copy.sub}</p>
            {children}
            {success && <p className="pulp-auth-success">{success}</p>}
            <p className="pulp-auth-switch">{copy.switchText} <a href={copy.switchHref}>{copy.switchLink}</a></p>
            <p className="pulp-auth-terms">{copy.terms} <a href="/">Learn more</a>.</p>
          </div>
          <div className="pulp-auth-media-panel">
            <img className="pulp-auth-hero-img" src="/img/authimg2.jpeg" alt="Pulp Ayurveda wellness ritual" />
            <div className="pulp-auth-offer">
              <span className="pulp-auth-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4" /><path d="m6.4 4.6 2.8 2.8" /><path d="M2 12h4" /><path d="m6.4 19.4 2.8-2.8" /><path d="M12 18v4" /><path d="m17.6 19.4-2.8-2.8" /><path d="M22 12h-4" /><path d="m17.6 4.6-2.8 2.8" /></svg>
                Ayurvedic care
              </span>
              <p>Get <strong>daily wellness essentials</strong> crafted for simple, consistent routines.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}