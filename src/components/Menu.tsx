import { forwardRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

type MenuProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  menuContainerStyle?: React.CSSProperties;
  menuStyle?: React.CSSProperties;
};

const Menu = forwardRef((props: MenuProps, ref: any) => {
  const { isOpen, onClose, children, menuContainerStyle, menuStyle } = props;

  useEffect(() => {
    const onMousedown = (e: Event) => {
      const menu = ref.current;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        nodeRef={ref}
        in={isOpen}
        timeout={300}
        classNames="MenuNode"
        unmountOnExit
      >
        <div className="Menu" ref={ref} style={menuStyle}>
          {children}
        </div>
      </CSSTransition>
    </div>
  );
});

export default Menu;
