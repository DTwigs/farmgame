export function throttled(delay, fn) {
  let lastCall = 0;
  console.log('return throttle')
  return function (...args) {
    const now = (new Date).getTime();
    console.log('throttle')

    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn(...args);
  }
}
