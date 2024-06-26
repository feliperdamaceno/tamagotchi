import { useGameStore } from '@/store/game'

export default function App() {
  const game = useGameStore()

  return (
    <main className="container max-w-2xl p-8 mx-auto space-y-4">
      <section className="space-y-8">
        <h2
          className={`text-center text-8xl ${
            game.stats.sleeping ? ' animate-pulse' : ' animate-bounce'
          }`}
        >
          🐋
        </h2>

        <ul className="w-full max-w-xs mx-auto">
          {Object.entries(game.stats)
            .filter(([_, value]) => typeof value !== 'boolean')
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
          <button disabled={game.stats.sleeping} onClick={() => game.play()}>
            {game.stats.playing ? 'Pause' : 'Play'}
          </button>
        </div>
      </section>
    </main>
  )
}
