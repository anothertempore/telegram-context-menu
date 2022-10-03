import { memo } from "react";

type MenuProps = {
  children: React.ReactNode;
};

function Menu(props: MenuProps) {
  const { children } = props;

  return (
    <div className="MenuContainer">
      <div
        className="MenuBackdrop"
        onMouseDown={(e) => {
          e.preventDefault();
        }}
      />
      <div className="Menu">{children}</div>
    </div>
  );
}

export default memo(Menu);
