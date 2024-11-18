export interface StoneAnimation {
  callback?: () => void,
  opacity?: [number, number],
  translateX?: [number, number],
  translateY?: [number, number],
  totalTime: number;
  started: number;
  x: number;
  y: number;
}

export interface AnimationState {
  animations: Set<StoneAnimation>;
}