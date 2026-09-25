import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
    Upload,
    Sparkles,
    BarChart3,
    BrainCircuit,
    TrendingUp,
    FileSpreadsheet,
    Check,
    ArrowUpRight,
} from "lucide-react";


/* =========================
   STEPS
========================= */

const steps = [
    {
        id: 0,
        number: "01",
        title: "Upload",
        short: "Bring your data",
        description:
            "Upload your existing sales data in CSV or Excel format.",
        icon: Upload,
    },

    {
        id: 1,
        number: "02",
        title: "Prepare",
        short: "We prepare it",
        description:
            "FoodVision detects the important columns, cleans your data, and organizes it for analysis.",
        icon: Sparkles,
    },

    {
        id: 2,
        number: "03",
        title: "Analyze",
        short: "Understand performance",
        description:
            "Explore historical demand, product performance, trends, and changes automatically.",
        icon: BarChart3,
    },

    {
        id: 3,
        number: "04",
        title: "Forecast",
        short: "See what's next",
        description:
            "XGBoost learns from historical patterns and generates future demand forecasts.",
        icon: BrainCircuit,
    },

    {
        id: 4,
        number: "05",
        title: "Decide",
        short: "Plan smarter",
        description:
            "Use forecasts, rankings, and insights to support production and inventory planning.",
        icon: TrendingUp,
    },
];


/* =========================
   MAIN COMPONENT
========================= */

export default function HowItWorks() {
    const [activeStep, setActiveStep] = useState(0);

    // Used to pause automatic movement
    // while the user is interacting.
    const [isPaused, setIsPaused] = useState(false);

    const active = steps[activeStep];


    /* =========================
       AUTO PLAY
       Change every 3 seconds
    ========================= */

    useEffect(() => {
        if (isPaused) return;

        const timer = setTimeout(() => {
            setActiveStep((currentStep) => {
                if (currentStep === steps.length - 1) {
                    return 0;
                }

                return currentStep + 1;
            });
        }, 2500);

        return () => clearTimeout(timer);
    }, [activeStep, isPaused]);


    /* =========================
       USER INTERACTION
    ========================= */

    const handleStepEnter = (stepId) => {
        setIsPaused(true);
        setActiveStep(stepId);
    };

    const handleStepLeave = () => {
        setIsPaused(false);
    };

    const handleStepClick = (stepId) => {
        setActiveStep(stepId);

        /*
          For mobile:
          start a fresh 3-second timer
          after selecting the step.
        */
        setIsPaused(false);
    };


    return (
        <section
            id="how-it-works"
            className="how-interactive-section"
        >
            <div className="how-interactive-container">

                {/* =========================
            HEADING
        ========================= */}

                <motion.div
                    className="how-heading"
                    initial={{
                        opacity: 0,
                        y: 25,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.7,
                    }}
                    viewport={{
                        once: true,
                    }}
                >
                    <span>HOW IT WORKS</span>

                    <h2>
                        Your data goes in.
                        <br />

                        <strong>
                            Clarity comes out.
                        </strong>
                    </h2>

                    <p>
                        Explore each step to see how FoodVision turns
                        sales data into future demand insights.
                    </p>
                </motion.div>


                {/* =========================
            STEP NAVIGATION
        ========================= */}

                <div className="how-step-navigation">

                    <div className="how-navigation-line" />

                    {steps.map((step) => {
                        const Icon = step.icon;

                        const selected =
                            activeStep === step.id;

                        return (
                            <button
                                key={step.id}
                                type="button"
                                className={`how-nav-step ${selected ? "active" : ""
                                    }`}

                                /* DESKTOP HOVER */
                                onMouseEnter={() =>
                                    handleStepEnter(step.id)
                                }

                                onMouseLeave={
                                    handleStepLeave
                                }

                                /* KEYBOARD */
                                onFocus={() =>
                                    handleStepEnter(step.id)
                                }

                                onBlur={
                                    handleStepLeave
                                }

                                /* MOBILE + CLICK */
                                onClick={() =>
                                    handleStepClick(step.id)
                                }
                            >
                                <div className="how-nav-icon">
                                    <Icon size={20} />
                                </div>

                                <span>
                                    {step.number}
                                </span>

                                <strong>
                                    {step.title}
                                </strong>
                            </button>
                        );
                    })}
                </div>


                {/* =========================
            DEMO PANEL
        ========================= */}

                <div
                    className="how-demo-panel"

                    /*
                      Also pause if user moves
                      inside the demonstration itself.
                    */
                    onMouseEnter={() =>
                        setIsPaused(true)
                    }

                    onMouseLeave={() =>
                        setIsPaused(false)
                    }
                >

                    {/* =========================
              LEFT TEXT
          ========================= */}

                    <AnimatePresence mode="wait">

                        <motion.div
                            key={`copy-${active.id}`}
                            className="how-demo-copy"

                            initial={{
                                opacity: 0,
                                x: -18,
                            }}

                            animate={{
                                opacity: 1,
                                x: 0,
                            }}

                            exit={{
                                opacity: 0,
                                x: 18,
                            }}

                            transition={{
                                duration: 0.35,
                            }}
                        >

                            <span className="how-demo-number">
                                STEP {active.number}
                            </span>

                            <h3>
                                {active.title}
                            </h3>

                            <h4>
                                {active.short}
                            </h4>

                            <p>
                                {active.description}
                            </p>


                            {/* =========================
                  3 SECOND PROGRESS
              ========================= */}

                            <div className="how-progress">

                                {steps.map((step) => {

                                    const completed =
                                        step.id < activeStep;

                                    const current =
                                        step.id === activeStep;

                                    return (
                                        <span
                                            key={step.id}
                                            className={`
                        how-progress-item
                        ${completed
                                                    ? "completed"
                                                    : ""
                                                }
                        ${current
                                                    ? "current"
                                                    : ""
                                                }
                      `}
                                        >

                                            {current &&
                                                !isPaused && (

                                                    <motion.span
                                                        key={`progress-${activeStep}`}
                                                        className="how-progress-fill"

                                                        initial={{
                                                            width: "0%",
                                                        }}

                                                        animate={{
                                                            width: "100%",
                                                        }}

                                                        transition={{
                                                            duration: 3,
                                                            ease: "linear",
                                                        }}
                                                    />

                                                )}

                                        </span>
                                    );
                                })}

                            </div>

                            <small>
                                {activeStep + 1} of{" "}
                                {steps.length}
                            </small>

                        </motion.div>

                    </AnimatePresence>


                    {/* =========================
              RIGHT VISUAL
          ========================= */}

                    <div className="how-demo-visual">

                        <AnimatePresence mode="wait">

                            <motion.div
                                key={`visual-${activeStep}`}
                                className="visual-content"

                                initial={{
                                    opacity: 0,
                                    y: 15,
                                    scale: 0.98,
                                }}

                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                }}

                                exit={{
                                    opacity: 0,
                                    y: -10,
                                    scale: 0.98,
                                }}

                                transition={{
                                    duration: 0.4,
                                }}
                            >

                                {activeStep === 0 && (
                                    <UploadVisual />
                                )}

                                {activeStep === 1 && (
                                    <PrepareVisual />
                                )}

                                {activeStep === 2 && (
                                    <AnalyzeVisual />
                                )}

                                {activeStep === 3 && (
                                    <ForecastVisual />
                                )}

                                {activeStep === 4 && (
                                    <DecisionVisual />
                                )}

                            </motion.div>

                        </AnimatePresence>

                    </div>

                </div>

            </div>
        </section>
    );
}


/* =====================================================
   STEP 01 — UPLOAD
===================================================== */

function UploadVisual() {
    return (
        <div className="upload-demo">

            <motion.div
                className="upload-file-icon"

                initial={{
                    opacity: 0,
                    y: -15,
                    scale: 0.9,
                }}

                animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                }}

                transition={{
                    duration: 0.5,
                }}
            >
                <FileSpreadsheet size={34} />
            </motion.div>


            <motion.h4
                initial={{
                    opacity: 0,
                }}

                animate={{
                    opacity: 1,
                }}

                transition={{
                    delay: 0.2,
                }}
            >
                sales_data.xlsx
            </motion.h4>


            <span>
                2,840 sales records
            </span>


            <div className="upload-progress">

                <motion.div
                    initial={{
                        width: 0,
                    }}

                    animate={{
                        width: "100%",
                    }}

                    transition={{
                        duration: 1.4,
                        delay: 0.2,
                        ease: "easeInOut",
                    }}
                />

            </div>


            <motion.div
                className="upload-complete"

                initial={{
                    opacity: 0,
                    y: 5,
                }}

                animate={{
                    opacity: 1,
                    y: 0,
                }}

                transition={{
                    delay: 1.5,
                }}
            >
                <Check size={16} />

                Upload complete
            </motion.div>

        </div>
    );
}


/* =====================================================
   STEP 02 — PREPARE
===================================================== */

function PrepareVisual() {
    const fields = [
        "Date",
        "Product",
        "Demand",
    ];

    return (
        <div className="prepare-demo">

            <span className="visual-small-label">
                COLUMN DETECTION
            </span>


            {fields.map((field, index) => (

                <motion.div
                    className="detected-field"
                    key={field}

                    initial={{
                        opacity: 0,
                        x: -20,
                    }}

                    animate={{
                        opacity: 1,
                        x: 0,
                    }}

                    transition={{
                        delay: 0.2 + index * 0.35,
                        duration: 0.45,
                    }}
                >

                    <span>
                        {field}
                    </span>

                    <div>
                        <Check size={14} />
                        Detected
                    </div>

                </motion.div>

            ))}


            <motion.div
                className="cleaning-status"

                initial={{
                    opacity: 0,
                    y: 8,
                }}

                animate={{
                    opacity: 1,
                    y: 0,
                }}

                transition={{
                    delay: 1.4,
                }}
            >
                <Sparkles size={16} />

                Cleaning & aggregating records...
            </motion.div>

        </div>
    );
}


/* =====================================================
   STEP 03 — ANALYZE
===================================================== */

function AnalyzeVisual() {

    const bars = [
        36,
        49,
        42,
        61,
        55,
        70,
        65,
        79,
    ];

    return (
        <div className="analyze-demo">

            <motion.div
                className="visual-header"

                initial={{
                    opacity: 0,
                    y: -10,
                }}

                animate={{
                    opacity: 1,
                    y: 0,
                }}
            >

                <div>
                    <span>
                        Historical Demand
                    </span>

                    <strong>
                        12,480
                    </strong>
                </div>

                <span className="positive-change">
                    +8.4%
                </span>

            </motion.div>


            <div className="interactive-bars">

                {bars.map((height, index) => (

                    <motion.div
                        key={index}

                        initial={{
                            height: 0,
                        }}

                        animate={{
                            height: `${height}%`,
                        }}

                        transition={{
                            duration: 0.65,
                            delay: 0.15 + index * 0.1,
                            ease: "easeOut",
                        }}
                    />

                ))}

            </div>


            <motion.div
                className="chart-bottom-label"

                initial={{
                    opacity: 0,
                }}

                animate={{
                    opacity: 1,
                }}

                transition={{
                    delay: 1.1,
                }}
            >
                Historical sales performance
            </motion.div>

        </div>
    );
}


/* =====================================================
   STEP 04 — FORECAST
===================================================== */

function ForecastVisual() {

    const history = [
        32,
        42,
        38,
        53,
    ];

    const forecast = [
        61,
        72,
        86,
    ];

    return (
        <div className="forecast-demo">

            <motion.div
                className="visual-header"

                initial={{
                    opacity: 0,
                    y: -10,
                }}

                animate={{
                    opacity: 1,
                    y: 0,
                }}
            >

                <div>
                    <span>
                        Demand Forecast
                    </span>
                    <div className="forecast-horizons">
                        <span>6M</span>
                    </div>

                    <strong>
                        14,210
                    </strong>
                </div>

                <span className="positive-change">
                    +13.9%
                </span>

            </motion.div>


            <div className="interactive-bars forecast-chart-bars">

                {/* HISTORICAL */}

                {history.map((height, index) => (

                    <motion.div
                        className="history-bar"
                        key={`history-${index}`}

                        initial={{
                            height: 0,
                        }}

                        animate={{
                            height: `${height}%`,
                        }}

                        transition={{
                            duration: 0.6,
                            delay: 0.1 + index * 0.1,
                        }}
                    />

                ))}


                {/* FORECAST */}

                {forecast.map((height, index) => (

                    <motion.div
                        className="future-bar"
                        key={`forecast-${index}`}

                        initial={{
                            height: 0,
                        }}

                        animate={{
                            height: `${height}%`,
                        }}

                        transition={{
                            duration: 0.7,
                            delay: 0.7 + index * 0.15,
                        }}
                    />

                ))}

            </div>


            <motion.div
                className="forecast-legend"

                initial={{
                    opacity: 0,
                }}

                animate={{
                    opacity: 1,
                }}

                transition={{
                    delay: 1.3,
                }}
            >

                <span>
                    Historical
                </span>

                <strong>
                    Forecast →
                </strong>

            </motion.div>

        </div>
    );
}


/* =====================================================
   STEP 05 — DECIDE
===================================================== */

function DecisionVisual() {
    return (
        <div className="decision-demo">

            <motion.div
                className="decision-main-card"

                initial={{
                    opacity: 0,
                    y: 15,
                }}

                animate={{
                    opacity: 1,
                    y: 0,
                }}

                transition={{
                    duration: 0.5,
                }}
            >

                <span>
                    Top predicted product
                </span>

                <strong>
                    Enak Noodles
                </strong>

                <div>
                    Demand expected to increase

                    <ArrowUpRight size={16} />
                </div>

            </motion.div>


            <div className="decision-mini-grid">

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 15,
                    }}

                    animate={{
                        opacity: 1,
                        y: 0,
                    }}

                    transition={{
                        delay: 0.4,
                    }}
                >
                    <span>
                        Forecast
                    </span>

                    <strong>
                        14,210
                    </strong>
                </motion.div>


                <motion.div
                    initial={{
                        opacity: 0,
                        y: 15,
                    }}

                    animate={{
                        opacity: 1,
                        y: 0,
                    }}

                    transition={{
                        delay: 0.7,
                    }}
                >
                    <span>
                        Direction
                    </span>

                    <strong>
                        ↑ Growth
                    </strong>
                </motion.div>

            </div>


            <motion.div
                className="decision-insight"

                initial={{
                    opacity: 0,
                    y: 10,
                }}

                animate={{
                    opacity: 1,
                    y: 0,
                }}

                transition={{
                    delay: 1,
                }}
            >
                <Sparkles size={16} />

                Consider preparing additional inventory
                for Product A.
            </motion.div>

        </div>
    );
}