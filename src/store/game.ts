import { create } from 'zustand'

import { Pet, PET_STATUS } from '@/types'

/*
  Hunger, Happiness, Health decrease over time.

  Feeding reduce Hunger.
  Playing reduce Energy.
  Cleaning restore Health.
  Sleeping restore Energy.
  Playing restore Happiness.

  Status: Idle | Eating | Playing | Sleeping | Cleaning
*/

export const BASE_ENERGY = 100
export const BASE_HEALTH = 100
export const BASE_HAPPYNESS = 100
export const BASE_HUNGER = 100

const TICK_TIME = 1500 // milliseconds
const BASE_MULTIPLIER = 1 // multiples of 5

interface GameState {
  pet: Pet
  init: () => void
  feed: () => void
  play: () => void
  clean: () => void
  sleep: () => void
}

function toggleStatus(status: PET_STATUS) {
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

  init: () => {
    setInterval(() => {
      if (get().pet.hunger > 0 && get().pet.status !== PET_STATUS.EATING) {
        set(({ pet }) => ({
          pet: { ...pet, hunger: pet.hunger - BASE_MULTIPLIER * 1 }
        }))
      }

      if (get().pet.happiness > 0 && get().pet.status !== PET_STATUS.PLAYING) {
        set(({ pet }) => ({
          pet: { ...pet, happiness: pet.happiness - BASE_MULTIPLIER * 1 }
        }))
      }

      if (get().pet.health > 0 && get().pet.status !== PET_STATUS.SHOWERING) {
        set(({ pet }) => ({
          pet: { ...pet, health: pet.health - BASE_MULTIPLIER * 1 }
        }))
      }
    }, TICK_TIME)
  },

  play: () => {
    toggleStatus(PET_STATUS.PLAYING)

    const interval = setInterval(() => {
      if (get().pet.energy <= 0) {
        set(({ pet }) => ({ pet: { ...pet, status: PET_STATUS.IDLE } }))
        clearInterval(interval)
        return get().sleep()
      }

      if (get().pet.status === PET_STATUS.IDLE) {
        return clearInterval(interval)
      }

      if (get().pet.happiness < BASE_HAPPYNESS) {
        set(({ pet }) => ({
          pet: { ...pet, happiness: pet.happiness + BASE_MULTIPLIER * 2 }
        }))
      }

      set(({ pet }) => ({
        pet: { ...pet, energy: pet.energy - BASE_MULTIPLIER * 2 }
      }))
    }, TICK_TIME)
  },

  feed: () => {
    toggleStatus(PET_STATUS.EATING)

    const interval = setInterval(() => {
      if (get().pet.hunger === BASE_HUNGER) {
        set(({ pet }) => ({ pet: { ...pet, status: PET_STATUS.IDLE } }))
        return clearInterval(interval)
      }

      if (get().pet.status === PET_STATUS.IDLE) {
        return clearInterval(interval)
      }

      set(({ pet }) => ({
        pet: { ...pet, hunger: pet.hunger + BASE_MULTIPLIER * 2 }
      }))
    }, TICK_TIME)
  },

  clean: () => {
    toggleStatus(PET_STATUS.SHOWERING)

    const interval = setInterval(() => {
      if (get().pet.health === BASE_HEALTH) {
        set(({ pet }) => ({ pet: { ...pet, status: PET_STATUS.IDLE } }))
        return clearInterval(interval)
      }

      if (get().pet.status === PET_STATUS.IDLE) {
        return clearInterval(interval)
      }

      set(({ pet }) => ({
        pet: { ...pet, health: pet.health + BASE_MULTIPLIER * 2 }
      }))
    }, TICK_TIME)
  },

  sleep: () => {
    toggleStatus(PET_STATUS.SLEEPING)

    const interval = setInterval(() => {
      if (get().pet.energy === BASE_ENERGY) {
        set(({ pet }) => ({ pet: { ...pet, status: PET_STATUS.IDLE } }))
        return clearInterval(interval)
      }

      if (get().pet.status === PET_STATUS.IDLE) {
        return clearInterval(interval)
      }

      set(({ pet }) => ({
        pet: { ...pet, energy: pet.energy + BASE_MULTIPLIER * 2 }
      }))
    }, TICK_TIME)
  }
}))
