/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import { css } from '@emotion/react';

export const form = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  max-width: 450px;
  padding: 0;
  background: var(--todo-bg);
  border-radius: 5px;
  border-color: none;
`;

export const todoInput = css`
  background-color: transparent;
  border: none;
  height: 46px;
  width: 100%;
  padding: 1rem 0;
  padding-left: 16px;
  color: var(--text);
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 1px;
  &::placeholder {
    color: var(--Dark-Grayish-Blue);
  }
`;
