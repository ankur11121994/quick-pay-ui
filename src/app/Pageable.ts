import { Product } from "./product";

export class Pageable {
    constructor(public currentPage: number,
        public items: Product[],
        public pageSize: number,
        public totalElements: number,
        public totalPages: number) { }

}
