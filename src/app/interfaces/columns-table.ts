export interface ColumnsTable {
  column: string,
  name: string,
  field: string,
  type: "money" | "text" | "image" | "boolean",
  baseApiUrL?: boolean
}
