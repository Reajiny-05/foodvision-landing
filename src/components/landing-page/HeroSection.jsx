import { useState } from "react";
import { ArrowRight, BarChart3, Sparkles, Upload } from "lucide-react";
import { motion } from "framer-motion";

const forecastData = {
    1: {
        previous: "4,120",
        forecast: "4,680",
        growth: "+13.6%",
        bars: [38, 45, 42, 51, 48, 60, 68],
    },

    3: {
        previous: "12,480",
        forecast: "14,210",
        growth: "+13.9%",
        bars: [35, 43, 47, 52, 61, 72, 84],
    },

    6: {
        previous: "24,930",
        forecast: "29,460",
        growth: "+18.2%",
        bars: [32, 38, 44, 49, 57, 68, 88],
    },

    12: {
        previous: "49,860",
        forecast: "58,920",
        growth: "+18.2%",
        bars: [30, 37, 43, 50, 58, 70, 90],
    },
};


const heroContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.3, // gap between each item
            delayChildren: 0.3,   // wait before animation starts
        },
    },
};

const heroPopUp = {
    hidden: {
        opacity: 0,
        y: 35,
        scale: 0.94,
    },

    visible: {
        opacity: 1,
        y: 0,
        scale: 1,

        transition: {
            duration: 0.8, // slower movement
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export default function HeroSection() {
    const [months, setMonths] = useState(3);

    const current = forecastData[months];

    const scrollToRequest = () => {
        document.getElementById("request-access")?.scrollIntoView({
            behavior: "smooth",
        });
    };

    const scrollToHow = () => {
        document.getElementById("how-it-works")?.scrollIntoView({
            behavior: "smooth",
        });
    };

    return (
        <section id="home" className="hero-section">
            <div className="hero-container">

                {/* LEFT SIDE */}
                <motion.div
                    className="hero-content"
                    variants={heroContainer}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        className="hero-badge"
                        variants={heroPopUp}
                    >
                        <Sparkles size={16} />
                        AI-powered demand intelligence
                    </motion.div>

                    <motion.h1 variants={heroPopUp}>
                        Turn your sales data into

                        <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                delay: 0.55,
                                type: "spring",
                                stiffness: 160,
                                damping: 14,
                            }}
                        >
                            {" "}smarter decisions.
                        </motion.span>
                    </motion.h1>

                    <motion.p
                        className="hero-description"
                        variants={heroPopUp}
                    >
                        FoodVision helps food manufacturers understand historical
                        performance, forecast future demand, and identify the products
                        that matter most.
                    </motion.p>

                    <motion.div
                        className="hero-actions"
                        variants={heroPopUp}
                    >
                        <button
                            className="hero-primary-btn"
                            onClick={scrollToRequest}
                        >
                            Request Access
                            <ArrowRight size={18} />
                        </button>

                        <button
                            className="hero-secondary-btn"
                            onClick={scrollToHow}
                        >
                            See How It Works
                        </button>
                    </motion.div>

                    <motion.div
                        className="hero-mini-features"
                        variants={heroPopUp}
                    >
                        <span>
                            <Upload size={16} />
                            CSV & Excel
                        </span>

                        <span>
                            <BarChart3 size={16} />
                            Automatic Analytics
                        </span>

                        <span>
                            <Sparkles size={16} />
                            AI Forecasting
                        </span>
                    </motion.div>
                </motion.div>

                {/* RIGHT SIDE */}
                <motion.div
                    className="hero-visual"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                >
                    <div className="hero-dashboard">

                        {/* Dashboard Header */}
                        <div className="dashboard-header">
                            <div>
                                <span className="dashboard-label">
                                    DEMAND OVERVIEW
                                </span>

                                <h3>Forecast Analysis</h3>
                            </div>

                            <div className="dashboard-live">
                                <span></span>
                                AI Forecast
                            </div>
                        </div>

                        {/* Month Toggle */}
                        <div className="forecast-toggle">
                            {[1, 3, 6, 12].map((month) => (
                                <button
                                    key={month}
                                    className={months === month ? "active" : ""}
                                    onClick={() => setMonths(month)}
                                >
                                    {month}M
                                </button>
                            ))}
                        </div>

                        {/* KPI */}
                        <div className="hero-kpis">
                            <div className="hero-kpi-card">
                                <span>Previous demand</span>
                                <strong>{current.previous}</strong>
                                <small>Historical period</small>
                            </div>

                            <div className="hero-kpi-card forecast">
                                <span>Forecast demand</span>
                                <strong>{current.forecast}</strong>
                                <small>{current.growth} expected</small>
                            </div>
                        </div>

                        {/* Chart */}
                        <div className="hero-chart">
                            <div className="chart-grid-line line-one"></div>
                            <div className="chart-grid-line line-two"></div>
                            <div className="chart-grid-line line-three"></div>

                            <div className="chart-bars">
                                {current.bars.map((height, index) => {
                                    const forecast = index >= 4;

                                    return (
                                        <motion.div
                                            key={`${months}-${index}`}
                                            className={`chart-bar ${forecast ? "forecast-bar" : ""
                                                }`}
                                            initial={{ height: 0 }}
                                            animate={{ height: `${height}%` }}
                                            transition={{
                                                duration: 0.55,
                                                delay: index * 0.06,
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        </div>

                        <div className="chart-footer">
                            <span>Historical</span>

                            <span className="forecast-label">
                                Forecast →
                            </span>
                        </div>

                        {/* Floating Insight */}
                        <motion.div
                            className="floating-insight"
                            animate={{ y: [0, -7, 0] }}
                            transition={{
                                duration: 3.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <span>Top Product</span>
                            <strong>Product A</strong>
                            <small>↑ Highest predicted demand</small>
                        </motion.div>

                    </div>
                </motion.div>

            </div>
        </section>
    );
}