import lottie from "lottie-web";
import { useEffect, useRef } from "react";

const worker = new Worker("../helpers/lottie.worker.ts");

export default function EmojiSticker({
  animationData,
}: {
  animationData: any;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    if (isLoadedRef.current) return;

    worker.postMessage({
      // name: '',
      container: ref.current as Element,
      renderer: "canvas",
      loop: false,
      autoplay: true,
      animationData: animationData,
    });

    // const item = lottie.loadAnimation({
    //   // name: '',
    //   container: ref.current as Element,
    //   renderer: "canvas",
    //   loop: false,
    //   autoplay: true,
    //   animationData: animationData,
    // });
    // lottie.setSpeed(1.5);
    // isLoadedRef.current = item.isLoaded;
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
      style={{ height: "32px", width: "32px" }}
    ></div>
  );
}
