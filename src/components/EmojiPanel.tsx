import { Player } from "@lottiefiles/react-lottie-player";
import { data } from "../data";

export default function EmojiPanel() {
  return (
    <div className="EmojiPanel">
      {[
        ...data,
        ...data,
        // ...data,
        // ...data,
        // ...data,
        // ...data,
        // ...data,
        // ...data,
      ].map((d, idx) => (
        <Player
          className="Emoji"
          key={idx}
          autoplay
          src={d}
          controls={false}
          hover
          speed={1.5}
          // loop
          style={{ height: "32px", width: "32px" }}
        />
      ))}
    </div>
  );
}
