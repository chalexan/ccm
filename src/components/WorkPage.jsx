import { Row, Col, Badge, Image, Card } from "antd";
import { useState } from "react";
import AlarmServe from "./AlarmServe";
import LayoutPage from "./LayoutPage";
import VideoServe from "./VideoServe";
const WorkPage = () => {
  const [page, setPage] = useState(null);
  const style = {
    height: "200px",
    background: "grey",
    padding: "8px 0",
    margin: "10px",
  };
  return <div> Каталог пещер горного Крыма</div>;
};

export default WorkPage;
