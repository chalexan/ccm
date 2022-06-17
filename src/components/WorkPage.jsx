import { Table, message } from "antd";
import { useEffect } from "react";
import copy from "copy-to-clipboard";
var json = require("../data/kadastr_karabi.json");

const WorkPage = () => {
  const columns = [
    // {
    //   title: "#",
    //   dataIndex: "№",
    //   key: "number",
    // },
    {
      title: "Название",
      dataIndex: "",
      fixed: "left",
      render: (record) => (
        <>
          <b>{record.cave_name} </b>
          <br />
          <font color="red">▼</font> {record.deep}{" "}
          <span>
            <font color="green">➤</font>{" "}
          </span>{" "}
          {record.length}
        </>
      ),
      key: "name",
    },
    {
      title: "⬇",
      dataIndex: "deep",
      key: "deep",
      sorter: (a, b) => a.deep - b.deep,
    },
    {
      title: "➡",
      dataIndex: "length",
      key: "length",
      sorter: (a, b) => a.length - b.length,
    },

    {
      title: "Координаты",
      key: "location",
      render: (record) => (
        <a
          onClick={() => {
            copy(record.location);
            message.success("Координаты скопированы");
          }}
        >
          {record.location}
        </a>
      ),
      fixed: "right",
    },
  ];

  useEffect(() => {
    console.log(json);
  }, []);

  return (
    <div>
      <Table dataSource={json} columns={columns}></Table>
    </div>
  );
};

export default WorkPage;
