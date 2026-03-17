export interface ContentSectionSelectionContext<T> {
	selectedItem: T | null;
	onSelect: (item: T) => void;
	onDeselect: () => void;
}
