import React from 'react'
import { css, jsx } from '@emotion/react'

const Arrow = ({ direction, handleClick }) => (
  <div
    onClick={handleClick}
    css={css`
      display: flex;
      position: absolute;
      top: 50%;
      ${direction === 'right' ? `right: 25px` : `left: 25px`};
      height: 50px;
      width: 50px;
      justify-content: center;
      background: white;
      border-radius: 50%;
      cursor: pointer;
      align-items: center;
      transition: transform ease-in 0.1s;
      &:hover {
        transform: scale(1.1);
      }
      img {
        transform: translateX(${direction === 'left' ? '-2' : '2'}px);
        &:focus {
          outline: 0;
        }
      }
    `}
  >
    {direction === 'right' ? <img src="https://dejpknyizje2n.cloudfront.net/svgcustom/clipart/preview/arrow-pointing-right-or-left-up-or-down-2617-13878-300x300.png" /> : <img src="https://png.pngtree.com/png-vector/20190411/ourlarge/pngtree-vector-left-arrow-icon-png-image_925725.jpg" />}
  </div>
)

export default Arrow