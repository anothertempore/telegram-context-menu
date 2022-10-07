type MenuItemProps = {
  icon?: React.ReactNode;
  children: React.ReactNode;
  menuItemStyle?: React.CSSProperties;
  onClick?: () => void;
  danger?: boolean;
};

export default function MenuItem(props: MenuItemProps) {
  const { icon, children, onClick, menuItemStyle, danger } = props;

  return (
    <div
      className={danger ? `MenuItemContainer danger` : `MenuItemContainer`}
      style={menuItemStyle}
      onClick={onClick}
    >
      <div className="MenuItem">
        {icon}
        <div className="MenuItemChildren">{children}</div>
      </div>
    </div>
  );
}
