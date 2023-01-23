import { Image, Space, message, Avatar } from "antd";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import {
  Layout,
  Menu,
  Breadcrumb,
  Drawer,
  Form,
  Row,
  Col,
  Button,
  Input,
} from "antd";
import { useState } from "react";
import DevicesPage from "./DevicesPage";
import InfoPage from "./InfoPage";
import MainPage from "./MainPage";

import WorkPage from "./WorkPage";
import {
  MessageOutlined,
  HomeOutlined,
  ReconciliationOutlined,
  EnvironmentOutlined,
  MenuOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";

import axios from "axios";

const LayoutPage = () => {
  const { Header, Content, Footer } = Layout;
  const [page, setPage] = useState("main");
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [winWidth, setWinwidth] = useState(
    document.documentElement.scrollWidth
  );
  const URL = "http://158.160.19.224:8080";
  //const URL = "http://localhost:8080";
  const [avatarPreview, setAvatarPreview] = useState("");
  const uploadFile = (e) => {
    if (true) {
      console.log("file values", e);
      const data = new FormData();
      data.append("image-file", e);
      axios
        .post(URL + "/upload", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setAvatarPreview(`${URL}/uploads/${res.data.image_path}`);
          console.log(
            "path_avatar: ",
            `${URL}"/uploads/"${res.data.image_path}`
          );
        })
        .catch((err) => {
          message.error(err);
        });
    }
  };

  const dummyRequest = (arp1, arp2) => {
    console.log("Dummy Rq");
  };

  useEffect(() => {
    setWinwidth(document.documentElement.scrollWidth);
    const menuItem = document.getElementById("menu1");
    winWidth > 300
      ? (menuItem.style.width = `${winWidth - 75}px`)
      : (menuItem.style.width = "150px");
    console.log(winWidth);
  }, []);

  return (
    <>
      <Layout className="layout">
        <Header style={{ padding: "0px 15px" }}>
          <Space>
            <div className="logo" style={{ margin: "8px 24px 8px 20px;" }}>
              <a href onClick={showDrawer}>
                <img
                  width={50}
                  height={50}
                  src="./followmytracklogo.png"
                  fallback="data:image/png;base64,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"
                />
              </a>
            </div>
            <span> </span>
            <div>
              <Menu
                id="menu1"
                theme="dark"
                mode="horizontal"
                style={{ padding: 0 }}
                defaultSelectedKeys={["-1"]}
                overflowedIndicator={<MenuOutlined />}
              >
                <Menu.Item
                  key={-1}
                  title="Главная"
                  style={{ padding: "0 5px" }}
                  icon={<HomeOutlined />}
                  onClick={() => {
                    setPage("main");
                  }}
                >
                  <b>Главная</b>
                </Menu.Item>

                <Menu.Item
                  style={{ padding: "0 5px" }}
                  key="SubMenu"
                  title="Каталог пещер"
                  onClick={() => {
                    setPage("work");
                  }}
                  icon={<ReconciliationOutlined />}
                >
                  <b>Каталог пещер</b>
                </Menu.Item>
                <Menu.Item
                  key={1}
                  style={{ padding: "0 10px" }}
                  icon={<EnvironmentOutlined />}
                >
                  <a
                    onClick={() => {
                      setPage("devices");
                    }}
                  >
                    {" "}
                    <b>Карта</b>
                  </a>
                </Menu.Item>

                <Menu.Item
                  key={3}
                  style={{ padding: "0 10px" }}
                  icon={<MessageOutlined />}
                >
                  <a
                    onClick={() => {
                      setPage("info");
                    }}
                  >
                    <b>Обратная связь</b>
                  </a>
                </Menu.Item>
              </Menu>
            </div>
          </Space>
        </Header>

        {/* Всплывающий блок для логина/регистрации */}
        <Drawer
          title={
            <>
              <img width={30} height={30} src="./followmytracklogo.png" />
              <span> | </span>
              Вход
            </>
          }
          onClose={onClose}
          open={open}
          style={{
            paddingBottom: 40,
          }}
          visible={open}
          placement="left"
          extra={
            <Space>
              <Button onClick={""} type="primary">
                Регистрация
              </Button>
            </Space>
          }
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={16}>
                <Form.Item
                  name="login"
                  label="Имя(никнейм)"
                  rules={[
                    {
                      required: true,
                      message: "Введите имя пожалуйста",
                    },
                  ]}
                >
                  <Input placeholder="Введите имя пожалуйста" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={16}>
                <Form.Item
                  name="password"
                  label="Пароль"
                  rules={[
                    {
                      required: true,
                      message: "Введите пароль пожалуйста",
                    },
                  ]}
                >
                  <Input type="password" placeholder="Ваш секретный пароль" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}></Col>

              <Col span={12}>
                <Image />
              </Col>
            </Row>
          </Form>
          <Form name="file-upload-form" onFinish={uploadFile}>
            <Form.Item label="Аватар:" name="imageFile">
              <ImgCrop shape="round" rotate onModalOk={uploadFile}>
                <Upload
                  name="avatar"
                  customRequest={dummyRequest}
                  className="avatar-uploader"
                  showUploadList={false}
                >
                  {avatarPreview && <Avatar size="large" src={avatarPreview} />}
                  <span> | </span>
                  <Button size="large" icon={<UploadOutlined />}></Button>
                </Upload>
              </ImgCrop>
            </Form.Item>
          </Form>
        </Drawer>
        <Content
          className="backpic"
          style={{
            paddingLeft: 30,
            paddingRight: 30,
          }}
        >
          <Breadcrumb style={{ "font-size": "large" }}>
            <Breadcrumb.Item>
              <div style={{ padding: "0 15px" }}>
                <b>
                  {" "}
                  <font color="white">Кадастр пещер Крыма</font>
                </b>
              </div>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div key={page} className="site-layout-content">
            {page === "main" ? <MainPage /> : null}
            {page === "work" ? <WorkPage /> : null}
            {page === "devices" ? <DevicesPage /> : null}
            {page === "info" ? <InfoPage /> : null}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          💚 Crimea Caves Map ©2022 Created by{" "}
          <img src="./fmt.png" width={"15pt"} /> <span> </span>
          FollowMyTrack group
        </Footer>
      </Layout>
    </>
  );
};

export default LayoutPage;
