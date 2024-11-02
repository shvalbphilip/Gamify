import React, { useState, useEffect } from 'react';

const GRID_SIZE = 4;
const STARTING_TILES = 2;


const tileColors = {
    0: 'bg-gray-300',
    2: 'bg-gray-200 text-gray-800',
    4: 'bg-yellow-200 text-gray-800',
    8: 'bg-orange-400 text-white',
    16: 'bg-orange-500 text-white',
    32: 'bg-orange-600 text-white',
    64: 'bg-red-500 text-white',
    128: 'bg-yellow-300 text-white',
    256: 'bg-yellow-400 text-white',
    512: 'bg-yellow-500 text-white',
    1024: 'bg-green-400 text-white',
    2048: 'bg-green-500 text-white',
};

function getRandomTilePosition(grid) {
    const emptyCells = [];
    grid.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell === 0) emptyCells.push({ x, y });
        });
    });
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    return randomCell;
}

function getInitialGrid() {
    const grid = Array(GRID_SIZE)
        .fill(0)
        .map(() => Array(GRID_SIZE).fill(0));

    for (let i = 0; i < STARTING_TILES; i++) {
        const { x, y } = getRandomTilePosition(grid);
        grid[y][x] = Math.random() < 0.9 ? 2 : 4;
    }

    return grid;
}

function cloneGrid(grid) {
    return grid.map((row) => [...row]);
}

function rotateGrid(grid) {
    const newGrid = Array(GRID_SIZE)
        .fill(0)
        .map(() => Array(GRID_SIZE).fill(0));

    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            newGrid[x][GRID_SIZE - 1 - y] = grid[y][x];
        }
    }

    return newGrid;
}

function slideRow(row) {
    const arr = row.filter((val) => val);
    const missing = GRID_SIZE - arr.length;
    const zeros = Array(missing).fill(0);
    return [...arr, ...zeros];
}

function combineRow(row) {
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] !== 0 && row[i] === row[i + 1]) {
            row[i] = row[i] * 2;
            row[i + 1] = 0;
        }
    }
    return row;
}

function move(grid) {
    let newGrid = cloneGrid(grid);
    let didMove = false;

    newGrid = newGrid.map((row) => {
        let newRow = slideRow(row);
        newRow = combineRow(newRow);
        newRow = slideRow(newRow);
        if (newRow.join('') !== row.join('')) {
            didMove = true;
        }
        return newRow;
    });

    return { newGrid, didMove };
}

function addNewTile(grid) {
    const newGrid = cloneGrid(grid);
    const { x, y } = getRandomTilePosition(newGrid);
    newGrid[y][x] = Math.random() < 0.9 ? 2 : 4;
    return newGrid;
}

function isGameOver(grid) {
    const moves = ['left', 'right', 'up', 'down'];
    for (let move of moves) {
        const { didMove } = handleMove(grid, move);
        if (didMove) return false;
    }
    return true;
}

function handleMove(grid, direction) {
    let newGrid = cloneGrid(grid);
    let didMove;

    if (direction === 'left') {
        ({ newGrid, didMove } = move(grid));
    } else if (direction === 'right') {
        newGrid = rotateGrid(rotateGrid(grid));
        ({ newGrid, didMove } = move(newGrid));
        newGrid = rotateGrid(rotateGrid(newGrid));
    } else if (direction === 'up') {
        newGrid = rotateGrid(rotateGrid(rotateGrid(grid)));
        ({ newGrid, didMove } = move(newGrid));
        newGrid = rotateGrid(newGrid);
    } else if (direction === 'down') {
        newGrid = rotateGrid(grid);
        ({ newGrid, didMove } = move(newGrid));
        newGrid = rotateGrid(rotateGrid(rotateGrid(newGrid)));
    }

    return { newGrid, didMove };
}

function TFE() {
    const [grid, setGrid] = useState(getInitialGrid());
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (gameOver) return;
            const key = e.key;
            let direction;
            if (key === 'ArrowUp') direction = 'up';
            if (key === 'ArrowDown') direction = 'down';
            if (key === 'ArrowLeft') direction = 'left';
            if (key === 'ArrowRight') direction = 'right';

            if (direction) {
                const { newGrid, didMove } = handleMove(grid, direction);
                if (didMove) {
                    const updatedGrid = addNewTile(newGrid);
                    setGrid(updatedGrid);
                    if (isGameOver(updatedGrid)) {
                        setGameOver(true);
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [grid, gameOver]);

    const restartGame = () => {
        setGrid(getInitialGrid());
        setGameOver(false);
        setScore(0);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
            <h1 className="text-4xl font-bold mb-4 text-white">2048 Game</h1>
            <div className="grid grid-cols-4 gap-4 bg-gray-600 p-4 rounded-lg">
                {grid.map((row, rowIndex) =>
                    row.map((cell, cellIndex) => (
                        <div
                            key={`${rowIndex}-${cellIndex}`}
                            className={`w-16 h-16 flex items-center justify-center text-2xl font-bold rounded-lg ${tileColors[cell]}`}
                        >
                            {cell !== 0 ? cell : ''}
                        </div>
                    ))
                )}
            </div>
            {gameOver && (
                <div className="mt-4 text-red-600 text-2xl">
                    <h2>Game Over!</h2>
                    <button
                        onClick={restartGame}
                        className="px-4 py-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Restart
                    </button>
                </div>
            )}
        </div>
    );
}

export default TFE;