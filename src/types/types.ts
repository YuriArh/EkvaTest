export interface Schedule {
  [key: string]: { type: string; value: number }[];
}

export interface formattedDay {
  day: string;
  openTime?: string;
  closeTime?: string;
  close: boolean;
}
