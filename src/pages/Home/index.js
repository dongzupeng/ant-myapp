import React from "react";
import { Dropdown, message, Space, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./index.less"; 
import imgUrl from "@/assets/images/bg.jpg"


const items = [
  { label: "退出登录", key: "logout" }, // 菜单项务必填写 key
  { label: "设置", key: "setting" },
  { label: "个人中心", key: "center" },
];

function App() {
  const navigate = useNavigate();
  const onClick = ({ key }) => {
    if (key === "logout") {
      confirm();
    }
  };
  // 退出登录
  const confirm = () => {
    Modal.confirm({
      title: "确认退出吗？",
      icon: <ExclamationCircleOutlined />,
      content: "确认将离开系统！",
      okText: "确认",
      cancelText: "取消",
      onOk() {
        console.log("确认");
        navigate("/login");
      },
      onCancel() {
        console.log("取消");
      },
    });
  };
  return (
    <div className="container">
      <header className="header">
        <div>Header</div>
        <Dropdown menu={{ items, onClick }} placement="bottom" arrow>
          <img className="avatar" src={imgUrl} alt="" />
        </Dropdown>
      </header>
      <div className="content">
        <nav className="sidebar">Sidebar</nav>
        <main className="main-content">Main Content</main>
      </div>
      <footer className="footer">Footer</footer>
    </div>
  );
}

export default App;
