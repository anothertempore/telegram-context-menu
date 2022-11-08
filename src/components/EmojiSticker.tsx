import { useEffect, useRef } from "react";

export default function EmojiSticker({ data }: { data: any }) {
  const [[animationKey, animationData]] = Object.entries(data);

  const ref = useRef<HTMLDivElement>(null);
  const itemRef = useRef<any>();

  useEffect(() => {
    // @ts-ignore
    window.lottie.useWebWorker(true);
    // @ts-ignore
    const item = window.lottie.loadAnimation({
      name: animationKey,
      container: ref.current as Element,
      renderer: "canvas",
      loop: false,
      autoplay: false,
      animationData,
    });

    // @ts-ignore
    window.lottie.setSpeed(1.5);

    ref.current?.addEventListener("mouseenter", function () {
      item.play();
    });
    ref.current?.addEventListener("mouseleave", function () {
      item.stop();
    });

    itemRef.current = item;

    return () => item.destroy();
  }, [animationData, animationKey]);

  return (
    <div
      ref={ref}
      className="Emoji"
      data-emoji={animationKey}
      style={{ height: "32px", width: "32px" }}
    ></div>
  );
}
