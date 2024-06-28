import { create } from 'zustand'

import { Pet, PET_STATUS } from '@/types'

/*
  Hunger, Happiness, Health decrease over time.

  Feeding reduce Hunger.
  Playing reduce Energy.
  Cleaning restore Health.
  Sleeping restore Energy.

  Status: Idle | Eating | Playing | Sleeping | Cleaning
*/

const BASE_ENERGY = 100
const BASE_HEALTH = 100
const BASE_HAPPYNESS = 100
const BASE_HUNGER = 100

const TICK_TIME = 1000 // milliseconds
const BASE_MULTIPLIER = 10 // multiples of 5 and 10

interface GameState {
  pet: Pet
  play: () => void
  sleep: () => void
}

const toggleStatus = (status: PET_STATUS) => {
  useGameStore.setState(({ pet }) => ({
    pet: { ...pet, status: pet.status === status ? PET_STATUS.IDLE : status }
  }))
}

export const useGameStore = create<GameState>((set, get) => ({
  pet: {
    energy: BASE_ENERGY,
    health: BASE_HEALTH,
    hunger: BASE_HUNGER,
    happiness: BASE_HAPPYNESS,
    status: PET_STATUS.IDLE
  },

  play: () => {
    toggleStatus(PET_STATUS.PLAYING)

    const interval = setInterval(() => {
      if (get().pet.energy <= 0) {
        clearInterval(interval)
        return get().sleep()
      }

      if (get().pet.status == PET_STATUS.IDLE) {
        return clearInterval(interval)
      }

      set(({ pet }) => ({
        pet: {
          ...pet,
          energy: pet.energy - BASE_MULTIPLIER * 2
        }
      }))
    }, TICK_TIME)
  },

  sleep: () => {
    set(({ pet }) => ({ pet: { ...pet, status: PET_STATUS.SLEEPING } }))

    const interval = setInterval(() => {
      if (get().pet.energy >= BASE_ENERGY) {
        set(({ pet }) => ({ pet: { ...pet, status: PET_STATUS.IDLE } }))
        return clearInterval(interval)
      }

      set(({ pet }) => ({
        pet: {
          ...pet,
          energy: pet.energy + BASE_MULTIPLIER * 1
        }
      }))
    }, TICK_TIME)
  }
}))
