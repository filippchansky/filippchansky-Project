"use client";
import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import News from "./News/News";
import Cryptoccurency from "./Cryptocurrency/Cryptoccurency";
import { Menu, MenuProps, Select } from "antd";
import { DollarOutlined, ReadOutlined } from "@ant-design/icons";

interface CryptoPageProps {
  TOKEN: string;
}

const items: MenuProps["items"] = [
  {
    label: "News",
    key: "news",
    icon: <ReadOutlined />,
  },
  {
    label: "Coins",
    key: "coins",
    icon: <DollarOutlined />,
  },
];
const CryptoPage: React.FC<CryptoPageProps> = ({ TOKEN }) => {
  const [type, setType] = useState("coins");

  const [width, setWidth] = useState(1920); // TODO window is not defined (window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const onClick: MenuProps["onClick"] = (e) => {
    setType(e.key);
  };
  return (
    <>
      <div className={style.wrapper}>
        <div className="flex justify-center min-[650px]:hidden">
          <Menu
            onClick={onClick}
            style={{ width: "190px" }}
            defaultSelectedKeys={["coins"]}
            defaultOpenKeys={["sub1"]}
            mode="horizontal"
            items={items}
          />
        </div>
        {width >= 650 && (
          <>
            <News TOKEN={TOKEN} />
            <Cryptoccurency TOKEN={TOKEN} />
          </>
        )}
        {width <= 650 && type === "coins" && (
          <>
            <Cryptoccurency TOKEN={TOKEN} />
          </>
        )}
        {width <= 650 && type === "news" && (
          <>
            <News TOKEN={TOKEN} />
          </>
        )}
      </div>
    </>
  );
};
export default CryptoPage;
