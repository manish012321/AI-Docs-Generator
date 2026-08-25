import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const contactRoute = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, error: "All fields are required." });
  }

  try {
    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>", // free default sender
      to: "yourgmail@gmail.com",
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Mail error:", error);
    res.status(500).json({ success: false, error: "Failed to send message." });
  }
};