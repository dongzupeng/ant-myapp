import React, { useState, useEffect, useRef } from 'react';
import { Input } from 'antd';
import axios from 'axios';
import styles from './index.module.less';

const ChatAI = () => {
  const [paragraphs, setParagraphs] = useState([]);
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
  const [answerText, setAnswerText] = useState('');
  const [questionText, setQuestion] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [history, setHistory] = useState([]); // 新增历史记录状态
  const [isFirstSend, setIsFirstSend] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false); // 新增正在思考中的状态

  const chatContentRef = useRef(null);
  const { Search } = Input;

  useEffect(() => {
    if (currentParagraphIndex < paragraphs.length) {
      if (currentCharIndex < paragraphs[currentParagraphIndex].length) {
        setTimeout(() => {
          setAnswerText(
            (prevDisplayText) =>
              prevDisplayText +
              paragraphs[currentParagraphIndex][currentCharIndex],
          );
          setCurrentCharIndex((prevIndex) => prevIndex + 1);
        }, 10);
      } else {
        setCurrentParagraphIndex((prevIndex) => prevIndex + 1);
        setCurrentCharIndex(0);
      }
    }
    // 在打字机效果结束后或任何您想要滚动到底部的时机
    const scrollContainer = chatContentRef.current;
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [currentParagraphIndex, currentCharIndex, paragraphs]);

  const send = (value) => {
    setParagraphs([]);
    setAnswerText('');
    setQuestion(value);
    // 清空输入框的值
    setInputValue('');
    setIsThinking(true);
    // 判断是否为第一次发送
    if (isFirstSend) {
      setIsFirstSend(false);
    } else {
      // 如果不是第一次发送，则更新历史记录
      setHistory([
        ...history,
        {
          question: questionText,
          answer: JSON.parse(JSON.stringify(paragraphs)),
        },
      ]);
    }
    // 调用answer函数以获取新的回答并开始打字机效果
    answer(value);
    // 发送后滚动到底部
    const scrollContainer = chatContentRef.current;
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  };

  const answer = (value) => {
    const params = {
      key: 'c4db6e183893b44858fb84eb44636af9',
      question: value,
      uniqueid: 'baby',
      mode: 1,
      priv: 1,
      restype: 1,
    };
    axios
      .request({
        url: 'https://apis.tianapi.com/robot/index',
        method: 'post',
        data: params,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      .then((res) => {
        console.log(res.data);
        const fetchedParagraphs = res.data.result.reply;
        setParagraphs(fetchedParagraphs);
        if (fetchedParagraphs.length > 0) {
          setIsThinking(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsThinking(false);
      });
    // 更新状态和索引以开始新的打字机效果
    setCurrentParagraphIndex(0);
    setCurrentCharIndex(0);
  };

  return (
    <div className={styles.chatAI}>
      <div className={styles.content} ref={chatContentRef}>
        {/* 历史记录 */}
        {history.map((item, index) => (
          <div key={index} className={styles.historyItem}>
            <div className={styles.question}>{item.question}</div>
            <div className={styles.answer}>{item.answer}</div>
          </div>
        ))}
        {questionText && <div className={styles.question}>{questionText}</div>}
        {questionText && (
          <div className={styles.answer}>
            {isThinking ? '正在思考中...' : answerText}
          </div>
        )}
      </div>

      <div className={styles.footer}>
        {/* 添加一个输入框 */}
        <Search
          placeholder='请输入您要搜索的内容'
          enterButton='发送'
          size='large'
          style={{ width: '100%' }}
          onSearch={send}
          value={inputValue} // 设置输入框的值
          onChange={(e) => setInputValue(e.target.value)} // 监听输入值的变化
        />
      </div>
    </div>
  );
};

export default ChatAI;
