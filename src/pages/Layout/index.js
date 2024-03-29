import {
  GithubFilled,
  InfoCircleFilled,
  PlusCircleFilled,
  QuestionCircleFilled,
  SearchOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { PageContainer, ProCard, ProLayout } from "@ant-design/pro-components";
import { ProConfigProvider } from "@ant-design/pro-provider";
import {
  Button,
  ConfigProvider,
  Divider,
  Dropdown,
  Input,
  Popover,
  theme,
  message,
  Modal,
} from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultProps from "./_defaultProps";

export default () => {
  const [pathname, setPathname] = useState("/list/sub-page/sub-sub-page1");
  const navigate = useNavigate()
  const { confirm } = Modal;
  const showConfirm = () => {
    confirm({
      title: "确认要退出登录吗?",
      icon: <ExclamationCircleOutlined />,
      content: "",
      onOk() {
        console.log("OK");
        navigate('/login')
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const onClick = ({ key }) => {
    showConfirm();
  };

  return (
    <ProConfigProvider dark={true}>
      <ProLayout
        {...defaultProps}
        splitMenus
        location={{
          pathname,
        }}
        menu={{
          collapsedShowGroupTitle: true,
        }}
        avatarProps={{
          src: "https://t14.baidu.com/it/u=144570788,2814225469&fm=220&app=103&size=f256,170&n=0&f=JPEG&fmt=auto?sec=1711818000&t=9598f8d9a65314e9683bd28ce778929f",
          size: "small",
          title: "头文字D",
          render: (props, dom) => {
            return (
              <Dropdown
                menu={{
                  onClick,
                  items: [
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "退出登录",
                    },
                  ],
                }}
                placement="top"
              >
                {dom}
              </Dropdown>
            );
          },
        }}
        actionsRender={(props) => {
          if (props.isMobile) return [];
          return [
            props.layout !== "side" ? (
              <div
                key="SearchOutlined"
                aria-hidden
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginInlineEnd: 24,
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <Input
                  style={{
                    borderRadius: 4,
                    marginInlineEnd: 12,
                    backgroundColor: "rgba(0,0,0,0.03)",
                  }}
                  prefix={
                    <SearchOutlined
                      style={{
                        color: "rgba(0, 0, 0, 0.15)",
                      }}
                    />
                  }
                  placeholder="搜索方案"
                  variant="borderless"
                />
                <PlusCircleFilled
                  style={{
                    color: "var(--ant-primary-color)",
                    fontSize: 24,
                  }}
                />
              </div>
            ) : undefined,
            <InfoCircleFilled key="InfoCircleFilled" />,
            <QuestionCircleFilled key="QuestionCircleFilled" />,
            <GithubFilled key="GithubFilled" />,
          ];
        }}
        menuFooterRender={(props) => {
          if (props?.collapsed) return undefined;
          return (
            <p
              style={{
                textAlign: "center",
                paddingBlockStart: 12,
              }}
            >
              Power by Ant Design
            </p>
          );
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        menuItemRender={(item, dom) => (
          <a
            onClick={() => {
              setPathname(item.path || "/welcome");
            }}
          >
            {dom}
          </a>
        )}
      >
        <PageContainer
          extra={[
            <Button key="3">操作</Button>,
            <Button key="2">操作</Button>,
            <Button key="1" type="primary">
              主操作
            </Button>,
          ]}
          footer={[
            <Button key="3">重置</Button>,
            <Button key="2" type="primary">
              提交
            </Button>,
          ]}
        >
          <ProCard
            style={{
              height: "200vh",
              minHeight: 800,
            }}
          >
            <div />
          </ProCard>
        </PageContainer>
      </ProLayout>
    </ProConfigProvider>
  );
};
