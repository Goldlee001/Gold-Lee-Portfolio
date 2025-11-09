import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { connectDB } from "@/lib/mongodb";
import Message from "@/models/Message";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
    }

    // ✅ Connect to DB and save message
    await connectDB();
    await Message.create({ name, email, message });

    // ✅ Create transporter (prefer explicit SMTP config, fallback to Gmail service)
    const useSmtp = !!process.env.SMTP_HOST;
    const transporter = useSmtp
      ? nodemailer.createTransport({
          host: process.env.SMTP_HOST as string,
          port: Number(process.env.SMTP_PORT ?? 587),
          secure: String(process.env.SMTP_SECURE ?? "false").toLowerCase() === "true",
          auth: {
            user: process.env.SMTP_USER as string,
            pass: process.env.SMTP_PASS as string,
          },
        })
      : nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

    const mailOptions = {
      from: `${process.env.EMAIL_FROM || process.env.EMAIL_USER}`,
      replyTo: email,
      to: process.env.CONTACT_TO || process.env.EMAIL_USER,
      subject: `New message from ${name}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Message saved and email sent!" });
  } catch (error) {
    console.error("Error sending or saving message:", error);
    return NextResponse.json({ success: false, error: "Failed to send message" }, { status: 500 });
  }
}
