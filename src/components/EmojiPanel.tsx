import { memo } from "react";
import { data } from "../data";
import EmojiSticker from "./EmojiSticker";

function EmojiPanel() {
  return (
    <div className="EmojiPanel">
      {[...data].map((d, idx) => (
        <EmojiSticker key={idx} data={d} />
      ))}
    </div>
  );
}

export default memo(EmojiPanel);
