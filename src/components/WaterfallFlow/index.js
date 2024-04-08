import React, { useState, useEffect } from 'react';
import './WaterfallFlow.less'; // 样式文件

const WaterfallFlow = ({ items, columnCount }) => {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    // 初始化列
    const initialColumns = Array.from({ length: columnCount }, () => []);
    setColumns(initialColumns);
  }, [columnCount]);

  useEffect(() => {
    // 更新列
    const updatedColumns = Array.from({ length: columnCount }, () => []);

    items.forEach((item, index) => {
      const columnIndex = index % columnCount;
      updatedColumns[columnIndex].push(item);
    });

    setColumns(updatedColumns);
  }, [items, columnCount]);

  return (
    <div className='waterfall-flow'>
      {columns.map((column, index) => (
        <div key={index} className='waterfall-column'>
          {column.map((item, itemIndex) => (
            <div key={itemIndex} className='waterfall-item'>
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default WaterfallFlow;
