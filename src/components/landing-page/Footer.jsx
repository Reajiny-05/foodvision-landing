import {
    Mail,
    ArrowUpRight,
    ArrowUp,
} from "lucide-react";

export default function Footer() {
    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <footer id="contact" className="footer">
            <div className="footer-container">

                <div className="footer-main">

                    {/* BRAND */}
                    <div className="footer-brand">
                        <button
                            className="footer-logo"
                            onClick={scrollToTop}
                            type="button"
                        >
                            <img
                                src="/foodvision-logo.png"
                                alt="FoodVision"
                            />
                            <span>FoodVision</span>
                        </button>

                        <p>
                            Turn historical sales data into clearer demand
                            insights and smarter business decisions.
                        </p>

                        <a
                            href="mailto:foodvision.kh@gmail.com"
                            className="footer-email"
                        >
                            <Mail size={16} />
                            foodvision.kh@gmail.com
                            <ArrowUpRight size={14} />
                        </a>
                    </div>


                    {/* PRODUCT */}
                    <div className="footer-column">
                        <span>PRODUCT</span>

                        <button onClick={() => scrollToSection("features")}>
                            Features
                        </button>

                        <button onClick={() => scrollToSection("how-it-works")}>
                            How It Works
                        </button>

                        <button onClick={() => scrollToSection("pricing")}>
                            Pricing
                        </button>
                    </div>


                    {/* ACCESS */}
                    <div className="footer-column">
                        <span>GET STARTED</span>

                        <button onClick={() => scrollToSection("request-access")}>
                            Request Access
                        </button>

                        <a href="mailto:foodvision.business@gmail.com">
                            Contact Us
                        </a>
                    </div>


                    {/* CTA */}
                    <div className="footer-cta">
                        <span>READY TO GET STARTED?</span>

                        <h3>
                            See what your data
                            can tell you.
                        </h3>

                        <button
                            onClick={() => scrollToSection("request-access")}
                        >
                            Request Access
                            <ArrowUpRight size={16} />
                        </button>
                    </div>

                </div>


                <div className="footer-divider" />


                <div className="footer-bottom">
                    <p>
                        © {new Date().getFullYear()} FoodVision.
                        All rights reserved.
                    </p>

                    <p className="footer-bottom-message">
                        Demand intelligence for smarter planning.
                    </p>

                    <button
                        className="footer-top-button"
                        onClick={scrollToTop}
                        aria-label="Back to top"
                    >
                        <ArrowUp size={16} />
                    </button>
                </div>

            </div>
        </footer>
    );
}