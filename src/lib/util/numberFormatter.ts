export const numberFormatter = (number: number) => {
    const greaterThan10k = number > 10_000;
    const notation = greaterThan10k ? 'compact' : 'standard';
    
    return Intl.NumberFormat('en', { notation }).format(number);
};
