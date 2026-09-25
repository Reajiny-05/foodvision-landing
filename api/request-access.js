export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed",
        });
    }

    try {
        const body = req.body && typeof req.body === "object" ? req.body : {};
        const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
        const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
        const company = typeof body.company === "string" ? body.company.trim() : "";
        const plan = typeof body.plan === "string" ? body.plan : "";
        const message = typeof body.message === "string" ? body.message.trim() : "";

        if (!fullName || !email || !company || !plan) {
            return res.status(400).json({
                success: false,
                message: "Please complete all required fields.",
            });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address.",
            });
        }

        if (fullName.length > 100 || email.length > 150 || company.length > 150 || message.length > 1000) {
            return res.status(400).json({
                success: false,
                message: "One or more fields are too long.",
            });
        }

        if (!["Starter", "Growth", "Business"].includes(plan)) {
            return res.status(400).json({
                success: false,
                message: "Invalid plan selected.",
            });
        }

        const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;
        const scriptToken = process.env.GOOGLE_SCRIPT_TOKEN;

        if (!googleScriptUrl || !scriptToken) {
            console.error("Google Sheets integration is not configured");
            return res.status(500).json({
                success: false,
                message: "Request submission is not configured yet.",
            });
        }

        const googleResponse = await fetch(googleScriptUrl, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8",
            },
            body: JSON.stringify({
                token: scriptToken,
                fullName: fullName,
                email: email,
                company: company,
                plan: plan,
                message: message,
            }),
        });

        const responseText = await googleResponse.text();
        let scriptResult = {};
        try {
            scriptResult = JSON.parse(responseText);
        } catch {
            scriptResult = {};
        }

        if (!googleResponse.ok || !scriptResult.success) {
            console.error("Google Apps Script did not confirm the request row");
            return res.status(502).json({
                success: false,
                message: "Unable to save your request. Please try again.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Your FoodVision access request has been submitted.",
        });
    } catch (error) {
        console.error("Request access error:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again.",
        });
    }
}
