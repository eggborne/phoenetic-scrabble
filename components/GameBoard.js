import { useEffect, useState } from "react";
import Space from "./Space";
import Tile from "./Tile";
import { fullBoard, specialSpaceData } from "../scripts/scrabbledata";

export default function GameBoard(props) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    console.log('GameBoard effect!');
    if (!revealed) {
      setRevealed(true);
    }
  }, [revealed]);

  return (
    <>
      <div className='game-board' style={{
        opacity: revealed ? '1' : '0',
        scale: revealed ? '1' : '0.25',
        rotate: revealed ? '0deg' : '-180deg',
      }}>
        {fullBoard.map((row, r) =>
          row.map((space, s) =>
            <Space
              key={`${(r+1)}-${(s+1)}`}
              spaceData={space}
              backgroundColor={space.length ? specialSpaceData[space[0]].color : 'var(--board-color)'}
              label={
                r === 7 && space[0] === 'dw' ?
                  <div className='star'></div>
                  :
                  space.length ?
                  specialSpaceData[space[0]].legend
                  :
                  ''
              }
              contents={
                // <Tile letter='M' size='100%' />
                null
              }
            />
          )
        )}
      </div>
      <style jsx>{`
        .game-board {
          width: var(--board-size);
          height: var(--board-size);
          background-color: #eee;
          border: calc(var(--board-outline-size) * 2.5) solid #eee;          
          display: grid;
          grid-template-columns: repeat(15, 1fr);
          grid-template-rows: repeat(15, 1fr);
          justify-items: center;
          align-items: center;
          box-shadow: 0 0 0.25rem #00000099;
          
          // overflow: hidden;

          transition: all 1000ms ease-out;
        }
        .game-board::after {
          content: '';
          position: absolute;
          width: calc(var(--board-size) * 0.9835);
          height: calc(var(--board-size) * 0.9835);
          border: calc(var(--board-outline-size) / 2) solid #333;
        }
        h1 {
          font-size: calc(var(--header-height) / 2);
        }
        .star {
          --star-size: calc(var(--board-size) / 40);
          font-size: var(--star-size);
          position: relative;
          transform: translateY(-80%);
          
          border-right:  .3em solid transparent;
          border-bottom: .7em solid #333;
          border-left:   .3em solid transparent;
        
          &:before, &:after {
            content: '';
            
            display: block;
            width: 0;
            height: 0;
            
            position: absolute;
            top: .6em;
            left: -1em;
          
            border-right:  1em solid transparent;
            border-bottom: .7em  solid #333;
            border-left:   1em solid transparent;
          
            transform: rotate(-35deg);
          }
          
          &:after {  
            transform: rotate(35deg);
          }
        }
      `}</style>
    </>
  );
}