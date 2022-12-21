export type Dictionary<T> = { [key: string]: T; };

export type Unpromise<T extends Promise<any>> = T extends Promise<infer U> ? U : never;
