import {
  CopyIcon,
  DrawingPinIcon,
  LoopIcon,
  Pencil2Icon,
  ResetIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import Separator from "./Separator";

import { Player } from "@lottiefiles/react-lottie-player";
import * as e1 from "../data/e1.json";
import * as e2 from "../data/e2.json";
import * as e3 from "../data/e3.json";
import * as e4 from "../data/e4.json";
import * as e5 from "../data/e5.json";
import * as e6 from "../data/e6.json";
import * as e7 from "../data/e7.json";

export default function ContextMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [style, setStyle] = useState<{
    menuContainerStyle: React.CSSProperties;
    menuStyle: React.CSSProperties;
  }>({ menuContainerStyle: {}, menuStyle: {} });

  useEffect(() => {
    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setIsOpen(true);

      let anchorX = e.clientX;
      let anchorY = e.clientY;

      // TODO: calculate the menu position
      setStyle({
        menuContainerStyle: { left: anchorX, top: anchorY },
        menuStyle: { transformOrigin: `left top` },
      });
    };

    window.addEventListener("contextmenu", onContextMenu);
    return () => {
      window.removeEventListener("contextmenu", onContextMenu);
    };
  }, []);

  return (
    <div className="ContextMenu">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Player
          autoplay
          src={e1}
          controls={false}
          hover
          loop
          style={{ height: "25px", width: "25px" }}
        />
        <Player
          autoplay
          src={e2}
          controls={false}
          hover
          loop
          style={{ height: "25px", width: "25px" }}
        />
        <Player
          autoplay
          src={e3}
          controls={false}
          hover
          loop
          style={{ height: "25px", width: "25px" }}
        />
        <Player
          autoplay
          src={e4}
          controls={false}
          hover
          loop
          style={{ height: "25px", width: "25px" }}
        />
        <Player
          autoplay
          src={e5}
          controls={false}
          hover
          loop
          style={{ height: "25px", width: "25px" }}
        />
        <Player
          autoplay
          src={e6}
          controls={false}
          hover
          loop
          style={{ height: "25px", width: "25px" }}
        />
        <Player
          autoplay
          src={e7}
          controls={false}
          hover
          loop
          style={{ height: "25px", width: "25px" }}
        />
      </div>
      <Menu
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(!isOpen);
        }}
        menuContainerStyle={style.menuContainerStyle}
        menuStyle={style.menuStyle}
      >
        <MenuItem icon={<LoopIcon />}>Reply</MenuItem>
        <Separator />
        <MenuItem icon={<CopyIcon />}>Copy Image</MenuItem>
        <Separator />
        <MenuItem
          icon={<Pencil2Icon />}
          onClick={() => {
            setIsOpen(false);
            // toast("You clicked edit 🎉");
          }}
        >
          Edit
        </MenuItem>
        <MenuItem icon={<DrawingPinIcon />}>Pin</MenuItem>
        <MenuItem icon={<ResetIcon />}>Forward</MenuItem>
        <Separator />
        <MenuItem icon={<TrashIcon />} danger>
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}
