export enum PET_STATUS {
  IDLE,
  EATING,
  PLAYING,
  SHOWERING,
  SLEEPING
}

export interface Pet {
  energy: number
  health: number
  hunger: number
  happiness: number
  status: PET_STATUS
}
