import {
  CopyIcon,
  DrawingPinIcon,
  LoopIcon,
  Pencil2Icon,
  ResetIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import EmojiPanel from "./EmojiPanel";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import Separator from "./Separator";

const EXTRA_MARGIN = 20;

export default function ContextMenu() {
  const menuRef = useRef<HTMLDivElement>(null);
  const emojiPanelRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [style, setStyle] = useState<{
    menuContainerStyle: React.CSSProperties;
    menuStyle: React.CSSProperties;
  }>({ menuContainerStyle: { left: 200, top: 100 }, menuStyle: {} });
  const [anchor, setAnchor] = useState({ x: 200, y: 100 });

  const onContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    setIsOpen(true);

    let anchorX = e.clientX;
    let anchorY = e.clientY;

    setAnchor({ x: anchorX, y: anchorY });
  };

  useLayoutEffect(() => {
    window.addEventListener("contextmenu", onContextMenu);
    return () => {
      window.removeEventListener("contextmenu", onContextMenu);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      const rootEl = document.querySelector("#root") as HTMLDivElement;
      const rootRect = rootEl.getBoundingClientRect();

      let horizontalPosition: "left" | "right";
      let verticalPosition: "top" | "bottom";

      let left = 0;
      let top = 0;

      const { x: anchorX, y: anchorY } = anchor;
      const { offsetHeight: menuHeight = 200, offsetWidth: menuWidth = 200 } =
        menuRef.current as HTMLDivElement;
      const {
        offsetHeight: emojiPanelHeight = 200,
        offsetWidth: emojiPanelWidth = 200,
      } = emojiPanelRef.current as HTMLDivElement;

      if (rootRect.width - anchorX > Math.max(menuWidth, emojiPanelWidth)) {
        horizontalPosition = "left";
        left = anchorX;
      } else {
        horizontalPosition = "right";
        left = anchorX - Math.max(menuWidth, emojiPanelWidth);
      }

      if (
        rootRect.height - anchorY >
        menuHeight + emojiPanelHeight + EXTRA_MARGIN
      ) {
        verticalPosition = "top";
        top = anchorY + emojiPanelHeight + EXTRA_MARGIN;
      } else {
        verticalPosition = "bottom";
        top = rootRect.height - (menuHeight + EXTRA_MARGIN);
      }

      setStyle({
        menuContainerStyle: { left, top },
        menuStyle: {
          transformOrigin: `${horizontalPosition} ${verticalPosition}`,
        },
      });
    }
  }, [isOpen, anchor]);

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
        <EmojiPanel ref={emojiPanelRef} />
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
