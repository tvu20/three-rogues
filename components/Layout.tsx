import React, { ReactNode } from "react";
import Header from "./shared/layout/Header";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
    <Header />
    <div className="layout" style={{ flex: 1 }}>
      {props.children}
    </div>
  </div>
);

export default Layout;
