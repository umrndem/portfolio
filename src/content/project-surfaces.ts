/**
 * Positional project-card surface scale.
 *
 * Levels are driven by homepage index and published count — never by project
 * name. Only the final visible card maps to the near-white / near-black stop.
 * Intermediate stops stay in the true-red family (no salmon, peach, beige,
 * brown, mauve, or purple drift).
 */

export const PROJECT_SURFACE_STOPS = 6;

/** Light-theme canonical stops (1 = strongest red … 6 = near-white). */
export const projectSurfaceLight = [
  "#C90F16",
  "#D94349",
  "#E66E73",
  "#EE989C",
  "#F6C8CA",
  "#FFF8F8",
] as const;

export type ProjectSurfaceInk = "on-brand" | "default";

export type ProjectSurfaceAssignment = {
  /** Discrete CSS token index 1…PROJECT_SURFACE_STOPS when mode is "token". */
  level: number;
  ink: ProjectSurfaceInk;
  mode: "token" | "mix";
  /** 0–100 blend toward the final stop when mode is "mix". */
  mixPercent?: number;
};

/**
 * Map a zero-based card index onto the 1…PROJECT_SURFACE_STOPS scale so that
 * the first card is always stop 1, the last is always the final stop, and
 * intermediate cards spread across the scale.
 *
 * With six published projects this yields 1…6. With five it still ends on stop 6
 * (near-white) while keeping intermediates distinct.
 */
export function projectSurfaceLevel(index: number, count: number): number {
  if (count <= 1 || index <= 0) {
    return 1;
  }

  if (index >= count - 1) {
    return PROJECT_SURFACE_STOPS;
  }

  return Math.round(
    1 + (index / (count - 1)) * (PROJECT_SURFACE_STOPS - 1),
  );
}

/**
 * White / on-brand ink only on the deepest red stop in light theme.
 * Mid and pale reds use default dark text for contrast.
 * Dark theme stop 1 still opts into the on-brand treatment for the lead-card look.
 */
export function projectSurfaceInk(level: number): ProjectSurfaceInk {
  return level <= 1 ? "on-brand" : "default";
}

export function getProjectSurfaceAssignment(
  index: number,
  count: number,
): ProjectSurfaceAssignment {
  if (count > PROJECT_SURFACE_STOPS) {
    const mixPercent =
      count <= 1 ? 0 : Math.round((index / (count - 1)) * 100);
    const ink: ProjectSurfaceInk = mixPercent < 12 ? "on-brand" : "default";

    return {
      level: projectSurfaceLevel(index, count),
      ink,
      mode: "mix",
      mixPercent,
    };
  }

  const level = projectSurfaceLevel(index, count);

  return {
    level,
    ink: projectSurfaceInk(level),
    mode: "token",
  };
}
