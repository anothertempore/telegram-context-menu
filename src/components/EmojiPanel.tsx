import { forwardRef, memo } from "react";
import { data } from "../data";
import EmojiSticker from "./EmojiSticker";

const EmojiPanel = forwardRef(function EmojiPanel(props, ref: any) {
  return (
    <div className="EmojiPanel" ref={ref}>
      {[...data].map((d, idx) => (
        <EmojiSticker key={idx} data={d} />
      ))}
    </div>
  );
});

export default memo(EmojiPanel);
