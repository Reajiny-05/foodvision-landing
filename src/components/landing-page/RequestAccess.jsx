import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight,
    Building2,
    CheckCircle2,
    Mail,
    User,
    MessageSquare,
    Sparkles,
} from "lucide-react";

export default function RequestAccessSection() {
    const [selectedPlan, setSelectedPlan] = useState("Growth");
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        company: "",
        plan: "Growth",
        message: "",
    });

    // Receive selected plan from PricingSection
    useEffect(() => {
        const handlePlanSelected = (event) => {
            const plan = event.detail;

            setSelectedPlan(plan);

            setFormData((previous) => ({
                ...previous,
                plan,
            }));
        };

        window.addEventListener(
            "foodvision-plan-selected",
            handlePlanSelected
        );

        return () => {
            window.removeEventListener(
                "foodvision-plan-selected",
                handlePlanSelected
            );
        };
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        if (name === "plan") {
            setSelectedPlan(value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        setSubmitError("");

        try {
            const response = await fetch("/api/request-access", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json().catch(() => ({}));

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || "Unable to submit your request. Please try again."
                );
            }

            setSubmitted(true);
        } catch (error) {
            console.error("Request access error:", error);
            setSubmitError(error.message || "Unable to submit your request. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const resetForm = () => {
        setSubmitted(false);

        setFormData({
            fullName: "",
            email: "",
            company: "",
            plan: selectedPlan,
            message: "",
        });
    };

    return (
        <section
            id="request-access"
            className="request-access-section"
        >
            <div className="request-access-container">

                {/* LEFT */}

                <motion.div
                    className="request-access-content"
                    initial={{ opacity: 0, x: -25 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="request-eyebrow">
                        REQUEST ACCESS
                    </span>

                    <h2>
                        Ready to see what your
                        <strong> data can tell you?</strong>
                    </h2>

                    <p className="request-description">
                        Tell us a little about you and your business.
                        We'll review your request and help you get started
                        with FoodVision.
                    </p>

                    <div className="request-benefits">

                        <div>
                            <span className="request-check">
                                <CheckCircle2 size={18} />
                            </span>

                            <div>
                                <strong>Private workspace</strong>
                                <p>
                                    Your company data stays inside your
                                    authenticated FoodVision account.
                                </p>
                            </div>
                        </div>

                        <div>
                            <span className="request-check">
                                <CheckCircle2 size={18} />
                            </span>

                            <div>
                                <strong>Guided onboarding</strong>
                                <p>
                                    We'll help you prepare your first dataset
                                    and understand the platform.
                                </p>
                            </div>
                        </div>

                        <div>
                            <span className="request-check">
                                <CheckCircle2 size={18} />
                            </span>

                            <div>
                                <strong>Built for business data</strong>
                                <p>
                                    Upload sales data and turn it into analytics,
                                    forecasts, rankings, and insights.
                                </p>
                            </div>
                        </div>

                    </div>

                    <div className="request-security-note">
                        <Sparkles size={16} />

                        <span>
                            Submitting this form does not automatically create
                            a dashboard account.
                        </span>
                    </div>
                </motion.div>


                {/* RIGHT / FORM */}

                <motion.div
                    className="request-form-wrapper"
                    initial={{ opacity: 0, x: 25 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >

                    <AnimatePresence mode="wait">

                        {!submitted ? (
                            <motion.form
                                key="request-form"
                                className="request-form"
                                onSubmit={handleSubmit}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{
                                    opacity: 0,
                                    y: -10,
                                }}
                            >
                                <div className="request-form-header">
                                    <span>ACCESS REQUEST</span>

                                    <h3>Tell us about your business</h3>

                                    <p>
                                        We'll use this information to understand
                                        how FoodVision can support you.
                                    </p>
                                </div>


                                {/* NAME + EMAIL */}

                                <div className="request-form-row">

                                    <div className="request-field">
                                        <label htmlFor="fullName">
                                            Full name
                                        </label>

                                        <div className="request-input">
                                            <User size={16} />

                                            <input
                                                id="fullName"
                                                name="fullName"
                                                type="text"
                                                placeholder="Your name"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>


                                    <div className="request-field">
                                        <label htmlFor="email">
                                            Work email
                                        </label>

                                        <div className="request-input">
                                            <Mail size={16} />

                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="you@company.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                </div>


                                {/* COMPANY */}

                                <div className="request-field">
                                    <label htmlFor="company">
                                        Company / Business name
                                    </label>

                                    <div className="request-input">
                                        <Building2 size={16} />

                                        <input
                                            id="company"
                                            name="company"
                                            type="text"
                                            placeholder="Your business name"
                                            value={formData.company}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>


                                {/* PLAN */}

                                <div className="request-field">
                                    <label htmlFor="plan">
                                        Interested plan
                                    </label>

                                    <select
                                        id="plan"
                                        name="plan"
                                        value={formData.plan}
                                        onChange={handleChange}
                                        className="request-select"
                                    >
                                        <option value="Starter">
                                            Starter
                                        </option>

                                        <option value="Growth">
                                            Growth
                                        </option>

                                        <option value="Business">
                                            Business
                                        </option>
                                    </select>
                                </div>


                                {/* MESSAGE */}

                                <div className="request-field">
                                    <label htmlFor="message">
                                        Tell us what you need
                                        <span> Optional</span>
                                    </label>

                                    <div className="request-textarea">
                                        <MessageSquare size={16} />

                                        <textarea
                                            id="message"
                                            name="message"
                                            rows="4"
                                            placeholder="For example: We want to forecast demand for our top products..."
                                            value={formData.message}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>


                                {/* BUTTON */}

                                {submitError && (
                                    <p className="request-submit-error" role="alert">
                                        {submitError}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    className="request-submit"
                                    disabled={submitting}
                                >
                                    {submitting ? "Submitting..." : "Submit Request"}

                                    {!submitting && <ArrowRight size={17} />}
                                </button>

                                <p className="request-form-footer">
                                    We'll only use your information to respond
                                    to your FoodVision access request.
                                </p>

                            </motion.form>
                        ) : (

                            /* SUCCESS */

                            <motion.div
                                key="request-success"
                                className="request-success"
                                initial={{
                                    opacity: 0,
                                    scale: 0.97,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                            >
                                <motion.div
                                    className="success-icon"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 220,
                                        delay: 0.1,
                                    }}
                                >
                                    <CheckCircle2 size={32} />
                                </motion.div>

                                <span>REQUEST RECEIVED</span>

                                <h3>Thank you, {formData.fullName}.</h3>

                                <p>
                                    Your request for the{" "}
                                    <strong>{formData.plan}</strong> plan has
                                    been prepared.
                                </p>

                                <div className="success-email">
                                    <Mail size={16} />

                                    {formData.email}
                                </div>

                                <small>
                                    The FoodVision team will review your request and contact you at this email.
                                    Submitting the form does not create a dashboard account.
                                </small>

                                <button
                                    type="button"
                                    onClick={resetForm}
                                >
                                    Send another request
                                </button>

                            </motion.div>
                        )}

                    </AnimatePresence>

                </motion.div>
            </div>
        </section>
    );
}