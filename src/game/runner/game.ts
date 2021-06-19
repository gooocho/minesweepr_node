export interface Game {
  width: number;
  height: number;
  mineCount: number;

  open(x: number, y: number): Promise<Game>;

  isOpen(x: number, y: number): boolean;

  number(x: number, y: number): number;
}
