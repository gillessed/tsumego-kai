export interface StoneAnimation {
  startOpacity: number;
  endOpacity: number;
  totalTime: number;
  progress: number;
  x: number;
  y: number;
}

export interface AnimationState {
  stoneAnimation?: StoneAnimation;
}