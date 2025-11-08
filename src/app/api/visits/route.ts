import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Visit } from "@/models/Visit";

export async function GET() {
  await connectDB();

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  // 1️⃣ Increment today’s count
  let todayDoc = await Visit.findOne({ date: todayStr });
  if (!todayDoc) {
    todayDoc = await Visit.create({ date: todayStr, count: 1 });
  } else {
    todayDoc.count += 1;
    await todayDoc.save();
  }

  // 2️⃣ Get stats
  const allVisits = await Visit.find();

  const total = allVisits.reduce((sum, v) => sum + v.count, 0);

  const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - 7);
  const thisWeek = allVisits
    .filter((v) => new Date(v.date) >= weekAgo)
    .reduce((sum, v) => sum + v.count, 0);

  return NextResponse.json({
    today: todayDoc.count,
    week: thisWeek,
    total,
  });
}
