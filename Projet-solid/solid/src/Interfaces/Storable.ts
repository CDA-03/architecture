
export interface Storable<T> {
    set(name: string, price: number): void;
    restore(name: string): void;
    total(): number;
    reset(): void;
    all() : T
}