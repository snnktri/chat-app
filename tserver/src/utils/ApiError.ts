class ApiError extends Error {
    statusCode:number;
    errors:string[];
    data:any;
    success:boolean;

    constructor(
        statusCode:number,
        message:string = "Something went wrong",
        errors: string[]=[],
        stack: string=''
    ) {
        super(message)
        this.statusCode=statusCode;
        this.errors=errors;
        this.data=null;
        this.success=false;

        this.message=message;

        if(stack) {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }