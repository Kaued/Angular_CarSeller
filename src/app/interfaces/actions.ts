export interface Actions {
  target: "show" | "edit" | "remove",
  action: (id: number) => void,
}
