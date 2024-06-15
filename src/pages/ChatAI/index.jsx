import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import axios from 'axios';
import { marked } from 'marked';
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
  };

  const answer = (value) => {
    const params = {
      prompt: value,
      userId: '#/chat/1718264221941',
      network: true,
      system: '',
      withoutContext: false,
      stream: false,
    };
    axios
      .request({
        url: 'https://api.binjie.fun/api/generateStream?refer__1360=n40x0DcDg7e7wxYqGNueeqBIdxiq7IXUUAvdx',
        method: 'post',
        data: params,
        responseType: 'text',
      })
      .then((res) => {
        console.log(res);
        const fetchedParagraphs = res.data;
        // 使用 marked 将 Markdown 转换为 HTML
        const htmlContent = marked(fetchedParagraphs);
        setParagraphs(htmlContent);
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
      <div className={styles.content}>
        {/* 历史记录 */}
        {history.map((item, index) => (
          <div key={index} className={styles.historyItem}>
            <div className={styles.question}>{item.question}</div>
            <div className={styles.answer}>{item.answer}</div>
          </div>
        ))}
        {questionText && <div className={styles.question}>{questionText}</div>}
        {questionText && (
          <div
            className={styles.answer}
            dangerouslySetInnerHTML={{
              __html: isThinking ? '正在思考中...' : answerText,
            }}
          ></div>
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
