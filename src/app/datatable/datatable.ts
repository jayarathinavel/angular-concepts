export class Datatable {
    name: string;
    columns: string[];
    data: { name: string; age: number; email: string; }[];

    constructor(name: string, columns: string[], data: { name: string; age: number; email: string; }[]) {
        this.name = name;
        this.columns = columns;
        this.data = data;
    }

    getRowCount(): number {
        return this.data.length;
    }
}
