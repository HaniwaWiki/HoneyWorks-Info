export type AsyncStorage = {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
  keys(): Promise<string[]>;
  clear(): Promise<void>;
};

/*
  factory function to create a variable in storage, and return a getter and a setter

  to get best of typescript support (getValue won't return undefined if defaultValue is not undefined)
  we have to mark type of getValue as `typeof defaultValue extends undefined ? T | undefined : T`
 */
export type StorageVariableFactory = <T>(key: string, defaultValue?: T) => [
  (() => Promise<typeof defaultValue extends undefined ? T | undefined : T>),
  (value: T) => Promise<void>,
];
