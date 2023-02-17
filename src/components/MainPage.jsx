import { PageHeader, Card, Avatar } from "antd";
import VideoContentYT from "react-video-content-youtube";
import { Tag } from "antd";
import {
  HeartOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";

const MainPage = () => {
  const { Meta } = Card;

  return (
    <div className="alphaback">
      <PageHeader
        className="site-page-header"
        style={{ width: "100%" }}
        extra={<a href="#">Добавить пост</a>}
        title="Публикации"
      />

      <Card
        title={
          <>
            <Meta
              // avatar={
              //   <Avatar
              //     //src="https://sun1-20.userapi.com/s/v1/ig2/idc5JnQDh8ic7hoQb1rsqNFA6mve0sJV2lI6yd5mEwPjblR-hOaO40fh0ik1Rkaympjx24LQvCWtH6UG5NvK8h7Z.jpg"
              //     alt="Дарья Мокрушина"
              //     style={{ backgroundColor: "green", verticalAlign: "middle" }}
              //     size="large"
              //   >
              //     Д
              //   </Avatar>
              // }
              title="Пещера Ход Конём - спортивное прохождение"
              style={{
                "font-size": "small",
              }}
              description={
                <>
                  <Tag color="red">Пещеры</Tag> 14 фев. 2023 г. 9:23
                  {/* {new Date().toLocaleString("ru", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    timezone: "UTC",
                    hour: "numeric",
                    minute: "numeric",
                  })} */}
                </>
              }
            />
          </>
        }
        extra={<a href="#">...</a>}
        style={{
          width: "100%",
        }}
        actions={[
          <HeartOutlined key="like" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        🎯Верëвка - 300м.
        <br /> 🎯Крепëж - около 25-30 комплектов
        <br /> 🎯11 часов времени.
        <br />
        <br /> 📌Особенность навески
        <br /> Во входном колодце очень большие пролëты(по 20-30 метров) Крепëж
        хороший только в определëнных местах, в остальном очень много ржавого и
        непригодного. Ошибкой было то, что на начало взяли куски 60+40 метров.
        Узлы в колодце совсем проходить не хотелось, поэтому концы соединяли на
        перестëжках. В итоге пройдя только 2/3 колодца первая сотка уже
        закончилась... <br />
        <br />
        📌Ожидания/реальность
        <br /> Как и в случае с #Кошина200, представления о пещере #Ходконëм
        были такие, что абсолютно ничего кроме сплошного вертикального чебурека,
        страданий и шкуродëрства там увидеть нельзя. В итоге нервы удалось
        потрепать всего у одной узости, и то не надолго. Много где мешала каска.
        В последней узости, где надо перевалиться направо и вниз за гладкий
        камень с ручьями, каску Нужно Было Снять! чего я не сделала, и меня
        хорошечно ей придушило😃 Когда тело с руками провалилось вниз,
        отстегнуть каску уже никак не получалось, Сашка спас, я полезла дальше
        до конца верëвки. Интересно, что после этого как-будто второе дыхание
        открылось... Вобщем пещера интересная и довольно спортивная, однако
        страх оборванной верëвки в большом колодце, и страх потерять сознание в
        меандре пока всë ещë присутствует.
        <br />
        <br />
        <div>
          <VideoContentYT src="IMlGadlnMPQ" params={{ autoPlay: true }} />
        </div>
      </Card>
      <br />
      <Card
        title={
          <>
            <Meta
              // avatar={
              //   <Avatar
              //     //src="https://sun1-20.userapi.com/s/v1/ig2/idc5JnQDh8ic7hoQb1rsqNFA6mve0sJV2lI6yd5mEwPjblR-hOaO40fh0ik1Rkaympjx24LQvCWtH6UG5NvK8h7Z.jpg"
              //     alt="Дарья Мокрушина"
              //     style={{ backgroundColor: "green", verticalAlign: "middle" }}
              //     size="large"
              //   >
              //     Д
              //   </Avatar>
              // }
              title="Пещера Кошина - спортивное прохождение"
              style={{
                "font-size": "small",
              }}
              description={
                <>
                  <Tag color="red">Пещеры</Tag> 6 окт. 2022 г. 17:00
                  {/* {new Date().toLocaleString("ru", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    timezone: "UTC",
                    hour: "numeric",
                    minute: "numeric",
                  })} */}
                </>
              }
            />
          </>
        }
        extra={<a href="#">...</a>}
        style={{
          width: "100%",
        }}
        actions={[
          <HeartOutlined key="like" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        Полтора года назад, увидев схему пещеры, я очень захотела туда сходить.
        Было пару разведок. Но опыта и снаряжения было недостаточно. И вот
        наконец мы это сделали. Я увидела этого чувака вживую😃
        <br />И предположения о категоричной сложности этой пещеры были
        развеяны.
        <br />
        <br />
        <div>
          <VideoContentYT src="vvDGGouBDlw" params={{ autoPlay: true }} />
        </div>
      </Card>

      <p style={{ padding: "0 15px" }}>
        Данный ресурс является проектом cообщества FollowMyTrack
      </p>
      <p style={{ padding: "0 15px" }}>
        Мы - исследователи пещер, путешественники и увлеченные люди. Мы собрали
        в едином каталоге данные по подземным полостям горного Крыма. Тут можно
        найти координаты пещер и посмотреть их на карте. По нашему кадастру
        можно производить поиск и фильтрацию пещер по заданным критериям.
      </p>
      <p style={{ padding: "0 15px" }}>
        Мы пополняем данные находя новые пещеры и новые ходы существующих пещер
        Приглашаем к участию в наших проектах. Связаться с нами можно в форме
        обратной связи или в сообществе{" "}
        <a href="http://vk.com/followmytrack">FollowMyTrack </a> в VK.
      </p>
    </div>
  );
};

export default MainPage;
