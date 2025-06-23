import { Composition } from "remotion";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";

// PUBLIC_INTERFACE
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema2}
        defaultProps={{
          logoColor1: "#91dAE2" as const,
          logoColor2: "#86A8E7" as const,
        }}
      />
    </>
  );
};
