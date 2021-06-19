export interface SizedMap<T>
  extends Iterable<{ x: number; y: number; value: T }> {
  width: number;
  height: number;
  is(x: number, y: number, value: T): boolean;
  update(x: number, y: number, value: T): SizedMap<T>;
  updateMultiple(list: { x: number; y: number; value: T }[]): SizedMap<T>;
}
