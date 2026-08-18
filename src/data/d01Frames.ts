export type D01Sequence = {
  id: string;
  count: number;
  ending?: boolean;
};

export const D01_SEQUENCES: D01Sequence[] = [
  { id: "transport", count: 100 },
  { id: "travel", count: 100 },
  { id: "engineering", count: 100 },
  { id: "cashbox", count: 100 },
  { id: "bus-collective", count: 100 },
  { id: "plotigo", count: 100 },
  { id: "haveleh", count: 100 },
  { id: "flash", count: 100 },
  { id: "ending", count: 160, ending: true },
];

export const D01_TOTAL_FRAMES = D01_SEQUENCES.reduce((n, s) => n + s.count, 0);

export function d01FramePath(id: string, index: number) {
  return `/d01-frames/${id}/frame-${String(index + 1).padStart(5, "0")}.jpg`;
}
