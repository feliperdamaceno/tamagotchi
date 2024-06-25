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
const BASE_MULTIPLIER = 2

interface GameState {
  status: PetStats
  play: () => void
}

export const useGameStore = create<GameState>((set, get) => ({
  status: {
    energy: 60,
    health: 100,
    hunger: 100,
    happiness: 100,
    sleeping: false
  },

  play: () => {
    const interval = setInterval(() => {
      if (get().status.energy === INITIAL_ENERGY) return clearInterval(interval)
      set((state) => ({
        status: {
          ...state.status,
          energy: state.status.energy + BASE_MULTIPLIER * 1
        }
      }))
    }, TICK_TIME)
  }
}))
