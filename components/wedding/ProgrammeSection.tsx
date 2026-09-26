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
              padding: "48px 0 8px",
            }}
          >
            <div style={{ padding: "16px 24px" }}>
              {programme.items.map((item) => (
                <div key={item.title}>
                  <p className="jm-center">
                    <strong style={{ fontSize: 15, fontWeight: 600 }}>{item.title}</strong>
                  </p>
                  <p className="jm-center">
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
