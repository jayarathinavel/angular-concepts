class Column {
    name: string;
    type: string;

    constructor(name: string, type: string) {
        this.name = name;
        this.type = type;
    }
}

export class Datatable {
    name: string;
    columns: string[];
    data: { [key: string]: any }[];

    constructor(name: string, columns: string[], data: { [key: string]: any }[]) {
        this.name = name;
        this.columns = columns;
        this.data = data;
    }

    getRowCount(): number {
        return this.data.length;
    }

    getColumnNames(): string[] {
        return this.columns;
    }

    getColumnData(columnName: string): any[] {
        if (!this.columns.includes(columnName)) {
            throw new Error(`Column "${columnName}" does not exist in the datatable.`);
        }
        return this.data.map(row => row[columnName]);
    }
}
