// Общие типы данных
export type PrimitiveType = "cube" | "pyramid";

export interface Primitive {
    id: string;
    type: PrimitiveType;
    width: number;
    height: number;
    depth: number;
    position: [number, number, number];
    color: string;
    selected: boolean;

}