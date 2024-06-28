import { useGameStore } from '@/store/game'
import { PET_STATUS } from '@/types'

export default function App() {
  const game = useGameStore()

  return (
    <main className="container max-w-2xl p-8 mx-auto space-y-4">
      <section className="space-y-8">
        <h2
          className={`text-center text-8xl ${
            game.pet.status === PET_STATUS.SLEEPING
              ? ' animate-pulse'
              : ' animate-bounce'
          }`}
        >
          🐋
        </h2>

        <ul className="w-full max-w-xs mx-auto">
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

      <section className="space-y-4">
        <h2 className="text-lg font-bold">Controls:</h2>

        <div>
          <button
            disabled={
              game.pet.status === PET_STATUS.SLEEPING ||
              game.pet.status === PET_STATUS.EATING
            }
            onClick={() => game.play()}
          >
            {game.pet.status === PET_STATUS.PLAYING ? 'Pause' : 'Play'}
          </button>
        </div>
      </section>
    </main>
  )
}
