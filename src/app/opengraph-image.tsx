import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Meridian Digital — AI-Powered Business Hubs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#080810",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* background glow */}
        <div style={{ position: "absolute", top: -100, left: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,106,255,0.3), transparent)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: -100, right: -100, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,195,247,0.2), transparent)", filter: "blur(80px)" }} />
        {/* chip */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(124,106,255,0.15)", border: "1px solid rgba(124,106,255,0.3)", borderRadius: 99, padding: "8px 16px", marginBottom: 32 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
          <span style={{ color: "#a78bfa", fontSize: 16, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>AI-Powered Business Hubs</span>
        </div>
        {/* headline */}
        <div style={{ fontSize: 72, fontWeight: 800, color: "white", lineHeight: 1.1, marginBottom: 24, maxWidth: 800 }}>
          Your website is{" "}
          <span style={{ background: "linear-gradient(135deg, #a78bfa, #7c6aff, #4fc3f7)", backgroundClip: "text", color: "transparent" }}>
            losing you jobs.
          </span>
        </div>
        {/* sub */}
        <div style={{ fontSize: 26, color: "#8892a4", maxWidth: 680, lineHeight: 1.5, marginBottom: 48 }}>
          We rebuild outdated service business websites into AI-powered hubs. 14-day delivery.
        </div>
        {/* stats row */}
        <div style={{ display: "flex", gap: 32 }}>
          {[["50+", "Sites Built"], ["14 days", "Avg Delivery"], ["4.9★", "Client Rating"]].map(([n, l]) => (
            <div key={l} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 32, fontWeight: 800, color: "white" }}>{n}</span>
              <span style={{ fontSize: 16, color: "#8892a4" }}>{l}</span>
            </div>
          ))}
        </div>
        {/* domain */}
        <div style={{ position: "absolute", bottom: 48, right: 80, fontSize: 20, color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em" }}>
          meridiandigital.agency
        </div>
      </div>
    ),
    { ...size }
  );
}
