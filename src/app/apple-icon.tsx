import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#073B73",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#D9A441",
            lineHeight: 1,
          }}
        >
          F
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: 1,
          }}
        >
          FabricFlow
        </div>
      </div>
    ),
    size
  );
}
