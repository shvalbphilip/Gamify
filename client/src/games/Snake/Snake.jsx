import React, { useState, useEffect, useRef } from 'react';

// reaction time and 

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

function Snake() {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState({
    snake: [{ x: 10, y: 10 }],
    food: { x: 15, y: 15 },
    direction: { x: 1, y: 0 },
    gameOver: false,
    score: 0,
    speed: INITIAL_SPEED,
  });
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let gameSpeed = setInterval(() => updateGame(), gameState.speed);

    const gameLoop = () => {
      drawGame(ctx);
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    const updateGame = () => {
      if (gameState.gameOver) return;

      const newHead = {
        x: (gameState.snake[0].x + gameState.direction.x + GRID_SIZE) % GRID_SIZE,
        y: (gameState.snake[0].y + gameState.direction.y + GRID_SIZE) % GRID_SIZE,
      };

      const newSnake = [newHead, ...gameState.snake];

      if (newHead.x === gameState.food.x && newHead.y === gameState.food.y) {
        setGameState((prev) => ({
          ...prev,
          snake: newSnake,
          food: {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
          },
          score: prev.score + 1,
          speed: prev.speed > 50 ? prev.speed - 5 : prev.speed, // Speed up the game
        }));
      } else {
        newSnake.pop();
        setGameState((prev) => ({ ...prev, snake: newSnake }));
      }

      // Check collision with itself
      if (newSnake.slice(1).some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameState((prev) => ({ ...prev, gameOver: true }));
        setHighScore(Math.max(prev.score, highScore));
      }
    };

    const drawGame = (ctx) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw snake with vibrant gradient effect
      gameState.snake.forEach((segment, index) => {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, index === 0 ? '#3B82F6' : '#60A5FA'); // Head is darker blue
        gradient.addColorStop(1, index === 0 ? '#93C5FD' : '#BFDBFE');
        ctx.fillStyle = gradient;
        ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      });

      // Draw animated food with a glowing effect
      ctx.fillStyle = '#F87171';
      ctx.beginPath();
      ctx.arc(
        (gameState.food.x + 0.5) * CELL_SIZE,
        (gameState.food.y + 0.5) * CELL_SIZE,
        CELL_SIZE / 2 + Math.sin(Date.now() / 100) * 2, // Breathing effect
        0,
        2 * Math.PI
      );
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#F87171';
      ctx.fill();

      // Draw score with modern font
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '20px Poppins, sans-serif';
      ctx.fillText(`Score: ${gameState.score}`, 10, 30);
      ctx.fillText(`High Score: ${highScore}`, 10, 60);
    };

    gameLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(gameSpeed);
    };
  }, [gameState, highScore]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key;
      const directions = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
      };

      if (directions[key]) {
        e.preventDefault();
        setGameState((prev) => {
          const newDirection = directions[key];
          // Prevent 180-degree turns
          if (prev.direction.x + newDirection.x !== 0 || prev.direction.y + newDirection.y !== 0) {
            return { ...prev, direction: newDirection };
          }
          return prev;
        });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const restartGame = () => {
    setGameState({
      snake: [{ x: 10, y: 10 }],
      food: { x: 15, y: 15 },
      direction: { x: 1, y: 0 },
      gameOver: false,
      score: 0,
      speed: INITIAL_SPEED,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black/90 dark:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <h1 className="text-4xl font-extrabold mb-4 text-white drop-shadow-lg">Snake Game</h1>
      <canvas
        ref={canvasRef}
        width={GRID_SIZE * CELL_SIZE}
        height={GRID_SIZE * CELL_SIZE}
        className="border-4 border-white rounded-lg shadow-2xl"
      />
      {gameState.gameOver && (
        <div className="mt-4 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-red-600 mb-2 drop-shadow-md">Game Over!</h2>
          <button
            onClick={restartGame}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Restart Game
          </button>
        </div>
      )}
    </div>
  );
}

export default Snake;