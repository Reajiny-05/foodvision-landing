import { motion } from "framer-motion";
import {
    Check,
    ArrowRight,
    Sparkles,
    Building2,
    Rocket,
} from "lucide-react";

const plans = [
    {
        name: "Starter",
        description: "For small teams beginning with demand analytics.",
        price: "$19",
        period: "/ month",
        icon: Rocket,
        popular: false,
        features: [
            "Historical data analytics",
            "1-month demand forecast",
            "Product performance insights",
            "CSV & Excel upload",
            "Basic downloadable report",
        ],
    },
    {
        name: "Growth",
        description: "For growing businesses that need deeper planning insights.",
        price: "$39",
        period: "/ month",
        icon: Sparkles,
        popular: false,
        features: [
            "Everything in Starter",
            "1, 3 & 6 month forecasting",
            "Top 10 product ranking",
            "Advanced insight summary",
            "Historical vs forecast comparison",
            "Advanced downloadable reports",
        ],
    },
    {
        name: "Business",
        description: "For organizations that need more data and team access.",
        price: "Custom",
        period: "",
        icon: Building2,
        popular: false,
        features: [
            "Everything in Growth",
            "Higher data capacity",
            "Multiple team members",
            "Priority support",
            "Business onboarding",
            "Custom requirements",
        ],
    },
];

export default function PricingSection() {
    const requestPlan = (plan) => {
        const section = document.getElementById("request-access");

        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }

        // We will use this later when building the request form.
        window.dispatchEvent(
            new CustomEvent("foodvision-plan-selected", {
                detail: plan,
            })
        );
    };

    return (
        <section id="pricing" className="pricing-section">
            <div className="pricing-container">

                <motion.div
                    className="pricing-heading"
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span>PRICING</span>

                    <h2>
                        Choose the plan that
                        <strong> fits your growth.</strong>
                    </h2>

                    <p>
                        Start with the tools you need today and scale your
                        FoodVision access as your business grows.
                    </p>
                </motion.div>

                <div className="pricing-grid">
                    {plans.map((plan, index) => {
                        const Icon = plan.icon;

                        return (
                            <motion.article
                                key={plan.name}
                                className={`pricing-card ${plan.popular ? "pricing-popular" : ""
                                    }`}
                                initial={{
                                    opacity: 0,
                                    y: 30,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                whileHover={{
                                    y: -7,
                                }}
                                viewport={{
                                    once: true,
                                }}
                                transition={{
                                    delay: index * 0.1,
                                    duration: 0.45,
                                }}
                            >

                                <div className="pricing-icon">
                                    <Icon size={22} />
                                </div>

                                <h3>{plan.name}</h3>

                                <p className="pricing-description">
                                    {plan.description}
                                </p>

                                <div className="pricing-price">
                                    <strong>{plan.price}</strong>

                                    {plan.period && (
                                        <span>{plan.period}</span>
                                    )}
                                </div>

                                <div className="pricing-divider" />

                                <span className="pricing-includes">
                                    WHAT'S INCLUDED
                                </span>

                                <ul>
                                    {plan.features.map((feature) => (
                                        <li key={feature}>
                                            <span className="pricing-check">
                                                <Check size={13} />
                                            </span>

                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    type="button"
                                    className={
                                        plan.popular
                                            ? "pricing-button primary"
                                            : "pricing-button"
                                    }
                                    onClick={() => requestPlan(plan.name)}
                                >
                                    {plan.name === "Business"
                                        ? "Contact Us"
                                        : "Request Access"}

                                    <ArrowRight size={16} />
                                </button>
                            </motion.article>
                        );
                    })}
                </div>

                <motion.p
                    className="pricing-note"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    Need something different? Tell us about your business
                    requirements when requesting access.
                </motion.p>

            </div>
        </section>
    );
}