export default class Collection<K, V> extends Map<K, V> {
    constructor() {
        super();
    };
    public find(fn: (value: V, key: K, collection: Collection<K, V>) => boolean): V {
        for(const [key, val] of this) {
            if(fn(val, key, this)) return val;
        };
    };
};