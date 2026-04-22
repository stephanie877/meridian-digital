import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, business, email, phone, message } = body;

    // Send to Make.com webhook (replace with actual webhook URL)
    const webhookUrl = process.env.MAKE_WEBHOOK_URL;
    
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          business,
          email,
          phone,
          website: message,
          source: "website_contact_form",
          timestamp: new Date().toISOString(),
        }),
      });
    }

    // Also send notification email via Brevo (optional)
    const brevoKey = process.env.BREVO_API_KEY;
    if (brevoKey) {
      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": brevoKey,
        },
        body: JSON.stringify({
          sender: { name: "Meridian Digital Website", email: "hello@meridiandigital.co" },
          to: [{ email: "hello@meridiandigital.co", name: "Meridian Digital" }],
          subject: `New Lead: ${business} (${name})`,
          htmlContent: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Business:</strong> ${business}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
            <p><strong>Website:</strong> ${message || "Not provided"}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          `,
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
