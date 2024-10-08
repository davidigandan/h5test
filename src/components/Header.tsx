import React from "react";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header
      style={{
        backgroundColor: "#f0f0f0",
        padding: "1rem",
        textAlign: "center",
        position: "sticky",
        top: "0",
        zIndex: 1000,
      }}
    >
      <h2>{title}</h2>
    </header>
  );
};

export default Header;
