import { useGameStore } from '@/store/game'

export default function App() {
  const game = useGameStore()

  const onClick = () => game.play()

  return (
    <main className="container max-w-2xl p-8 mx-auto space-y-4">
      <section className="space-y-4">
        <h2 className="text-lg font-bold">Status:</h2>

        <ul>
          {Object.entries(game.status).map(([key, value]) => (
            <li className="capitalize">
              <span className="font-bold">{key}: </span>
              <span>{String(value)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold">Controls:</h2>

        <div>
          <button onClick={onClick}>Play</button>
        </div>
      </section>
    </main>
  )
}
