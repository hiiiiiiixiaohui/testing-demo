import React from "react";

type TabButtonProps = {
  isActive: boolean;
  selectTab: () => void;
  children: React.ReactNode;
};

const TabButton: React.FC<TabButtonProps> = ({
  isActive,
  selectTab,
  children,
}) => {
  if (isActive) {
    return <b>{children}</b>;
  }

  return (
    <li
      className={isActive? "crumb active" : "crumb"}
      onClick={() => {
        selectTab();
      }}
    >
      {children}
    </li>
  );
};

export default TabButton;
