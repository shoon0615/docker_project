export let count = 0;

export function increase() {
  return (count += 2);
}

export function decrease() {
  return (count -= 1);
}
