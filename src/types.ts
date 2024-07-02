import { BASE_MULTIPLIER } from '@/constants'

export enum PET_ACTION {
  IDLE,
  EATING,
  PLAYING,
  SHOWERING,
  SLEEPING
}

export enum DECREASE_RATE {
  ENERGY = 0.2,
  HEALTH = 0.03,
  HUNGER = 0.1,
  HAPPINESS = 0.05
}

export enum RECOVERY_RATE {
  ENERGY = DECREASE_RATE.ENERGY * BASE_MULTIPLIER,
  HEALTH = DECREASE_RATE.HEALTH * BASE_MULTIPLIER,
  HUNGER = DECREASE_RATE.HUNGER * BASE_MULTIPLIER,
  HAPPINESS = DECREASE_RATE.HAPPINESS * BASE_MULTIPLIER
}

export enum DEATH_CAUSE {
  ENERGY = 'exhaustion',
  HEALTH = 'illness',
  HUNGER = 'starvation',
  HAPPINESS = 'neglect'
}

export interface Pet {
  energy: number
  health: number
  hunger: number
  happiness: number
  action: PET_ACTION
  dead: boolean
  cause: DEATH_CAUSE | null
}

export type PetStatus = keyof Omit<Pet, 'dead' | 'cause' | 'action'>
