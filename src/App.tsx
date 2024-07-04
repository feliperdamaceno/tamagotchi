import { useEffect } from 'react'
import { useGameStore } from '@/store/game'
import { PET_ACTION } from '@/types'
import { MAX_STATS } from '@/constants'

export default function App() {
  const game = useGameStore()
  const pet = useGameStore((state) => state.pet)
  const age = useGameStore((state) => state.pet.age)

  const animation =
    pet.action === PET_ACTION.SLEEPING ? ' animate-pulse' : ' animate-bounce'

  useEffect(game.start, [])

  useEffect(() => {
    if (pet.dead) alert(`Your pet died by ${pet.cause}`)
  }, [pet.dead])

  return (
    <main className="grid flex-1 place-items-center bg-zinc-900">
      <section className="w-full max-w-md" aria-label="game">
        <div className="h-20 rounded-t-full bg-[#70a4ad]" />

        <div className="p-12 space-y-8 bg-zinc-100">
          <section aria-label="display">
            <div
              style={{ scale: `${pet.size}%` }}
              className={`text-center text-8xl ${animation}`}
            >
              🐋
            </div>
          </section>

          <section aria-label="status">
            <ul>
              {Object.entries(pet)
                .filter(([key]) => /energy|health|hunger|happiness/.test(key))
                .map(([key, value]: [string, number]) => (
                  <li
                    key={key}
                    className="flex items-center justify-between gap-4 capitalize"
                  >
                    <span className="font-bold">
                      {key}: {Number(value).toFixed()}
                    </span>
                    <progress
                      className="progress-bar:bg-gray-200 progress-value:bg-[#70a4ad] progress-bar:transition-all progress-filled:duration-500"
                      max={100}
                      value={value}
                    />
                  </li>
                ))}
            </ul>
          </section>

          <section className="flex justify-between gap-2" aria-label="controls">
            <button
              disabled={pet.action === PET_ACTION.SLEEPING}
              onClick={game.play}
            >
              {pet.action === PET_ACTION.PLAYING ? 'Pause' : 'Play'}
            </button>

            <button
              disabled={
                pet.action === PET_ACTION.SLEEPING || pet.hunger >= MAX_STATS
              }
              onClick={game.feed}
            >
              {pet.action === PET_ACTION.EATING ? 'Stop' : 'Feed'}
            </button>

            <button
              disabled={
                pet.action === PET_ACTION.SLEEPING || pet.health >= MAX_STATS
              }
              onClick={game.clean}
            >
              {pet.action === PET_ACTION.SHOWERING ? 'Stop' : 'Clean'}
            </button>

            <button onClick={game.sleep}>
              {pet.action === PET_ACTION.SLEEPING ? 'Wake-Up' : 'Go Sleep'}
            </button>
          </section>
        </div>

        <div className="h-20 rounded-b-full bg-[#70a4ad] text-white font-medium grid place-items-center">
          <span>
            Your pet is {`${age.hours}h ${age.minutes}m ${age.seconds}s`} old
          </span>
        </div>
      </section>
    </main>
  )
}
