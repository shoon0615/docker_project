export let count = 0;

export function increase(val = 1) {
  return (count += val);
}

export function decrease() {
  return (count -= 1);
}
