import { NextRequest, NextResponse } from "next/server";

const N8N_WEBHOOK = "https://n8n.cadre.cl/webhook/frank-waitlist";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("[waitlist] sending to n8n:", N8N_WEBHOOK, body);

    const res = await fetch(N8N_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const text = await res.text().catch(() => "");
    console.log(`[waitlist] n8n status: ${res.status} | body: ${text}`);

    if (!res.ok) {
      return NextResponse.json({ error: "upstream", n8nStatus: res.status, n8nBody: text }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[waitlist] fetch threw:", err);
    return NextResponse.json({ error: "server", detail: String(err) }, { status: 500 });
  }
}
