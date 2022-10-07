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

export default function ContextMenu() {
  const [isOpen, setIsOpen] = useState(true);
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
