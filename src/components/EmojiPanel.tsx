import { memo } from "react";
import { data } from "../data";
import EmojiSticker from "./EmojiSticker";

function EmojiPanel() {
  return (
    <div className="EmojiPanel">
      {data.map((d, idx) => (
        <EmojiSticker key={idx} animationData={d} />
      ))}
      {/* {[
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
      ))} */}
    </div>
  );
}

export default memo(EmojiPanel);
