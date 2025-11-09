"use client";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send, Mic } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("sent");
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(data.error || "Failed to send");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-24 px-6 md:px-16 bg-white dark:bg-black flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold mb-8"
      >
        Get in <span className="text-[#2CA8E2]">Touch</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
        className="text-gray-600 dark:text-gray-400 max-w-2xl mb-12"
      >
        I’m always open to discussing new projects, creative ideas, or opportunities to collaborate.
        You can reach me directly through the form below or connect via my social links.
      </motion.p>

      {/* Contact Form */}
      <motion.form
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true }}
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gray-100 dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-800"
      >
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-[#2CA8E2] outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-[#2CA8E2] outline-none"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-[#2CA8E2] outline-none"
          ></textarea>

          <motion.button
            whileTap={{ scale: 0.97 }}
            disabled={status === "sending"}
            className="flex items-center justify-center gap-2 bg-[#2CA8E2] hover:bg-[#2393c6] text-white font-semibold py-3 px-5 rounded-lg transition-all duration-300"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
            <Send className="w-4 h-4" />
          </motion.button>

          {status === "sent" && (
            <p className="text-green-500 text-sm mt-2">✅ Message sent successfully!</p>
          )}
          {status === "error" && (
            <p className="text-red-500 text-sm mt-2">❌ Something went wrong. Try again.</p>
          )}
        </div>
      </motion.form>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        viewport={{ once: true }}
        className="flex gap-6 mt-12"
      >
        <a
          href="mailto:yourmail@example.com"
          className="p-3 rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-[#2CA8E2] hover:text-white transition-all duration-300"
        >
          <Mail className="w-5 h-5" />
        </a>
        <a
          href="https://github.com/yourusername"
          target="_blank"
          className="p-3 rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-[#2CA8E2] hover:text-white transition-all duration-300"
        >
          <Github className="w-5 h-5" />
        </a>
        <a
          href="https://linkedin.com/in/yourusername"
          target="_blank"
          className="p-3 rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-[#2CA8E2] hover:text-white transition-all duration-300"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <button
          onClick={() =>
            alert("🎙️ Voice greeting or message feature coming soon!")
          }
          className="p-3 rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-[#2CA8E2] hover:text-white transition-all duration-300"
        >
          <Mic className="w-5 h-5" />
        </button>
      </motion.div>
    </section>
  );
}
