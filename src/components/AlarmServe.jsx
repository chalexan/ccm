import { List } from "antd";
import { FaList, FaProjectDiagram, FaHammer } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";
import { BsFillGearFill } from "react-icons/bs";
import { RiCustomerService2Fill } from "react-icons/ri";

const AlarmServe = () => {
  const data = [
    {
      title: "Техническое решение",
      description:
        "Выезд инженера на объекты по Симферополю и Крыму. Подбор оптимального технического решения под задачи заказчика",
      icon: <FaList size={30} />,
    },
    {
      title: "Проектирование",
      description:
        "Подготовка рабочей документации и утверждение принятых решений",
      icon: <FaProjectDiagram size={30} />,
    },
    {
      title: "Монтаж",
      description:
        "Выполнение монтажных работ: прокладка кабельных линий, установка оборудования, подключение к сетям электропитания и интернет",
      icon: <FaHammer size={30} />,
    },
    {
      title: "Пусконаладка",
      description:
        "Настройка оборудования: охранные датчики и зоны, удаленный доступ, проверка работоспособности ситемы в разных режимах работы",
      icon: <BsFillGearFill size={30} />,
    },
    {
      title: "Обслуживание",
      description:
        "Мы готовы оказать помощь и поддержку нашим клиентам как удаленно так и с выздом на объект",
      icon: <RiCustomerService2Fill size={30} />,
    },
  ];

  return (
    <div>
      <h3>Охранная сигнализация</h3>
      <p>Обеспечим защиту вашего объекта</p>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={item.icon}
              title={<b>{item.title}</b>}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default AlarmServe;
