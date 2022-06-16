import emailjs from "@emailjs/browser";
import { useState } from "react";
import { Spin, Result, Modal } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";

const InfoPage = () => {
  const [spinner, setSpinner] = useState(false);
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  /* eslint-disable no-template-curly-in-string */

  const validateMessages = {
    required: "${label} обязательно!",
    types: {
      phone: "${label} is not a valid phone!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  /* eslint-enable no-template-curly-in-string */

  const sendFeedBack = () => {
    setSpinner(true);
    const serviceID = "service_wapugkm";
    const templateID = "template_s1flepn";
    const publicKey = "74GkyqpsD4UW_iygm";

    emailjs
      .send(
        serviceID,
        templateID,
        {
          name: document.forms[0].elements[0].value,
          phone: document.forms[0].elements[1].value,
          introduction: document.forms[0].elements[2].value,
        },
        publicKey
      )
      .then(
        (response) => {
          setSpinner(false);

          <Result
            status="success"
            title="Cообщение успешно отправлено!"
            subTitle="Вскоре с вами свяжется наш специалист"
          />;

          Modal.success({
            title: "Cообщение успешно отправлено!",
            content: "Вскоре с вами свяжется наш специалист",
          });

          console.log("SUCCESS!", response.status, response.text);
        },
        (err) => {
          setSpinner(false);

          <Result
            status="error"
            title="Что-то пошло не так!"
            subTitle="Отправка сообщения не удалась :("
          />;

          Modal.error({
            title: "Что-то пошло не так.",
            content: "Отправка сообщения не удалась :(",
          });

          console.log("FAILED...", err);
        }
      );
  };

  return (
    <>
      {spinner ? (
        <>
          <Spin /> <span> </span> Отправка сообщения ...{" "}
        </>
      ) : (
        <Form
          {...layout}
          style={{
            borderRadius: "5px",
            boxShadow: "2px 2px 8px 2px #888888",
            borderStyle: "solid",
            borderColor: "black",
            paddingRight: "15px",
            paddingLeft: "10px",
            paddingTop: "25px",
            backgroundColor: "#f0f8fc",
          }}
          name="nest-messages"
          onFinish={sendFeedBack}
          validateMessages={validateMessages}
        >
          <b>
            <Form.Item
              name={["user", "name"]}
              label="Имя"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </b>
          <b>
            <Form.Item
              name={["user", "phone"]}
              label="Контактный телефон"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </b>

          <Form.Item name={["user", "introduction"]} label="Сообщение">
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button icon={<SendOutlined />} type="primary" htmlType="submit">
              Отправить
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default InfoPage;
