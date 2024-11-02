import React, { useState, useEffect } from 'react';
import { Dice6, Crown, RotateCcw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const BOARD_SIZE = 100;
const LETTERS = {
    10: { type: 'boost', target: 30, letter: 'A', color: 'bg-teal-400' },
    25: { type: 'penalty', target: 5, letter: 'B', color: 'bg-pink-400' },
    50: { type: 'boost', target: 70, letter: 'C', color: 'bg-yellow-400' },
    75: { type: 'penalty', target: 55, letter: 'D', color: 'bg-purple-400' },
};

function SnakesAndLadders() {
    const [players, setPlayers] = useState([
        { id: 1, position: 0, color: 'bg-blue-500', name: 'Blue' },
        { id: 2, position: 0, color: 'bg-orange-500', name: 'Orange' },
    ]);
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [diceRoll, setDiceRoll] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState('');

    const rollDice = () => {
        const roll = Math.floor(Math.random() * 6) + 1;
        setDiceRoll(roll);
        movePlayer(roll);
    };

    const movePlayer = (roll) => {
        if (gameOver) return;
        setPlayers((prevPlayers) => {
            const newPlayers = [...prevPlayers];
            const activePlayer = newPlayers[currentPlayer];
            let newPosition = activePlayer.position + roll;

            if (newPosition >= BOARD_SIZE) {
                newPosition = BOARD_SIZE;
                setMessage(`${activePlayer.name} Player Wins! 🎉`);
                setGameOver(true);
            } else {
                const letter = LETTERS[newPosition];
                if (letter) {
                    if (letter.type === 'boost') {
                        setMessage(`${activePlayer.name} Player landed on ${letter.letter} and zoomed ahead! 🚀`);
                        newPosition = letter.target;
                    } else {
                        setMessage(`${activePlayer.name} Player landed on ${letter.letter} and slid back! 😱`);
                        newPosition = letter.target;
                    }
                }
            }

            activePlayer.position = newPosition;
            return newPlayers;
        });
        setCurrentPlayer((prev) => (prev + 1) % players.length);
    };

    useEffect(() => {
        if (gameOver) {
            setMessage(`Game Over! ${players[currentPlayer].name} Player Wins! 🎉`);
        } else {
            setMessage(`${players[currentPlayer].name} Player's turn 🎲`);
        }
    }, [currentPlayer, gameOver, players]);

    const restartGame = () => {
        setPlayers(players.map((player) => ({ ...player, position: 0 })));
        setCurrentPlayer(0);
        setDiceRoll(null);
        setGameOver(false);
        setMessage("New game started! 🎮 Blue Player's turn");
    };

    const renderBoard = () => {
        return Array.from({ length: BOARD_SIZE }, (_, i) => {
            const position = i + 1;
            const letter = LETTERS[position];
            const playerOnSquare = players.find((p) => p.position === position);

            return (
                <motion.div
                    key={i}
                    className={`square w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-md shadow-md ${letter ? letter.color : 'bg-indigo-200'
                        } ${playerOnSquare ? 'ring-2 ring-white' : ''} ${playerOnSquare ? playerOnSquare.color : ''
                        } relative`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {letter ? (
                        <span className="text-sm font-bold text-white">{letter.letter}</span>
                    ) : (
                        <span className="text-xs font-bold text-indigo-600">{position}</span>
                    )}
                    {playerOnSquare && (
                        <motion.div
                            className={`absolute w-4 h-4 rounded-full ${playerOnSquare.color} border-2 border-white`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                    )}
                </motion.div>
            );
        });
    };

    return (
        <div className="game-container text-gray-900 p-4 max-w-lg mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-center text-pink-500">🎉 Snakes and Letters 🎉</h1>
            <div className="board grid grid-cols-10 gap-1 mb-4 bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 p-4 rounded-lg shadow-lg">
                {renderBoard()}
            </div>
            <div className="controls bg-white p-4 rounded-lg shadow-md">
                <Alert className="mb-2 bg-gradient-to-r from-blue-200 via-green-200 to-yellow-200 border-0">
                    <AlertTitle className="text-xl font-bold text-pink-600">{message}</AlertTitle>
                    <AlertDescription>
                        <div className="flex justify-around mt-2">
                            {players.map((player) => (
                                <motion.div
                                    key={player.id}
                                    className={`p-2 rounded-md shadow-md ${player.color} text-white font-bold`}
                                    animate={{ scale: currentPlayer === player.id - 1 ? 1.1 : 1 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                >
                                    {player.name}: {player.position}
                                    {gameOver && currentPlayer === player.id - 1 && <Crown className="ml-1 inline h-4 w-4" />}
                                </motion.div>
                            ))}
                        </div>
                    </AlertDescription>
                </Alert>
                <div className="flex space-x-4">
                    <AnimatePresence>
                        {!gameOver && (
                            <motion.div
                                className="flex-1"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <Button
                                    onClick={rollDice}
                                    className="w-full bg-gradient-to-r from-teal-500 via-green-400 to-yellow-400 hover:scale-105 text-white font-bold py-2 px-4 rounded-md text-md shadow-md transition-transform"
                                    disabled={gameOver}
                                >
                                    <Dice6 className="mr-1 h-5 w-5" />
                                    Roll
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <motion.div
                        className="flex-1"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Button
                            onClick={restartGame}
                            className="w-full bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-400 hover:scale-105 text-white font-bold py-2 px-4 rounded-md text-md shadow-md transition-transform"
                        >
                            <RotateCcw className="mr-1 h-5 w-5" />
                            Restart
                        </Button>
                    </motion.div>
                </div>
                {diceRoll && (
                    <motion.p
                        className="mt-4 text-center text-xl font-bold text-pink-600"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    >
                        🎲 Rolled: {diceRoll} 🎲
                    </motion.p>
                )}
            </div>
        </div>
    );
}

export default SnakesAndLadders;