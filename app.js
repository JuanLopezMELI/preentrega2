let products = []

products.push(new Product(1003.1, "Eggroll", 31, 10, 'Snacks'));
products.push(new Product(225.7, "Beans", 47, 10, 'Legumes'));
products.push(new Product(1754.7, "Apricots - Dried", 11, 13, 'Fruits'));
products.push(new Product(665.5, "Lobster - Tail, 3 - 4 Oz", 40, 7, 'Seafood'));
products.push(new Product(1613.3, "Pork Loin Bine - In Frenched", 19, 15, 'Snacks'));
products.push(new Product(1249.5, "Beans - Navy, Dry", 48, 16, 'Legumes'));
products.push(new Product(370.7, "Apricots Fresh", 8, 9, 'Fruits'));
products.push(new Product(1606.3, "Kohlrabi", 37, 7, 'Vegetables'));
products.push(new Product(1815.1, "Soupfoamcont12oz 112con", 22, 6, 'Seafood'));
products.push(new Product(546.4, "Tamarind Paste", 23, 5, 'Condiments'));
products.push(new Product(1802.9, "Juice - V8, Tomato", 36, 16, 'Vegetables'));
products.push(new Product(521.2, "Chevril", 45, 15, 'Condiments'));


let message = buildInitMessageForPrompt(products);

alert("Bienvenido a nuestro sistema de ventas");
alert(`Cúal producto desea comprar? 
        Si ingresa un número agregará un item al carrito. 
        Si ingresa una categoría, filtrará los productos de esa categoría`
);

let selection = "";
let purchasedProducts = []

while(isEmptySelection(selection)) {
    let quantity = 0;
    selection = prompt(message);
    if(selection === 'q') {
        break;
    } else if (isNaN(parseInt(selection))) {
        let filteredProducts = products.filter((product) => product.category.toLowerCase() === selection.toLowerCase());
        selection = prompt(buildInitMessageForPrompt(filteredProducts));
        if(isNaN(parseInt(selection))) {
            if(selection === 'q') {
                break;
            }
            alert("No has seleccionado un producto correcto.");
            continue;
        } else {
            quantity = +prompt(`Cuántos ${products[selection -1].name} desea comprar?`)
            for (let i = 0; i < quantity; i++) {
                purchasedProducts.push(products[selection -1]);
            }
            selection = "";
        }
    } else {
        quantity = +prompt(`Cuántos ${products[selection -1].name} desea comprar?`)
        for (let i = 0; i < quantity; i++) {
            purchasedProducts.push(products[selection -1]);
        }
        selection = "";
    }
}

let finalMessage = '';
let totalPrice = 0;
let subtotal = 0;
let priceWithDiscount = 0;
let taxes = 0;

purchasedProducts.sort((productA, productB) => productA.price > productB.price);

purchasedProducts.forEach((product) => {
    finalMessage += `${product.name} - ${product.price}\n`
    subtotal += product.price; 
    taxes = computeTaxes(product);
    priceWithDiscount = computeProductPriceWithDiscount(product);
    totalPrice += priceWithDiscount + taxes;
});

if(selection == 'q' && purchasedProducts.length === 0) {
    alert('Gracias por preguntar. Esperamos tu compra próximamente')
} else {
    alert(`Has comprado: ${finalMessage}
\tEl subtotal de tu compra es: ${subtotal.toFixed(2)}
\tEl precio con el descuento aplicado es de: ${priceWithDiscount.toFixed(2)}
\tEl impuesto al valor agregado es de: ${taxes.toFixed(2)}
\tEl precio total de tu compra es: ${totalPrice.toFixed(2)}`)
}

function buildInitMessageForPrompt(allProducts) {
    let initMessage = `Seleccione un número para comprar un producto, o escriba una categoría para filtrar
Presione 'q' para salir
Products: \n`;
    allProducts.forEach((product, index) => {
        initMessage += `${index+1}) ${product.name} - $${product.price}. Category: ${product.category}\n`;
    });
    return initMessage;
}

function computeTaxes(product) {
    return product.price * (product.taxPercentage/100)
}

function computeProductPriceWithDiscount(product) {
    return product.price - (product.price * (product.discount/100));
}

function isEmptySelection(selection) {
    return isNaN(selection) || isEmptyString(selection) || selection < 1;
}

function isEmptyString(variable) {
    return variable === "";
}

function isString(variable) {
    return typeof variable === 'string';
}
