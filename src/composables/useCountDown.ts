import { onMounted, ref } from 'vue';

// the resetCountDown in callback and the resetCountDown in return values are same function
// so that you can use resetCountDown both inside and outside callback function
export function useCountDown(
  seconds: number,
  callback: (resetCountDown: (new_seconds: number) => void) => void,
) {
  const count = ref(seconds);
  const timer = ref<NodeJS.Timeout | null>(null);

  function start() {
    if (timer.value)
      clearTimeout(timer.value);

    if (count.value === 0) {
      callback(resetCountDown);
      return;
    }
    count.value -= 1;
    timer.value = setTimeout(start, 1000);
  }

  onMounted(start);

  function resetCountDown(new_seconds: number) {
    count.value = new_seconds;
    start();
  }

  return { count, resetCountDown };
}
