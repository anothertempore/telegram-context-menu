import { useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

type MenuProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  menuContainerStyle?: React.CSSProperties;
  menuStyle?: React.CSSProperties;
};

export default function Menu(props: MenuProps) {
  const { isOpen, onClose, children, menuContainerStyle, menuStyle } = props;
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMousedown = async (e: Event) => {
      const menu = menuRef.current;
      const target = e.target as HTMLElement | null;
      if (!menu || !target) {
        return;
      }
      if (
        !menu.contains(e.target as Node | null) ||
        target.classList.contains("MenuBackdrop")
      ) {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("mousedown", onMousedown);
    }
    return () => {
      window.removeEventListener("mousedown", onMousedown);
    };
  }, [onClose, isOpen]);

  return (
    <div className="MenuContainer" style={menuContainerStyle}>
      {isOpen && (
        <div
          className="MenuBackdrop"
          onMouseDown={(e) => {
            e.preventDefault();
          }}
        />
      )}
      <CSSTransition
        nodeRef={menuRef}
        in={isOpen}
        timeout={300}
        classNames="MenuNode"
        unmountOnExit
      >
        <div className="Menu" ref={menuRef} style={menuStyle}>
          {children}
        </div>
      </CSSTransition>
    </div>
  );
}
