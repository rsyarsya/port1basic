export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { email, subject, message } = req.body;

    if (!email || !subject || !message) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Gunakan layanan pengiriman email seperti Nodemailer atau SMTP service
        const nodemailer = require("nodemailer");

        const transporter = nodemailer.createTransport({
            service: "Gmail", // Bisa diganti dengan provider lain
            auth: {
                user: process.env.EMAIL_USER, // Atur di environment variable Vercel
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: email,
            to: process.env.RECEIVER_EMAIL, // Email tujuan
            subject: subject,
            text: message,
        });

        return res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error sending email", error });
    }
}
