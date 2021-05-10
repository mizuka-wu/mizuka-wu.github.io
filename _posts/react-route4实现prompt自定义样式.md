---
title: react-route4实现prompt自定义样式
tags:
  - 前端
  - css
  - js
  - react
  - react-route
  - prompt
  - 退出校验
date: 2019-10-11 22:11:57
categories: 可以公开的情报
---

# 原因

项目中需要对正在编辑的页面做监测是否退出页面，退出则弹出提示，本身使用了 react-route，无奈 ui 不满足自定义的样式（嫌丑）所以通过自定义方案，做了一个新的版本

当然还是通过[https://medium.com/@michaelchan_13570/using-react-router-v4-prompt-with-custom-modal-component-ca839f5faf39](https://medium.com/@michaelchan_13570/using-react-router-v4-prompt-with-custom-modal-component-ca839f5faf39)来实现的

## ant-design 的代码

```typescript
import React from "react";
import * as H from "history";
import { Modal, Icon, Button } from "antd";
import { Prompt } from "react-router-dom";
import { withRouter, RouteComponentProps } from "react-router";

export interface PromptProps extends RouteComponentProps {
  message: string | ((location: H.Location) => string | boolean);
  when?: boolean;
}

export class RouteLeavingGuard extends React.Component<
  PromptProps,
  {
    modalVisible: boolean;
    lastLocation: H.Location | null;
    confirmedNavigation: boolean;
  }
> {
  constructor(props: PromptProps) {
    super(props);
    this.state = {
      modalVisible: false,
      lastLocation: null,
      confirmedNavigation: false
    };
  }
  showModal = (location: H.Location) =>
    this.setState({
      modalVisible: true,
      lastLocation: location
    });
  closeModal = (callback?: () => void) =>
    this.setState(
      {
        modalVisible: false
      },
      callback
    );
  handleBlockedNavigation = (nextLocation: H.Location) => {
    const { confirmedNavigation } = this.state;
    if (!confirmedNavigation) {
      this.showModal(nextLocation);
      return false;
    }

    return true;
  };

  handleConfirmNavigationClick = () =>
    this.closeModal(() => {
      const { lastLocation } = this.state;
      const { history } = this.props;
      if (lastLocation) {
        this.setState(
          {
            confirmedNavigation: true
          },
          () => {
            /**
             * 走跳转
             */
            history.push(lastLocation.pathname + lastLocation.search);
          }
        );
      }
    });

  render() {
    const { when, message } = this.props;
    const { modalVisible, lastLocation } = this.state;
    return (
      <>
        <Prompt when={when} message={this.handleBlockedNavigation} />
        <Modal
          visible={modalVisible}
          okText="确定"
          closable={false}
          maskClosable={false}
          keyboard={false}
          footer={null}
          cancelText="取消"
          width={420}
          onCancel={() => this.closeModal()}
          onOk={this.handleConfirmNavigationClick}
        >
          {typeof message === "function" ? (
            lastLocation && message(lastLocation)
          ) : (
            <div>
              <Icon
                style={{
                  marginLeft: 8,
                  marginRight: 16,
                  fontSize: 20,
                  position: "relative",
                  top: 2
                }}
                type="question-circle"
                theme="twoTone"
                twoToneColor={"#faad14"}
              />
              {message}
              <div style={{ textAlign: "center", marginTop: 24 }}>
                <Button
                  style={{ marginRight: 16 }}
                  type={"primary"}
                  onClick={this.handleConfirmNavigationClick}
                >
                  确定
                </Button>
                <Button onClick={() => this.closeModal()}>取消</Button>
              </div>
            </div>
          )}
        </Modal>
      </>
    );
  }
}
export default withRouter(RouteLeavingGuard);
```
