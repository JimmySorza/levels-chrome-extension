export const insertString = (originalString: string, index: number, insertString: string) =>
    originalString.slice(0, index) + insertString + originalString.slice(index);
