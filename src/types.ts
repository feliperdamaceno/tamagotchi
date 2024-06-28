export enum PET_STATUS {
  IDLE,
  EATING,
  PLAYING,
  SLEEPING,
  CLEANING
}

export interface Pet {
  energy: number
  health: number
  hunger: number
  happiness: number
  status: PET_STATUS
}
