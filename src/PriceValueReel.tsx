import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  staticFile,
} from "remotion";
import script from "./data/script.json";

type Scene = {
  id: string;
  name: string;
  detail: string;
  image?: string;
  cta?: boolean;
  startFrame: number;
};

const scenes = script.scenes as Scene[];
const totalFrames = script.totalFrames as number;

const SceneView: React.FC<{ scene: Scene }> = ({ scene }) => {
  if (scene.cta) {
    return (
      <AbsoluteFill
        style={{
          backgroundColor: "#00FF00",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
          <svg width="88" height="88" viewBox="0 0 24 24" fill="none">
            <path d="M5 3h14a1 1 0 0 1 1 1v16l-8-4-8 4V4a1 1 0 0 1 1-1z" fill="#FFFFFF" />
          </svg>
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 24,
              padding: "20px 40px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
            }}
          >
            <div
              style={{
                color: "#0B1A33",
                fontSize: 52,
                fontWeight: 900,
                textAlign: "center",
                fontFamily: "'Noto Sans CJK JP', sans-serif",
                letterSpacing: 1,
              }}
            >
              {scene.detail}
            </div>
          </div>
        </div>
      </AbsoluteFill>
    );
  }

  // Plain flex column: image area on top, telop area below.
  // No absolute/percentage positioning, so the two can never overlap.
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#00FF00",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flex: "0 0 82%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
          overflow: "hidden",
        }}
      >
        {scene.image && (
          <Img
            src={staticFile(`themes/price-value-theme/${scene.image}`)}
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
          />
        )}
      </div>

      <div
        style={{
          flex: "0 0 18%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "16px 40px",
          backgroundColor: "#00FF00",
        }}
      >
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 24,
            padding: "16px 32px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
            maxWidth: "92%",
          }}
        >
          <div
            style={{
              color: "#0B1A33",
              fontSize: 38,
              fontWeight: 900,
              textAlign: "center",
              fontFamily: "'Noto Sans CJK JP', sans-serif",
              lineHeight: 1.5,
              letterSpacing: 1,
            }}
          >
            {scene.detail}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const PriceValueReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#00FF00" }}>
      <Audio src={staticFile("themes/price-value-theme/audio/scene1.mp3")} />

      {scenes.map((scene, i) => {
        const nextStart = scenes[i + 1]?.startFrame ?? totalFrames;
        const duration = Math.max(1, nextStart - scene.startFrame);
        return (
          <Sequence key={scene.id} from={scene.startFrame} durationInFrames={duration}>
            <SceneView scene={scene} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
