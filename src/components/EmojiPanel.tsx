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
          key={idx}
          autoplay
          src={d}
          controls={false}
          hover
          loop
          style={{ height: "35px", width: "35px" }}
        />
      ))}
    </div>
  );
}
