import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { email, subject, message } = req.body;

    if (!email || !subject || !message) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Konfigurasi transportasi email menggunakan Gmail atau SMTP lainnya
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // Email pengirim
                pass: process.env.EMAIL_PASS, // Password aplikasi atau App Password
            },
        });

        // Konfigurasi email yang dikirim
        await transporter.sendMail({
            from: `"Contact Form" <${process.env.EMAIL_USER}>`,
            to: process.env.RECEIVER_EMAIL, // Email tujuan penerima
            subject: `[New Message] ${subject}`,
            text: `From: ${email}\n\nMessage:\n${message}`,
        });

        return res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error sending email", error });
    }
}

