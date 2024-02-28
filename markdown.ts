export class Table {
  private table: string[][] = [];
  private columns = 0;
  private rows = 0;

  constructor(table?: string[][]) {
    if (table !== undefined) {
      for (const row of table) {
        this.addRow(...row);
      }
    }
  }

  public addRow(...cells: string[]) {
    this.table.push(cells);
    if (this.columns < cells.length) {
      this.columns = cells.length;
    }
    this.rows++;
  }

  public toString() {
    const cols: string[][] = [];
    for (let i = 0; i < this.columns; i++) {
      cols.push(this.formatColumn(i));
    }

    let text = "";

    // +1 to adjust for the delimiter row
    for (let i = 0; i < this.rows + 1; i++) {
      const row = cols.map((col) => col[i]);
      text += this.mergeRowCells(row) + "\n";
    }

    return text;
  }

  private mergeRowCells(row: string[]) {
    let merged = "";
    for (const [index, cell] of row.entries()) {
      if (index !== row.length - 1) {
        merged += cell.slice(0, -1);
      } else {
        merged += cell;
      }
    }
    return merged;
  }

  // Returns an array of nicely formatted cells forming a column
  private formatColumn(colIndex: number) {
    const maxCellLength = Math.max(...this.table.map((row) => row[colIndex].length));
    let column: string[] = [];

    for (const [rowIndex, row] of this.table.entries()) {
      const content = row[colIndex];
      column.push(this.drawCell(content, maxCellLength));
      if (rowIndex === 0) {
        column.push(this.drawDelimiter(maxCellLength));
      }
    }
    return column;
  }

  private drawCell(content: string, maxLength?: number) {
    if (maxLength === undefined) {
      return `|${content}|`;
    }

    return `|${content.padEnd(maxLength, " ")}|`;
  }

  private drawDelimiter(length?: number) {
    if (length === undefined) {
      return `|-|`;
    }

    return `|${"-".repeat(length)}|`;
  }
}
