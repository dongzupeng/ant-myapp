import React, { useState, useEffect } from 'react';
import { getUserInfo } from '@/api/getUser';
import styles from './index.module.less';

const User = () => {
  const [activeSection, setActiveSection] = useState('#about');
  const type = [
    {
      name: 'About',
      section: '#about',
    },
    {
      name: 'Experience',
      section: '#experience',
    },
    {
      name: 'Contact',
      section: '#contact',
    },
  ];
  const imgUrl =
    'https://pic.netbian.com/uploads/allimg/220104/234553-1641311153631c.jpg?w=162&auto=format';
  // 初始化时设置一次卡片激活状态
  useEffect(() => {
    document.documentElement.setAttribute('data-state', activeSection);
  }, [activeSection]);

  // 点击按钮切换不同的内容
  const handleButtonClick = (e) => {
    const targetSection = e.target.getAttribute('data-section');
    setActiveSection(targetSection);
    document.documentElement.setAttribute('data-state', targetSection);
  };
  const buttons = (
    <div className={styles.card__buttons}>
      {/* 遍历按钮 */}
      {type.map((item) => {
        return (
          <button
            key={item.section}
            data-section={item.section}
            onClick={handleButtonClick}
            className={activeSection === item.section ? styles.is__active : ''}
          >
            {item.name}
          </button>
        );
      })}
    </div>
  );
  const sections = (
    <>
      {/* about部分 */}
      {activeSection === '#about' && (
        <div
          className={
            (styles.card__section,
            activeSection === '#about' ? styles.is__active : '')
          }
          id='about'
        >
          {/* ABOUT 内容的 JSX */}
          <div className={styles.card__content}>
            <div className={styles.card__subtitle}>ABOUT</div>
            <p className={styles.card__desc}>
              Whatever tattooed stumptown art party sriracha gentrify hashtag
              intelligentsia readymade schlitz brooklyn disrupt.
            </p>
          </div>
          <div className={styles.card__social}>
            <a href='#'>
              <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <path d='M15.997 3.985h2.191V.169C17.81.117 16.51 0 14.996 0c-3.159 0-5.323 1.987-5.323 5.639V9H6.187v4.266h3.486V24h4.274V13.267h3.345l.531-4.266h-3.877V6.062c.001-1.233.333-2.077 2.051-2.077z' />
              </svg>
            </a>
            <a href='#'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                <path d='M512 97.248c-19.04 8.352-39.328 13.888-60.48 16.576 21.76-12.992 38.368-33.408 46.176-58.016-20.288 12.096-42.688 20.64-66.56 25.408C411.872 60.704 384.416 48 354.464 48c-58.112 0-104.896 47.168-104.896 104.992 0 8.32.704 16.32 2.432 23.936-87.264-4.256-164.48-46.08-216.352-109.792-9.056 15.712-14.368 33.696-14.368 53.056 0 36.352 18.72 68.576 46.624 87.232-16.864-.32-33.408-5.216-47.424-12.928v1.152c0 51.008 36.384 93.376 84.096 103.136-8.544 2.336-17.856 3.456-27.52 3.456-6.72 0-13.504-.384-19.872-1.792 13.6 41.568 52.192 72.128 98.08 73.12-35.712 27.936-81.056 44.768-130.144 44.768-8.608 0-16.864-.384-25.12-1.44C46.496 446.88 101.6 464 161.024 464c193.152 0 298.752-160 298.752-298.688 0-4.64-.16-9.12-.384-13.568 20.832-14.784 38.336-33.248 52.608-54.496z' />
              </svg>
            </a>
            <a href='#'>
              <svg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'>
                <path d='M301 256c0 24.852-20.148 45-45 45s-45-20.148-45-45 20.148-45 45-45 45 20.148 45 45zm0 0' />
                <path d='M332 120H180c-33.086 0-60 26.914-60 60v152c0 33.086 26.914 60 60 60h152c33.086 0 60-26.914 60-60V180c0-33.086-26.914-60-60-60zm-76 211c-41.355 0-75-33.645-75-75s33.645-75 75-75 75 33.645 75 75-33.645 75-75 75zm86-146c-8.285 0-15-6.715-15-15s6.715-15 15-15 15 6.715 15 15-6.715 15-15 15zm0 0' />
                <path d='M377 0H135C60.562 0 0 60.563 0 135v242c0 74.438 60.563 135 135 135h242c74.438 0 135-60.563 135-135V135C512 60.562 451.437 0 377 0zm45 332c0 49.625-40.375 90-90 90H180c-49.625 0-90-40.375-90-90V180c0-49.625 40.375-90 90-90h152c49.625 0 90 40.375 90 90zm0 0' />
              </svg>
            </a>
            <a href='#'>
              <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <path d='M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909A2.884 2.884 0 002.882 0z' />
              </svg>
            </a>
          </div>
        </div>
      )}
      {/* experience部分 */}
      {activeSection === '#experience' && (
        <div
          className={
            (styles.card__section,
            activeSection === '#experience' ? styles.is__active : '')
          }
          id='experience'
        >
          <div className={styles.card__content}>
            <div className={styles.card__subtitle}>WORK EXPERIENCE</div>
            <div className={styles.card__timeline}>
              <div className={styles.card__item} data-year='2014'>
                <div className={styles.card__item__title}>
                  Front-end Developer at <span>JotForm</span>
                </div>
                <div className={styles.card__item__desc}>
                  Disrupt stumptown retro everyday carry unicorn.
                </div>
              </div>
              <div className={styles.card__item} data-year='2016'>
                <div className={styles.card__item__title}>
                  UI Developer at <span>GitHub</span>
                </div>
                <div className={styles.card__item__desc}>
                  Developed new conversion funnels and disrupt.
                </div>
              </div>
              <div className={styles.card__item} data-year='2018'>
                <div className={styles.card__item__title}>
                  Illustrator at <span>Google</span>
                </div>
                <div className={styles.card__item__desc}>
                  Onboarding illustrations for App.
                </div>
              </div>
              <div className={styles.card__item} data-year='2020'>
                <div className={styles.card__item__title}>
                  Full-Stack Developer at <span>CodePen</span>
                </div>
                <div className={styles.card__item__desc}>
                  Responsible for the encomposing brand expreience.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* contact部分 */}
      {activeSection === '#contact' && (
        <div
          className={
            (styles.card__section,
            activeSection === '#contact' ? styles.is__active : '')
          }
          id='contact'
        >
          <div className={styles.card__content}>
            <div className={styles.card__subtitle}>CONTACT</div>
            <div className={styles.card__contact__wrapper}>
              <div className={styles.card__contact}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z' />
                  <circle cx='12' cy='10' r='3' />
                </svg>
                Algonquin Rd, Three Oaks Vintage, MI, 49128
              </div>
              <div className={styles.card__contact}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z' />
                </svg>
                (269) 756-9809
              </div>
              <div className={styles.card__contact}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' />
                  <path d='M22 6l-10 7L2 6' />
                </svg>
                william@rocheald.com
              </div>
              <button className={styles.contact__me}>WORK TOGETHER</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
  useEffect(() => {
    getUserInfo().then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div className={styles.card} data-state='#about'>
      <div className={styles.card__header}>
        <div
          className={styles.card__cover}
          style={{
            backgroundImage: `url(${imgUrl})`,
          }}
        ></div>
        <img className={styles.card__avatar} src={imgUrl} alt='avatar' />
        <h1 className={styles.card__fullname}>William Rocheald</h1>
        <h2 className={styles.card__jobtitle}>UI Developer</h2>
      </div>
      <div className={styles.card__main}>
        {/* 内容部分 */}
        {sections}
        {/* 切换按钮 */}
        {buttons}
      </div>
    </div>
  );
};
export default User;
