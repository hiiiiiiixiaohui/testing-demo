import React from "react";
import { Link , useNavigate} from "react-router-dom";

import TabButton from "../TabButton";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // const [tab, setTab] = React.useState("");
  // const [isPending, startTransition] = React.useTransition();
  // const navigate = useNavigate()

  // function selectTab(nextTab: string) {
  //   startTransition(() => {
  //     setTab(() => nextTab);
  //   });
  //   navigate(nextTab)
  // }
  return (
    <div className="global-layout">
      <nav className="header">
        <menu>
          {/* <TabButton
            isActive={tab === "/"}
            selectTab={() => selectTab("/")}
          >
            Home
          </TabButton>
          <TabButton
            isActive={tab === "/demo"}
            selectTab={() => selectTab("/demo")}
          >
            Demo
          </TabButton>
          <TabButton
            isActive={tab === "/test"}
            selectTab={() => selectTab("/test")}
          >
            Test
          </TabButton> */}
          <li className="crumb">
            <Link to="/">Home</Link>
          </li>
          <li className="crumb">
            <Link to="/demo">Demo</Link>
          </li>
          <li className="crumb">
            <Link to="/test">测试</Link>
          </li>
        </menu>
      </nav>
      <div className="g-container">{children}</div>
    </div>
  );
};

export default Layout;
