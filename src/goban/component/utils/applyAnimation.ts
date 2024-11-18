import { clamp } from "@blueprintjs/core/lib/esm/common/utils";
import { AnimationParams } from "../types/AnimationParams";
import { StoneAnimation } from "../types/AnimationState";

export function applyAnimation(
  animation: StoneAnimation,
  params: AnimationParams,
  timestamp: number
): AnimationParams {
  const { started, totalTime, opacity: opacityDelta } = animation;
  const progress = clamp((timestamp - started) / totalTime, 0, 1);
  const result = { ...params };

  if (opacityDelta != null) {
    result.opacity = opacityDelta[0] + (opacityDelta[1] - opacityDelta[0]) * progress;
  }

  // TODO: implement translation

  return result;
}
