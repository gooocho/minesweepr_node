export interface SizedMap<T> {
  width: number;
  height: number;
  is(x: number, y: number, value: T): boolean;
  update(x: number, y: number, value: T): SizedMap<T>;
}
