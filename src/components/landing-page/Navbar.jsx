import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const dashboardUrl = (
        import.meta.env.VITE_DASHBOARD_URL ||
        "https://foodvision-cambodia-internship.onrender.com"
    ).replace(/\/$/, "");

    const scrollToSection = (id) => {
        const section = document.getElementById(id);

        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }

        setMenuOpen(false);
    };

    return (
        <header className="navbar">
            <div className="navbar-container">

                {/* Logo */}
                <button
                    className="navbar-brand"
                    onClick={() => scrollToSection("home")}
                >
                    <img
                        src="/foodvision-logo.png"
                        alt="FoodVision"
                        className="navbar-logo"
                    />

                    <span>FoodVision</span>
                </button>

                {/* Desktop navigation */}
                <nav className="navbar-links">
                    <button onClick={() => scrollToSection("features")}>
                        Features
                    </button>

                    <button onClick={() => scrollToSection("how-it-works")}>
                        How It Works
                    </button>

                    <button onClick={() => scrollToSection("pricing")}>
                        Pricing
                    </button>

                    <button onClick={() => scrollToSection("contact")}>
                        Contact
                    </button>
                </nav>

                {/* CTA */}
                <div className="navbar-actions">
                    <a
                        className="dashboard-login-btn"
                        href={dashboardUrl + "/login"}
                    >
                        Log in
                    </a>

                    <button
                        className="request-access-btn"
                        onClick={() => scrollToSection("request-access")}
                    >
                        Request Access
                    </button>

                    <button
                        className="mobile-menu-btn"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Open navigation menu"
                    >
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>

            </div>

            {/* Mobile navigation */}
            {menuOpen && (
                <nav className="mobile-menu">
                    <button onClick={() => scrollToSection("features")}>
                        Features
                    </button>

                    <button onClick={() => scrollToSection("how-it-works")}>
                        How It Works
                    </button>

                    <button onClick={() => scrollToSection("pricing")}>
                        Pricing
                    </button>

                    <button onClick={() => scrollToSection("contact")}>
                        Contact
                    </button>

                    <a
                        className="mobile-login-btn"
                        href={dashboardUrl + "/login"}
                        onClick={() => setMenuOpen(false)}
                    >
                        Log in
                    </a>

                    <button
                        className="mobile-request-btn"
                        onClick={() => scrollToSection("request-access")}
                    >
                        Request Access
                    </button>
                </nav>
            )}
        </header>
    );
}