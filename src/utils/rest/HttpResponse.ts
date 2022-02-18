export class HttpResponse {
    private message: string;
    private status: number;
    private reason: any;
    private data: any;

    constructor() {
        this.message = undefined;
        this.status = undefined;
        this.reason = undefined;
        this.data = undefined;
    }

    public get $message(): string {
        return this.message;
    }

    public set $message(value: string) {
        this.message = value;
    }

    public get $status(): number {
        return this.status;
    }

    public set $status(value: number) {
        this.status = value;
    }

    public get $reason(): any {
        return this.reason;
    }

    public set $reason(value: any) {
        this.reason = value;
    }

    public get $data(): any {
        return this.data;
    }

    public set $data(value: any) {
        this.data = value;
    }
}
