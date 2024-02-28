import { ProductsList, Product, Vat } from "./products";

const products = new ProductsList();

products.add(new Product("Clean Code, Robert C. Martin", 100, Vat.VAT8));
products.add(new Product("Applying UML and Patterns, C. Larman", 300, Vat.VAT8));
products.add(new Product("Shipping", 50, Vat.VAT23));

products.print();
