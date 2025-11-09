"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Mail, Loader2 } from "lucide-react";

export default function MessagesPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔒 Redirect if not logged in
  useEffect(() => {
    const loggedIn = localStorage.getItem("admin-logged-in");
    if (!loggedIn) {
      router.push("/admin/login");
    }
  }, [router]);

  // 📬 Fetch messages after login check
  useEffect(() => {
    async function loadMessages() {
      try {
        const res = await fetch("/api/messages");
        const data = await res.json();
        setMessages(data.messages || []);
      } catch (err) {
        console.error("Error loading messages", err);
      } finally {
        setLoading(false);
      }
    }
    loadMessages();
  }, []);

  // 🗑️ Delete a message
  async function deleteMessage(id: string) {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      await fetch(`/api/messages?id=${id}`, { method: "DELETE" });
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (err) {
      console.error("Error deleting message", err);
    }
  }

  // 🧭 Render
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#2CA8E2]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ninja-white dark:bg-ninja-dark text-ninja-dark dark:text-ninja-white px-6 py-12">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Mail className="w-6 h-6 text-[#2CA8E2]" /> Messages
      </h1>

      {messages.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 shadow-sm flex justify-between items-start"
            >
              <div>
                <p className="font-semibold text-[#2CA8E2]">{msg.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{msg.email}</p>
                <p className="mt-2 text-gray-700 dark:text-gray-200">{msg.message}</p>
              </div>
              <button
                onClick={() => deleteMessage(msg._id)}
                className="text-red-500 hover:text-red-600 transition"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
