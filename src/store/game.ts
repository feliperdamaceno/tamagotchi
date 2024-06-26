import { create } from 'zustand'

import { PetStats } from '@/types'

/*
  Hunger, Happiness, Health decrease over time.

  Feeding reduce Hunger.
  Playing reduce Energy.
  Cleaning restore Health.
  Sleeping restore Energy.

  Status:
    Speeping: Boolean
*/

const TICK_TIME = 1000 // milliseconds
const INITIAL_ENERGY = 100
const BASE_MULTIPLIER = 5 // multiples of 5 and 10

interface GameState {
  stats: PetStats
  play: () => void
  sleep: () => void
}

export const useGameStore = create<GameState>((set, get) => ({
  stats: {
    energy: 60,
    health: 100,
    hunger: 100,
    happiness: 100,
    sleeping: false,
    playing: false,
    eating: false
  },

  play: () => {
    if (get().stats.sleeping) return

    set(({ stats: status }) => ({
      stats: { ...status, playing: !status.playing }
    }))

    const interval = setInterval(() => {
      if (get().stats.energy <= 0) {
        clearInterval(interval)
        set(({ stats: status }) => ({ stats: { ...status, playing: false } }))
        return get().sleep()
      }

      if (!get().stats.playing) return clearInterval(interval)

      set(({ stats: status }) => ({
        stats: {
          ...status,
          energy: status.energy - BASE_MULTIPLIER * 2
        }
      }))
    }, TICK_TIME)
  },

  sleep: () => {
    set(({ stats: status }) => ({ stats: { ...status, sleeping: true } }))

    const interval = setInterval(() => {
      if (get().stats.energy >= INITIAL_ENERGY) {
        set(({ stats: status }) => ({ stats: { ...status, sleeping: false } }))
        return clearInterval(interval)
      }

      set(({ stats: status }) => ({
        stats: {
          ...status,
          energy: status.energy + BASE_MULTIPLIER * 1
        }
      }))
    }, TICK_TIME)
  }
}))
