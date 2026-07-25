/**
 * Positional project-card surface scale.
 *
 * Levels are driven by homepage index and published count — never by project
 * name. Stop 1 is solid lead red (`--project-surface-1`); stops 2…6 are the
 * same red at descending opacity over the page ground. Only the final visible
 * card maps to the lowest-opacity stop. Do not invent separate shade hexes.
 */

export const PROJECT_SURFACE_STOPS = 6;

/**
 * Opacity of `--project-surface-1` over `--color-bg-primary` for each stop.
 * Mirrored in `globals.css` project-surface tokens (1 = 100% … 6 ≈ page tint).
 */
export const projectSurfaceOpacity = [
  1, 0.8, 0.58, 0.36, 0.18, 0.06,
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
 * (lowest opacity) while keeping intermediates distinct.
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
 * White / on-brand ink on the deepest red stops (solid + high-opacity).
 * Mid and pale stops use strong dark ink — never page-muted greys on red tints.
 * Dark theme stop 1–2 keep the on-brand treatment for the lead-card look.
 */
export function projectSurfaceInk(level: number): ProjectSurfaceInk {
  return level <= 2 ? "on-brand" : "default";
}

export function getProjectSurfaceAssignment(
  index: number,
  count: number,
): ProjectSurfaceAssignment {
  if (count > PROJECT_SURFACE_STOPS) {
    const mixPercent =
      count <= 1 ? 0 : Math.round((index / (count - 1)) * 100);
    // Roughly stops 1–2 of the discrete scale (~0–20% toward the final stop).
    const ink: ProjectSurfaceInk = mixPercent < 25 ? "on-brand" : "default";

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
