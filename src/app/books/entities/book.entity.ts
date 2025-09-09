export class User{
    [x: string]: any;
    constructor(
        public readonly id: number,
        public title: string,
        public author: string,
        public categoty: string,
        public availabe?: boolean,
    ) {}
}
