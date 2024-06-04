// this is created to display the api errors ,incaseapi didnot work how will the error must be displayed cominh from api
// we adding something in Error class provided by nodejs

class ApiError extends Error{

    // define constructor that accepts 4 arugemnts
    constructor(statusCode,message="something went wrong",errors=[],stack=""){
        super(message)
        // this here act as object so as object is created and passes values to constructor
        // say ApiError a1 ,a1 is object then a1.statusCode will be the passed statusCode
//    creating object in javascript
// const personobject = new Person('John', 30, 'New York');  Person is class , 


        this.statusCode=statusCode
        this.message=message
        this.errors=errors

        this.data=null
        this.success=false;

        if (stack) {
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

export {ApiError}