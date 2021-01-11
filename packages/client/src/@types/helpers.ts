export type ClassesOverride<
	UseStyles extends (props: any) => Record<string, string>
> = Partial<Record<keyof ReturnType<UseStyles>, string>>;

export type SomeOptional<T, U extends keyof T> = Omit<T, U> &
	Partial<Exclude<T, U>>;

export type SomeRequired<T, U extends keyof T> = Omit<T, U> &
	Required<Pick<T, U>>;

export type UnpackedArray<T> = T extends (infer U)[] ? U : never;

export type UnpackedPromise<T> = T extends Promise<infer U> ? U : never;
