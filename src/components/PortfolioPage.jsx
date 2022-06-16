import { AlignCenterOutlined } from "@ant-design/icons";
import { Card, Image } from "antd";
const { Meta } = Card;

const PortfolioPage = () => {
  const gridStyle = {
    // width: "25%",
    textAlign: "center",
  };

  return (
    <>
      <Card bordered={false} bodyStyle={gridStyle}>
        <Card.Grid
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src="./сam1.jpeg" />}
        >
          <Image src="./сam1.jpeg" />
          <Meta
            title="IP видеонаблюдение"
            description="Бюджетный сегмент - уличная камера Trassir (SD flash, Wi-fi). Видеонаблюдение на даче"
          />
        </Card.Grid>

        <Card.Grid
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src="./cam5.jpeg" />}
        >
          <Image src="./cam5.jpeg" />
          <Meta
            title="В магазине"
            description="Установлено 4 камеры Dahua и видеорегистратор. Аккуратный и быстрый монтаж"
          />
        </Card.Grid>

        <Card.Grid
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src="./cam4.jpeg" />}
        >
          <Image src="./cam2.jpeg" />
          <Meta
            title="На складе"
            description="Идеальный вариант - аналоговая система видеонаблюдения и регистратор"
          />
        </Card.Grid>

        <Card.Grid
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src="./cam7.jpeg" />}
        >
          <Image src="./cam7.jpeg" />
          <Meta
            title="Охранная сигнализация"
            description="Охранная сигнализация и видеонаблюдение в процессе монтажа. Плюс пожарные шлейфы"
          />
        </Card.Grid>

        <Card.Grid
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src="./cam8.jpeg" />}
        >
          <Image src="./cam8.jpeg" />
          <Meta
            title="На улице"
            description="Видеонаблюдение за обстановкой снаружи объекта. Плюс микрофон для аудиозаписи"
          />
        </Card.Grid>

        <Card.Grid
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src="./cam3.jpeg" />}
        >
          <Image src="./cam3.jpeg" />
          <Meta
            title="В кооперативе"
            description="Наблюдение за транспортом в гаражном кооперативе. Монтаж на столбах и воздушные линии"
          />
        </Card.Grid>

        <Card.Grid
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src="./cam6.jpeg" />}
        >
          <Image src="./cam6.jpeg" />
          <Meta
            title="Домофон в квартире"
            description="Внутренний монитор видеодомофона и блок управления охранной сигнализацией "
          />
        </Card.Grid>

        <Card.Grid
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src="./cam4.jpeg" />}
        >
          <Image src="./cam4.jpeg" />
          <Meta
            title="Монтажный бокс"
            description="Мы смонтировали систему и разместили слаботочное оборудование в монтажном боксе"
          />
        </Card.Grid>
      </Card>
    </>
  );
};

export default PortfolioPage;
