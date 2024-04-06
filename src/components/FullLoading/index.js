import React from 'react';
import { Spin } from 'antd';
import { createRoot } from 'react-dom/client';

const CONTAINER_ID = 'loading';
// 创建容器

function createContainer() {
  let container = document.getElementById(CONTAINER_ID);
  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', CONTAINER_ID);
    document.body.appendChild(container);
  }
  return container;
}

// 挂载dom
function renderLoading() {
  const container = createContainer();
  if (container) {
    const root = createRoot(container);
    root.render(<Spin spinning={true} fullscreen />);
  }
}

let requestCount = 0;
const FullLoading = {
  show: () => {
    // 显示loading
    if (requestCount === 0) {
      renderLoading();
    }
    requestCount++;
  },
  hide: () => {
    // 移除loading
    requestCount--;
    if (requestCount === 0) {
      const container = document.getElementById(CONTAINER_ID);
      container && document.body.removeChild(container);
    }
  },
};
export default FullLoading;
