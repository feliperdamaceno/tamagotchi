import { create } from 'zustand'
import {
  Pet,
  PET_ACTION,
  DECREASE_RATE,
  DEATH_CAUSE,
  RECOVERY_RATE
} from '@/types'
import {
  MAX_STATS,
  INITIAL_SIZE,
  CRITICAL_STATUS,
  TICK_TIME
} from '@/constants'
import {
  toggleStatus,
  recoverPetStatus,
  calculatePetAge
} from '@/store/helpers'

/*
  Hunger, Happiness, Health decrease over time.

  Feeding reduce Hunger.
  Playing reduce Energy.
  Cleaning restore Health.
  Sleeping restore Energy.
  Playing restore Happiness.

  Status: Idle | Eating | Playing | Sleeping | Cleaning
*/

const INITIAL_PET: Pet = {
  action: PET_ACTION.IDLE,
  dead: false,
  cause: null,
  age: { hours: 0, minutes: 0, seconds: 0 },
  size: INITIAL_SIZE,
  energy: MAX_STATS,
  health: MAX_STATS,
  hunger: MAX_STATS,
  happiness: MAX_STATS
}

interface GameState {
  _startedAt: Date
  pet: Pet
  start: () => void
  restart: () => void
  feed: () => void
  play: () => void
  clean: () => void
  sleep: () => void
}

export const useGameStore = create<GameState>((set, get) => ({
  _startedAt: new Date(),
  pet: INITIAL_PET,

  start: () => {
    const interval = setInterval(() => {
      if (get().pet.dead) {
        clearInterval(interval)
        return get().restart()
      }

      if (get().pet.action !== PET_ACTION.SLEEPING) {
        set(({ pet }) => ({
          pet: { ...pet, energy: pet.energy - DECREASE_RATE.ENERGY }
        }))
      }

      if (get().pet.action !== PET_ACTION.EATING) {
        set(({ pet }) => ({
          pet: { ...pet, hunger: pet.hunger - DECREASE_RATE.HUNGER }
        }))
      }

      if (get().pet.action !== PET_ACTION.PLAYING) {
        set(({ pet }) => ({
          pet: { ...pet, happiness: pet.happiness - DECREASE_RATE.HAPPINESS }
        }))
      }

      if (get().pet.action !== PET_ACTION.SHOWERING) {
        set(({ pet }) => ({
          pet: { ...pet, health: pet.health - DECREASE_RATE.HEALTH }
        }))
      }

      set(({ pet }) => ({ pet: { ...pet, age: calculatePetAge() } }))

      /*
        Used to increase pet size over time.
      */
      if (get().pet.size < MAX_STATS) {
        set(({ pet }) => ({
          pet: { ...pet, size: pet.size + RECOVERY_RATE.SIZE }
        }))
      }

      /*
        Used to check if reached the critical status dying.
      */
      Object.entries(get().pet).forEach(([key, value]) => {
        if (typeof value !== 'number') return

        if (value <= CRITICAL_STATUS) {
          set(({ pet }) => ({
            pet: {
              ...pet,
              dead: true,
              cause: DEATH_CAUSE[key.toUpperCase() as keyof typeof DEATH_CAUSE]
            }
          }))
        }
      })
    }, TICK_TIME)
  },

  restart: () => {
    set(() => ({ pet: INITIAL_PET, _startedAt: new Date() }))
    get().start()
  },

  play: () => {
    toggleStatus(PET_ACTION.PLAYING)

    const interval = setInterval(() => {
      recoverPetStatus('happiness', interval)

      set(({ pet }) => ({
        pet: { ...pet, energy: pet.energy - DECREASE_RATE.ENERGY }
      }))
    }, TICK_TIME)
  },

  feed: () => {
    toggleStatus(PET_ACTION.EATING)

    const interval = setInterval(() => {
      recoverPetStatus('hunger', interval)
    }, TICK_TIME)
  },

  clean: () => {
    toggleStatus(PET_ACTION.SHOWERING)

    const interval = setInterval(() => {
      recoverPetStatus('health', interval)
    }, TICK_TIME)
  },

  sleep: () => {
    toggleStatus(PET_ACTION.SLEEPING)

    const interval = setInterval(() => {
      recoverPetStatus('energy', interval)
    }, TICK_TIME)
  }
}))
