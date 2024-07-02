import { useGameStore } from '@/store/game'

import { PET_ACTION, PetStatus, RECOVERY_RATE } from '@/types'
import { MAX_STATS } from '@/constants'

/**
 * Toggles the action status of the pet in the game state.
 * If the current action of the pet matches the provided status,
 * it sets the action to IDLE; otherwise, it sets it to the provided status.
 *
 * @param status - The new action status to set for the pet.
 */
export function toggleStatus(status: PET_ACTION) {
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
export function recoverPetStatus(status: PetStatus, interval: number) {
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
