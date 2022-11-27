// encapsulation of localStorage
// to get best of typescript support (getValue won't return undefined if defaultValue is not undefined)
// we have to mark type of getValue as `typeof defaultValue extends undefined ? T | undefined : T`
export function useLocalStorage<T>(key: string, defaultValue?: T): [(() => typeof defaultValue extends undefined ? T | undefined : T), (value: T) => void];

export function useLocalStorage<T>(key: string, defaultValue?: T) {
  const getValue = () => {
    const value = localStorage.getItem(key);
    return { ...defaultValue, ...JSON.parse(value || '{}') };
  };
  const setValue = (newValue: T) => localStorage.setItem(key, JSON.stringify(newValue));
  return [getValue, setValue];
}
