import { useEffect, useRef, useState } from "react";

export default function EmojiSticker({ data }: { data: any }) {
  const [[animationKey, animationData]] = Object.entries(data);

  const ref = useRef<HTMLDivElement>(null);
  const isLoadedRef = useRef(false);

  const [item, setItem] = useState<any>();

  useEffect(() => {
    if (isLoadedRef.current) return;

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
    isLoadedRef.current = item.isLoaded;

    // TODO: first time not working
    ref.current?.addEventListener("mouseenter", function () {
      item.play();
    });
    ref.current?.addEventListener("mouseleave", function () {
      item.stop();
    });

    setItem(item);
  }, [animationData, animationKey]);

  useEffect(() => {
    if (item) {
      item.play();
    }
  }, [item]);

  return (
    <div
      ref={ref}
      className="Emoji"
      data-emoji={animationKey}
      style={{ height: "32px", width: "32px" }}
    ></div>
  );
}
