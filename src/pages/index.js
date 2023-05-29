/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import dynamic from 'next/dynamic';
import { css } from '@emotion/react';
import Header from '../components/header/header';
import MainSec from '../components/MainSection/mainSection';
import { useAuth } from '../lib/auth';
import Head from 'next/head';
import {
  btnWrapper,
  signInTitle,
  githubBtn,
  gmailBtn,
} from '../components/login/login.css';
import { Git } from '../components/icons/githubLogo';
import { Gmail } from '../components/icons/gmailLogo';

const ThemeToggle = dynamic(
  () => import('../components/ToggleSwitch/ToggleSwitch'),
  {
    ssr: false,
  }
);

export default function Home() {
  const auth = useAuth();
  if (!auth.user) {
    return (
      <>
        <Head>
          <title>Todo app</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <div
          css={css`
            padding: 1rem 5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: skyblue;
            @media (max-width: 450px) {
              padding: 1rem;
            }
          `}
        >
          <span
            css={css`
              text-transform: uppercase;
              color: var(--text);
              letter-spacing: 2px;
              font-weight: bold;
              font-size: 1.5rem;
            `}
          >
            todolist app
          </span>
          
          <div style={{display: 'flex'}}><ThemeToggle style={{margin: "5px"}} />
          <a 
            href="https://github.com/louis2688"
            aria-label="Link to github repo"
            target="_blank"
            rel="noreferrer"
            style={{paddingTop: "5px", marginLeft: "5px"}}
          >
            <Git style={{marginTop: "10px"}} />
          </a></div>
        </div>
        
        <div css={btnWrapper}>
          <h2 css={signInTitle}>Sign in</h2>
          <button
            css={githubBtn}
            onClick={(e) => {
              auth.signinWithGitHub();
            }}
          >
            Login with <Git />
          </button>
          <button
            css={gmailBtn}
            onClick={(e) => {
              auth.signinWithGoogle();
            }}
          >
            Login with <Gmail />
          </button>
        </div>
      </>
    );
  }
  return (
    <>
      <Header />
      <MainSec />
      <footer
        css={css`
          margin: 50px 0;
          display: grid;
          place-items: center;
          color: var(--text);
        `}
      >
        <p>Features:</p>
        <p>Can do CRUD Operation</p>
        <p>Drag and Drop Capability</p>
        <p>Sort List Items</p>

        <p>
          Made by
          <a
            href="https://github.com/louis2688"
            css={css`
              text-decoration: none;
              color: var(--Check-BG-end);
            `}
          >
            {' '}
            Louis M
          </a>
        </p>
      </footer>
    </>
  );
}