import {
  CopyIcon,
  DrawingPinIcon,
  LoopIcon,
  Pencil2Icon,
  ResetIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import React, { useEffect, useRef, useState } from "react";
import EmojiPanel from "./EmojiPanel";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import Separator from "./Separator";

export default function ContextMenu() {
  const menuRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [style, setStyle] = useState<{
    menuContainerStyle: React.CSSProperties;
    menuStyle: React.CSSProperties;
  }>({ menuContainerStyle: { left: 200, top: 100 }, menuStyle: {} });

  const onContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    setIsOpen(true);

    let anchorX = e.clientX;
    let anchorY = e.clientY;

    setStyle({
      menuContainerStyle: { left: anchorX, top: anchorY },
      menuStyle: { transformOrigin: `left top` },
    });
  };

  useEffect(() => {
    window.addEventListener("contextmenu", onContextMenu);
    return () => {
      window.removeEventListener("contextmenu", onContextMenu);
    };
  }, []);

  return (
    <div className="ContextMenu">
      <Menu
        ref={menuRef}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(!isOpen);
        }}
        menuContainerStyle={style.menuContainerStyle}
        menuStyle={style.menuStyle}
      >
        <EmojiPanel />
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
