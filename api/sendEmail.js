import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { email, subject, message } = req.body;

        if (!email || !subject || !message) {
            return res.status(400).json({ message: "Email, subject, and message are required" });
        }

        try {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER, // Sesuaikan dengan ENV di Vercel
                    pass: process.env.EMAIL_PASS
                }
            });

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: process.env.RECEIVER_EMAIL,
                subject: subject,
                text: message,
                html: `<p>${message}</p>`
            });

            return res.status(200).json({ message: "Email sent successfully!" });

        } catch (error) {
            console.error("Error sending email:", error);
            return res.status(500).json({ message: "Email failed to send", error });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
