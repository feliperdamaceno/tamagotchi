import { useEffect } from 'react'
import { useGameStore } from '@/store/game'
import { PET_ACTION } from '@/types'
import { MAX_STATS } from '@/constants'

export default function App() {
  const game = useGameStore()

  useEffect(game.init, [])

  useEffect(() => {
    if (game.pet.dead) {
      alert(`Your pet died by ${game.pet.cause}`)
      // TODO: Add proper modal for this action.
    }
  }, [game.pet.dead])

  return (
    <main className="grid flex-1 place-items-center">
      <section className="w-full max-w-md" aria-label="game">
        <div className="h-20 rounded-t-full bg-[#70a4ad]" />

        <div className="p-12 space-y-8 bg-zinc-100">
          <section aria-label="display">
            <h2
              className={`text-center text-8xl ${
                game.pet.action === PET_ACTION.SLEEPING
                  ? ' animate-pulse'
                  : ' animate-bounce'
              }`}
            >
              🐋
            </h2>
          </section>

          <section aria-label="status">
            <ul>
              {Object.entries(game.pet)
                .filter(([key]) => /energy|health|hunger|happiness/.test(key))
                .map(([key, value]) => (
                  <li className="flex items-center justify-between gap-4 capitalize">
                    <span className="font-bold">{key}</span>
                    <progress
                      className="progress-bar:bg-gray-200 progress-value:bg-[#70a4ad] progress-bar:transition-all progress-filled:duration-500"
                      max={100}
                      value={value}
                    />
                  </li>
                ))}
            </ul>
          </section>

          <section className="flex gap-4" aria-label="controls">
            <button
              disabled={game.pet.action === PET_ACTION.SLEEPING}
              onClick={game.play}
            >
              {game.pet.action === PET_ACTION.PLAYING ? 'Pause' : 'Play'}
            </button>

            <button
              disabled={
                game.pet.action === PET_ACTION.SLEEPING ||
                game.pet.hunger >= MAX_STATS
              }
              onClick={game.feed}
            >
              {game.pet.action === PET_ACTION.EATING ? 'Stop' : 'Feed'}
            </button>

            <button
              disabled={
                game.pet.action === PET_ACTION.SLEEPING ||
                game.pet.health >= MAX_STATS
              }
              onClick={game.clean}
            >
              {game.pet.action === PET_ACTION.SHOWERING ? 'Stop' : 'Clean'}
            </button>

            <button onClick={game.sleep}>
              {game.pet.action === PET_ACTION.SLEEPING ? 'Wake-up' : 'Go Sleep'}
            </button>
          </section>
        </div>

        <div className="h-20 rounded-b-full bg-[#70a4ad]" />
      </section>
    </main>
  )
}
