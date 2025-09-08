export class User{
    [x: string]: any;
    constructor(
        public readonly id: number,
        public name: string,
        public email: string,
    ) {}
}