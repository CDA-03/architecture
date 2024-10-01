import { Storable } from "../Interfaces/Storable"
import { VegetableBase } from "../Types/VegetableBase"

export class InMemoryStorage implements Storable<VegetableBase[]> {

    private storage: VegetableBase[] = []
    private precision: number = 100

    set(name: string, price: number): void {
        const vegetableIndex = this.storage.findIndex(vegetable => vegetable.name === name)
        if (vegetableIndex >= 0) this.storage[vegetableIndex].price += price
        else
            this.storage.push({
                name, price
            })
    }
    restore(name: string): void {
        this.storage = this.storage.filter(vegetable => vegetable.name !== name)
    }
    total(): number {
        return Math.floor(
            this.storage.reduce((acc, curr) => curr.price + acc, 0
        ) * this.precision) / this.precision
    }
    reset(): void {
        this.storage = []
    }

    all(): VegetableBase[] {

        return this.storage
    }

}