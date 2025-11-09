import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Visit from "@/models/Visit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Get IP address safely
function getClientIP(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0] || "unknown";
}

// Record a visit
export async function POST(request: Request) {
  try {
    await connectDB();
    const ip = getClientIP(request);

    const cutoff = new Date();
    cutoff.setHours(cutoff.getHours() - 1);

    // Avoid logging same IP more than once per hour
    const exists = await Visit.findOne({ ip, createdAt: { $gte: cutoff } });
    if (!exists) {
      await Visit.create({ ip });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error recording visit:", err);
    return NextResponse.json({ error: "Failed to record visit" }, { status: 500 });
  }
}

// Get analytics summary
export async function GET() {
  try {
    await connectDB();
    const now = new Date();

    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());

    const todayCount = await Visit.countDocuments({ createdAt: { $gte: startOfToday } });
    const weekCount = await Visit.countDocuments({ createdAt: { $gte: startOfWeek } });
    const totalCount = await Visit.countDocuments();

    return NextResponse.json({
      today: todayCount,
      week: weekCount,
      total: totalCount,
    });
  } catch (err) {
    console.error("Error fetching visit stats:", err);
    return NextResponse.json({ error: "Failed to fetch visits" }, { status: 500 });
  }
}
