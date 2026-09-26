import { weddingData } from "@/data/wedding";
import Reveal from "./Reveal";

export default function ProgrammeSection() {
  const { programme, theme } = weddingData;

  return (
    <Reveal>
      <section
        style={{
          backgroundImage: "url(/patterns/programme-bg.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "48px 20px",
          marginTop: "24px",
        }}
      >
        <div
          style={{
            boxShadow: "0 0 4px 0 rgba(0,0,0,0.1)",
            borderRadius: "15px",
            position: "relative",
            padding: "16px",
            margin: "7.4375px",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              background: theme.panelOverlay,
              opacity: 0.3,
              position: "absolute",
              inset: 0,
              borderRadius: "15px",
            }}
          />
          <div
            style={{
              background: theme.panelBg,
              borderRadius: "10px",
              position: "relative",
              padding: "24px 0",
            }}
          >
            <div style={{ padding: "8px 24px 24px" }}>
              {programme.items.map((item) => (
                <div key={item.title} style={{ padding: "16px 0" }}>
                  <p className="jm-center" style={{ margin: 0, lineHeight: 1.3 }}>
                    <strong style={{ fontSize: 15, fontWeight: 600 }}>{item.title}</strong>
                  </p>
                  <p className="jm-center" style={{ margin: "6px 0 0" }}>
                    <span className="jm-value">{item.time}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
