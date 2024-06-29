import { useEffect } from 'react'
import { useGameStore, BASE_HEALTH, BASE_HUNGER } from '@/store/game'
import { PET_STATUS } from '@/types'

export default function App() {
  const game = useGameStore()

  useEffect(game.init, [])

  return (
    <main className="grid flex-1 place-items-center">
      <section className="w-full max-w-md" aria-label="game">
        <div className="h-20 rounded-t-full bg-[#70a4ad]" />

        <div className="p-12 space-y-8 bg-zinc-100">
          <section aria-label="display">
            <h2
              className={`text-center text-8xl ${
                game.pet.status === PET_STATUS.SLEEPING
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
                .filter(([key]) => key !== 'status')
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
              disabled={game.pet.status === PET_STATUS.SLEEPING}
              onClick={game.play}
            >
              {game.pet.status === PET_STATUS.PLAYING ? 'Pause' : 'Play'}
            </button>

            <button
              disabled={
                game.pet.status === PET_STATUS.SLEEPING ||
                game.pet.hunger >= BASE_HUNGER
              }
              onClick={game.feed}
            >
              {game.pet.status === PET_STATUS.EATING ? 'Stop' : 'Feed'}
            </button>

            <button
              disabled={
                game.pet.status === PET_STATUS.SLEEPING ||
                game.pet.health >= BASE_HEALTH
              }
              onClick={game.clean}
            >
              {game.pet.status === PET_STATUS.SHOWERING ? 'Stop' : 'Clean'}
            </button>

            <button onClick={game.sleep}>
              {game.pet.status === PET_STATUS.SLEEPING ? 'Wake-up' : 'Go Sleep'}
            </button>
          </section>
        </div>

        <div className="h-20 rounded-b-full bg-[#70a4ad]" />
      </section>
    </main>
  )
}
