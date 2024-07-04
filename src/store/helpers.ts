import { useGameStore } from '@/store/game'

import { PET_ACTION, PetStatus, RECOVERY_RATE, Time } from '@/types'
import { MAX_STATS } from '@/constants'

/**
 * Toggles the action status of the pet in the game state.
 * If the current action of the pet matches the provided status,
 * it sets the action to IDLE; otherwise, it sets it to the provided status.
 *
 * @param status - The new action status to set for the pet.
 */
export function toggleStatus(status: PET_ACTION): void {
  useGameStore.setState(({ pet }) => ({
    pet: { ...pet, action: pet.action === status ? PET_ACTION.IDLE : status }
  }))
}

/**
 * Recover the status of a pet in the game state based on a specified interval.
 * If the pet is idle or has reached maximum stats, clears the interval.
 *
 * @param {PetStatus} status - The status to update (e.g., 'hunger', 'happiness').
 * @param {number} interval - The interval ID used to clear the update process.
 */
export function recoverPetStatus(status: PetStatus, interval: number): void {
  useGameStore.setState(({ pet }) => {
    if (pet.action === PET_ACTION.IDLE) {
      clearInterval(interval)
      return { pet }
    }

    if (pet[status] >= MAX_STATS) {
      clearInterval(interval)
      return { pet: { ...pet, action: PET_ACTION.IDLE, [status]: MAX_STATS } }
    }

    return {
      pet: {
        ...pet,
        [status]:
          pet[status] +
          RECOVERY_RATE[status.toUpperCase() as Uppercase<PetStatus>]
      }
    }
  })
}

/**
 * Calculates the age of a pet in hours, minutes, and seconds.
 *
 * This function retrieves the start time of the game from the game store, calculates the
 * time difference from the current time, and converts this difference into hours,
 * minutes, and seconds.
 *
 * @returns {Time} An object representing the pet's age with properties:
 *   - hours: The number of hours (0-23).
 *   - minutes: The number of minutes (0-59).
 *   - seconds: The number of seconds (0-59).
 */
export function calculatePetAge(): Time {
  const { _startedAt } = useGameStore.getState()

  const diff = Date.now() - _startedAt.getTime()

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)

  return {
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60
  }
}
