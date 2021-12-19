export default class Collection extends Map {
    constructor() {
        super();
    }
    ;
    find(fn) {
        for (const [key, val] of this) {
            if (fn(val, key, this))
                return val;
        }
        ;
    }
    ;
}
;
