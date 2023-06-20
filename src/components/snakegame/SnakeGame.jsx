import React, { useState, useEffect, useRef } from 'react';

const ROWS = 20;
const COLS = 20;
const CELL_SIZE = 22;
const DIRECTIONS = {
    UP: 'UP',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
};
const INITIAL_SPEED = 200;

const getRandomFoodPosition = () => {
    return {
        row: Math.floor(Math.random() * ROWS),
        col: Math.floor(Math.random() * COLS),
    };
};

const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const tick = () => {
            savedCallback.current();
        };

        if (delay !== null) {
            const intervalId = setInterval(tick, delay);
            return () => {
                clearInterval(intervalId);
            };
        }
    }, [delay]);
};

const SnakeGame = () => {
    const [snake, setSnake] = useState([{ row: Math.floor(ROWS / 2), col: Math.floor(COLS / 2) }]);
    const [food, setFood] = useState(getRandomFoodPosition());
    const [direction, setDirection] = useState(DIRECTIONS.RIGHT);
    const [speed, setSpeed] = useState(INITIAL_SPEED);
    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState(0);

    const handleKeyDown = (event) => {
        const { key } = event;
        if (!isGameOver) {
            if (key === 'ArrowUp' && direction !== DIRECTIONS.DOWN) {
                event.preventDefault();
                setDirection(DIRECTIONS.UP);
            } else if (key === 'ArrowDown' && direction !== DIRECTIONS.UP) {
                event.preventDefault();
                setDirection(DIRECTIONS.DOWN);
            } else if (key === 'ArrowLeft' && direction !== DIRECTIONS.RIGHT) {
                event.preventDefault();
                setDirection(DIRECTIONS.LEFT);
            } else if (key === 'ArrowRight' && direction !== DIRECTIONS.LEFT) {
                event.preventDefault();
                setDirection(DIRECTIONS.RIGHT);
            }
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [direction]);

    useInterval(() => {
        moveSnake();
    }, speed);

    const startGame = () => {
        setSnake([{ row: Math.floor(ROWS / 2), col: Math.floor(COLS / 2) }]);
        setFood(getRandomFoodPosition());
        setDirection(DIRECTIONS.RIGHT);
        setSpeed(INITIAL_SPEED);
        setIsGameOver(false);
        setScore(0);
    };

    const endGame = () => {
        setIsGameOver(true);
    };

    const moveSnake = () => {
        const head = { ...snake[0] };
        switch (direction) {
            case DIRECTIONS.UP:
                head.row--;
                break;
            case DIRECTIONS.DOWN:
                head.row++;
                break;
            case DIRECTIONS.LEFT:
                head.col--;
                break;
            case DIRECTIONS.RIGHT:
                head.col++;
                break;
            default:
                break;
        }

        if (
            head.row < 0 ||
            head.row >= ROWS ||
            head.col < 0 ||
            head.col >= COLS ||
            snake.some((cell) => cell.row === head.row && cell.col === head.col)
        ) {
            endGame();
            return;
        }

        const newSnake = [head, ...snake];
        if (head.row === food.row && head.col === food.col) {
            setFood(getRandomFoodPosition());
            setScore((prevScore) => prevScore + 1);
        } else {
            newSnake.pop();
        }

        setSnake(newSnake);
    };

    const renderCell = (row, col, isSnake, isFood) => {
        const cellStyle = {
            width: CELL_SIZE,
            height: CELL_SIZE,
            backgroundColor: isSnake ? '#333' : isFood ? '#f00' : '#fff',
            border: '1px solid #ccc',
        };

        return <div key={`${row}-${col}`} style={cellStyle}></div>;
    };

    const handleDirectionButtonClick = (newDirection) => {
        if (!isGameOver) { setDirection(newDirection); }
    };

    useEffect(() => {
        const handleArrowKeyScrolling = (event) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
                event.preventDefault();
            }
        };

        window.addEventListener('keydown', handleArrowKeyScrolling);
        return () => {
            window.removeEventListener('keydown', handleArrowKeyScrolling);
        };
    }, []);

    return (
        <div style={{}}>
            <h2>Snake Game</h2>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${COLS}, ${CELL_SIZE}px)` }}>
                    {Array.from({ length: ROWS }).map((_, row) =>
                        Array.from({ length: COLS }).map((_, col) => {
                            const isSnake = snake.some((cell) => cell.row === row && cell.col === col);
                            const isFood = food.row === row && food.col === col;
                            return renderCell(row, col, isSnake, isFood);
                        })
                    )}
                </div>
            </div>
            {isGameOver ? <></> : <div style={{ marginTop: '20px' }}>
                <button style={{padding: '20px'}} onClick={() => handleDirectionButtonClick(DIRECTIONS.LEFT)}>Left</button>
                <button style={{padding: '20px'}} onClick={() => handleDirectionButtonClick(DIRECTIONS.UP)}>Up</button>
                <button style={{padding: '20px'}} onClick={() => handleDirectionButtonClick(DIRECTIONS.DOWN)}>Down</button>
                <button style={{padding: '20px'}} onClick={() => handleDirectionButtonClick(DIRECTIONS.RIGHT)}>Right</button>
            </div>
            }
            <p style={{ fontSize: '20px' }}>Score: {score}</p>
            {isGameOver ? (
                <div>
                    <p style={{ color: 'red', fontSize: '14px' }}>Game Over!</p>
                    <button onClick={startGame}>Restart Game</button>
                </div>
            ) : null}
        </div>
    );
};

export default SnakeGame;
