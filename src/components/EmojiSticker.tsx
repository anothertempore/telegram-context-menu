import { useCallback, useEffect, useRef, useState } from "react";

export default function EmojiSticker({ data }: { data: any }) {
  const [[animationKey, animationData]] = Object.entries(data);

  const ref = useRef<HTMLDivElement>(null);
  const isLoadedRef = useRef(false);

  // const [currFrame, setCurrFrame] = useState(0);
  // const requestRef = useRef<any>();

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

    ref.current?.addEventListener("mouseenter", function () {
      item.play();
    });
    ref.current?.addEventListener("mouseleave", function () {
      item.stop();
    });

    // TODO: play animation after all items is loaded
  }, [animationData, animationKey]);

  // const animate = useCallback(() => {
  //   // @ts-ignore
  //   const lottieHandle = new Module.RlottieWasm();

  //   lottieHandle.load(JSON.stringify(animationData));
  //   const totalFrames = lottieHandle.frames();

  //   const canvas = document.getElementById(animationKey) as any;
  //   canvas.width = 32;
  //   canvas.height = 32;
  //   canvas.style.width = 32 + "px";
  //   canvas.style.height = 32 + "px";
  //   const context = (canvas as any)?.getContext("2d");

  //   const buffer = lottieHandle.render(currFrame, 32, 32);
  //   const result = Uint8ClampedArray.from(buffer);
  //   const imageData = new ImageData(result, 32, 32);

  //   context.putImageData(imageData, 0, 0);

  //   if (currFrame <= totalFrames) {
  //     setCurrFrame(Number(currFrame) + 1.5);
  //   }
  // }, [animationData, animationKey, currFrame]);

  // useEffect(() => {
  //   requestRef.current = requestAnimationFrame(animate);
  //   return () => cancelAnimationFrame(requestRef.current);
  // }, [animate]);

  return (
    <div
      ref={ref}
      className="Emoji"
      data-emoji={animationKey}
      style={{ height: "32px", width: "32px" }}
    >
      {/* <canvas id={animationKey}></canvas> */}
    </div>
  );
}
