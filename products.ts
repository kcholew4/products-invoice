import { Table } from "./markdown";

export enum Vat {
  VAT8,
  VAT23,
}

export class Product {
  public name: string;
  public net: number;
  public vat: Vat;

  constructor(name: string, net: number, vat: Vat) {
    this.name = name;
    this.net = net;
    this.vat = vat;
  }

  public getTax() {
    switch (this.vat) {
      case Vat.VAT8:
        return 0.08;
      case Vat.VAT23:
        return 0.23;
    }
  }

  public getTaxAmount() {
    return this.net * this.getTax();
  }
}

export class ProductsList {
  private products: Product[] = [];

  public add(product: Product) {
    this.products.push(product);
  }

  public print() {
    const header = ["", "Total", ...this.getProductNames()];
    const net = ["Net", this.amountString(this.getTotalNet()), ...this.getProductsNetRow()];
    const vat8 = [
      "VAT 8%",
      this.amountString(this.getTotalTax(Vat.VAT8)),
      ...this.getProductsTaxRow(Vat.VAT8),
    ];
    const vat23 = [
      "VAT 23%",
      this.amountString(this.getTotalTax(Vat.VAT23)),
      ...this.getProductsTaxRow(Vat.VAT23),
    ];

    const table = new Table([header, net, vat8, vat23]);
    console.log(table.toString());
  }

  public getTotalTax(vat: Vat) {
    let total = 0;
    for (const product of this.products) {
      if (product.vat === vat) {
        total += product.getTaxAmount();
      }
    }
    return total;
  }

  public getTotalNet() {
    let total = 0;
    for (const product of this.products) {
      total += product.net;
    }
    return total;
  }

  public getProductNames() {
    return this.products.map((product) => product.name);
  }

  private getProductsTaxRow(vat: Vat) {
    return this.products.map((product) => {
      if (product.vat === vat) {
        return this.amountString(product.getTaxAmount());
      }
      return "x";
    });
  }

  private getProductsNetRow() {
    return this.products.map((product) => this.amountString(product.net));
  }

  private amountString(amount: number) {
    return `${amount.toFixed(2)} zł`;
  }
}
