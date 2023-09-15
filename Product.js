class Product {
    price;
    name;
    discount;
    taxPercentage;
    totalPrice;
    category;

    constructor(price, name, discount, taxPercentage, category) {
        this.price = price;
        this.name = name;
        this.discount = discount;
        this.taxPercentage = taxPercentage;
        this.category = category;
    }


    computeTotalPriceWithTaxes () {
        if(this.taxPercentage == 0) {
            return this.price;
        }
        this.totalPrice = this.price - this.discount - this.price * (this.taxPercentage / 100);
        return this.totalPrice;
    }

}