import { Productable } from "../Interfaces/Productable";
import { Storable } from "../Interfaces/Storable";
import { VegetableBase } from "../Types/VegetableBase";

export class Cart {
    constructor(private storage: Storable<VegetableBase[]>, private precision : number = 100) { }

    buy(product: Productable, quantity: number) {
        this.storage.set(
            product.getName(),
            Math.floor( 
                product.getPrice() * quantity * this.precision 
            ) / this.precision
        )
    }

    total(): number {

        return this.storage.total()
    }

    restore(product: Productable) {
        this.storage.restore(product.getName())
    }

    reset():void {
        this.storage.reset()
    }

    show():VegetableBase[]{

        return this.storage.all()
    }

}