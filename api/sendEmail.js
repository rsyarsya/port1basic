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
                    user: process.env.EMAIL_USER, // Email pengirim dari ENV
                    pass: process.env.EMAIL_PASS  // Password email pengirim dari ENV
                }
            });

            await transporter.sendMail({
                from: `"Website Contact" <${process.env.EMAIL_USER}>`, // Nama pengirim tetap email website
                to: process.env.RECEIVER_EMAIL, // Email penerima dari ENV
                replyTo: email, // Agar bisa langsung membalas ke email pengirim
                subject: subject,
                text: `You have received a new message from: ${email}\n\nSubject: ${subject}\n\nMessage:\n${message}`,
                html: `
                    <p><strong>You have received a new message from:</strong> ${email}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <p><strong>Message:</strong><br>${message}</p>
                `
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
