import { motion } from "framer-motion";
import {
    BarChart3,
    BrainCircuit,
    Trophy,
    Lightbulb,
    TrendingUp,
    TrendingDown,
} from "lucide-react";

export default function FeaturesSection() {
    return (
        <section id="features" className="features-section">
            <div className="features-container">

                <motion.div
                    className="features-heading"
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span>BUILT FOR BETTER PLANNING</span>

                    <h2>
                        Understand your business.
                        <br />
                        <strong>Plan what comes next.</strong>
                    </h2>

                    <p>
                        FoodVision brings analytics, forecasting, and product
                        insights together in one clear view.
                    </p>
                </motion.div>

                <div className="features-grid">

                    {/* ANALYTICS */}

                    <motion.article
                        className="feature-card"
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -6 }}
                        viewport={{ once: true }}
                    >
                        <div className="feature-top">
                            <div className="feature-icon">
                                <BarChart3 size={21} />
                            </div>

                            <span>ANALYTICS</span>
                        </div>

                        <h3>Understand past performance.</h3>

                        <p>
                            Turn historical sales data into clear demand trends
                            and performance insights.
                        </p>

                        <div className="feature-visual analytics-visual">
                            <div className="analytics-info">
                                <div>
                                    <span>Total Demand</span>
                                    <strong>12,480</strong>
                                </div>

                                <span className="feature-growth">
                                    <TrendingUp size={13} />
                                    8.4%
                                </span>
                            </div>

                            <div className="feature-bars">
                                {[35, 48, 42, 61, 55, 72, 83].map(
                                    (height, index) => (
                                        <motion.span
                                            key={index}
                                            initial={{ height: 0 }}
                                            whileInView={{ height: `${height}%` }}
                                            transition={{
                                                delay: index * 0.07,
                                                duration: 0.5,
                                            }}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    </motion.article>

                    {/* FORECAST */}

                    <motion.article
                        className="feature-card"
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -6 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.08 }}
                    >
                        <div className="feature-top">
                            <div className="feature-icon">
                                <BrainCircuit size={21} />
                            </div>

                            <span>FORECASTING</span>
                        </div>

                        <h3>See future demand earlier.</h3>

                        <p>
                            Generate demand forecasts for the next 3, 6,
                            or 12 months using your historical data.
                        </p>

                        <div className="feature-visual forecast-feature">

                            <div className="forecast-feature-top">
                                <span>Demand</span>

                                <div>
                                    <span>1M</span>
                                    <span>3M</span>
                                    <span className="selected">6M</span>
                                    <span>12M</span>
                                </div>
                            </div>

                            <div className="forecast-feature-chart">
                                {[36, 46, 52, 58].map((height, index) => (
                                    <motion.span
                                        key={`history-${index}`}
                                        className="past"
                                        initial={{ height: 0 }}
                                        whileInView={{ height: `${height}%` }}
                                        transition={{ delay: index * 0.07 }}
                                    />
                                ))}

                                {[67, 77, 89].map((height, index) => (
                                    <motion.span
                                        key={`future-${index}`}
                                        className="future"
                                        initial={{ height: 0 }}
                                        whileInView={{ height: `${height}%` }}
                                        transition={{
                                            delay: 0.35 + index * 0.1,
                                        }}
                                    />
                                ))}
                            </div>

                            <div className="forecast-feature-labels">
                                <span>Historical</span>
                                <strong>Forecast →</strong>
                            </div>

                        </div>
                    </motion.article>

                    {/* RANKING */}

                    <motion.article
                        className="feature-card"
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -6 }}
                        viewport={{ once: true }}
                    >
                        <div className="feature-top">
                            <div className="feature-icon">
                                <Trophy size={21} />
                            </div>

                            <span>PRODUCT RANKING</span>
                        </div>

                        <h3>Know what deserves attention.</h3>

                        <p>
                            Compare predicted product demand and quickly identify
                            your strongest-performing products.
                        </p>

                        <div className="feature-visual ranking-visual">

                            <RankingRow
                                number="01"
                                product="Enak noodle"
                                value="3,840"
                                delay={0}
                            />

                            <RankingRow
                                number="02"
                                product="Micheat salty egg"
                                value="3,120"
                                delay={0.1}
                            />

                            <RankingRow
                                number="03"
                                product="Princle potato chips"
                                value="2,760"
                                delay={0.2}
                                down
                            />

                        </div>
                    </motion.article>

                    {/* INSIGHTS */}

                    <motion.article
                        className="feature-card"
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -6 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.08 }}
                    >
                        <div className="feature-top">
                            <div className="feature-icon">
                                <Lightbulb size={21} />
                            </div>

                            <span>INSIGHTS</span>
                        </div>

                        <h3>Turn numbers into decisions.</h3>

                        <p>
                            Quickly understand your top product, biggest decline,
                            and overall demand direction.
                        </p>

                        <div className="feature-visual insights-visual">

                            <div className="insight-row">
                                <div className="insight-symbol">
                                    <TrendingUp size={15} />
                                </div>

                                <div>
                                    <span>Top Product</span>
                                    <strong>Enak noodle</strong>
                                </div>

                                <small>↑ 18%</small>
                            </div>

                            <div className="insight-row">
                                <div className="insight-symbol">
                                    <TrendingDown size={15} />
                                </div>

                                <div>
                                    <span>Biggest Decline</span>
                                    <strong>Micheat salty egg</strong>
                                </div>

                                <small className="decline">
                                    ↓ 7%
                                </small>
                            </div>

                            <div className="overall-insight">
                                <Lightbulb size={15} />

                                Overall demand is expected to increase.
                            </div>

                        </div>
                    </motion.article>

                </div>
            </div>
        </section>
    );
}

function RankingRow({
    number,
    product,
    value,
    delay,
    down = false,
}) {
    return (
        <motion.div
            className="ranking-row"
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay }}
            whileHover={{ x: 5 }}
        >
            <span className="ranking-number">{number}</span>

            <strong>{product}</strong>

            <span>{value}</span>

            <span className={down ? "rank-down" : "rank-up"}>
                {down ? "↓" : "↑"}
            </span>
        </motion.div>
    );
}