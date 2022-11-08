import { onMounted, ref } from 'vue';

export function useCountDown(
  seconds: number,
  callback: (resetFn: (new_seconds: number) => void) => void
) {
  const count = ref(seconds);
  const timer = ref<NodeJS.Timeout | null>(null);

  function start() {
    if (timer.value) {
      clearTimeout(timer.value);
    }
    if (count.value === 0) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      callback(reset);
      return;
    }
    count.value -= 1;
    timer.value = setTimeout(start, 1000);
  }

  onMounted(start);

  function reset(new_seconds: number) {
    count.value = new_seconds;
    start();
  }

  return { count, reset };
}
