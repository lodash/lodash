/**
 * A specialized version of `sort` which performs sorting based on multiple
 * criteria.
 *
 * @private
 * @param {Array} arr The array to sort.
 * @param {Array} criteria The criteria to sort by.
 * @returns {Array} Returns the sorted array.
 */
type SortOrder = 'asc' | 'desc';

interface SortCriterion {
    key: string;
    order?: SortOrder;
}

interface SortableObject {
    [key: string]: any;
}

function multiSort<T extends SortableObject>(arr: T[], criteria: SortCriterion[]): T[] {
    return arr.sort((a, b) => {
        for (const criterion of criteria) {
            const key = criterion.key;
            const order: SortOrder = criterion.order || 'asc';
            const aValue = a[key];
            const bValue = b[key];

            if (aValue < bValue) {
                return order === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return order === 'asc' ? 1 : -1;
            }
        }
        return 0;
    });
}

export default multiSort;
