import { Table, message, Input, Space, Button } from "antd";
import { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import copy from "copy-to-clipboard";
import {
  CaretDownOutlined,
  CaretRightOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Select from "rc-select";
var jsonKarabi = require("../data/kadastr_karabi.json");
var jsonBabugan = require("../data/kadastr_babugan.json");
var jsonBahchisaraj = require("../data/kadastr_bahchisaraj.json");
var jsonDemerdji = require("../data/kadastr_demerdji.json");
var jsonDolgorukovka = require("../data/kadastr_dolgorukovskaya.json");
var md5 = require("md5");

const WorkPage = () => {
  const [caveDist, setCaveDist] = useState(jsonKarabi);
  const { Option } = Select;
  // Cчетчик пещер
  const [cavesCount, setCavesCount] = useState(0);

  // Поиск по колонке
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  let searchInput;

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Введите запрос`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Поиск
          </Button>
          <Button
            onClick={() => {
              handleReset(clearFilters);
              handleSearch(selectedKeys, confirm, dataIndex);
              handleReset(clearFilters);
            }}
            size="small"
            style={{ width: 90 }}
          >
            Сброс
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            -
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();

    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  // Конец поиска по колонке

  const columns = [
    {
      title: "Название",
      dataIndex: "cave_name",
      ...getColumnSearchProps("cave_name"),
      key: "name",
    },
    {
      title: (
        <font color="red">
          <CaretDownOutlined />
        </font>
      ),
      dataIndex: "deep",
      key: "deep",
      sorter: (a, b) => a.deep - b.deep,
    },
    {
      title: (
        <font color="green">
          <CaretRightOutlined />
        </font>
      ),
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
          {/* {verifyAccess() ? record.location : "Доступ закрыт"} */}
        </a>
      ),
      // fixed: "right",
    },
  ];

  useEffect(() => {
    setCaveDist(jsonKarabi);
    setCavesCount(jsonKarabi.length);
    console.log("caves_count: ", cavesCount);
  }, []);

  const setDistHandle = (distCode) => {
    console.log("inout cide:", distCode);
    if (distCode === "karabi") {
      setCaveDist(jsonKarabi);
      setCavesCount(jsonKarabi.length);
    }
    if (distCode === "babugan") {
      setCaveDist(jsonBabugan);
      setCavesCount(jsonBabugan.length);
    }
    if (distCode === "bahchi") {
      setCaveDist(jsonBahchisaraj);
      setCavesCount(jsonBahchisaraj.length);
    }
    if (distCode === "demerdji") {
      setCaveDist(jsonDemerdji);
      setCavesCount(jsonDemerdji.length);
    }
    if (distCode === "dolgaya") {
      setCaveDist(jsonDolgorukovka);
      setCavesCount(jsonDolgorukovka.length);
    }
    return console.log("caveDistChange");
  };

  const verifyAccess = () => {
    if (
      localStorage.getItem("pass") === "b934c427ec6c9fd7dec550de32855437" ||
      md5(new Date().toLocaleString)
    )
      return true;
    return false;
  };

  return (
    <div>
      <div className="alphaback" style={{ padding: "0 15px" }}>
        <span>
          <Space>
            Cпелеорайон:
            <select onChange={(el) => setDistHandle(el.target.value)}>
              <option key={0} value="karabi">
                Карабийский
              </option>
              <option key={1} value="babugan">
                Бабуганский
              </option>
              <option key={2} value="bahchi">
                Бахчисарайский
              </option>
              <option key={3} value="demerdji">
                Демерджинский
              </option>
              <option key={4} value="dolgaya">
                Долгоруковский
              </option>
            </select>
          </Space>
        </span>
      </div>
      <div className="alphaback" style={{ padding: "0 15px" }}>
        <i>Всего пещер в каталоге: </i>{" "}
        <span>
          {" "}
          <i>
            <b>{cavesCount}</b>
          </i>
        </span>{" "}
      </div>
      <Table
        dataSource={caveDist}
        columns={columns}
        pagination={{ position: ["none", "bottomCenter"] }}
      ></Table>
    </div>
  );
};

export default WorkPage;
