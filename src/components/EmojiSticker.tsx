import { useEffect, useRef } from "react";

export default function EmojiSticker({ data }: { data: any }) {
  const [[animationKey, animationData]] = Object.entries(data);

  const ref = useRef<HTMLDivElement>(null);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    if (isLoadedRef.current) return;

    // @ts-ignore
    window.lottie.useWebWorker(true);
    // @ts-ignore
    const item = window.lottie.loadAnimation({
      container: ref.current as Element,
      renderer: "canvas",
      loop: false,
      autoplay: true,
      animationData,
    });
    // @ts-ignore
    window.lottie.setSpeed(1.5);
    isLoadedRef.current = item.isLoaded;
  }, [animationData]);

  // TODO: Hover to play
  // useEffect(() => {
  //   const onMouseOver = (e: MouseEvent) => {
  //     e.stopPropagation();
  //     console.log(e.target);
  //   };
  //   window.addEventListener("mousemove", onMouseOver);

  //   return () => {
  //     window.removeEventListener("mousemove", onMouseOver);
  //   };
  // }, []);

  return (
    <div
      ref={ref}
      className="Emoji"
      data-emoji={animationKey}
      style={{ height: "32px", width: "32px" }}
    >
      {/* <canvas id={`canvas-${animationKey}`}></canvas> */}
    </div>
  );
}
