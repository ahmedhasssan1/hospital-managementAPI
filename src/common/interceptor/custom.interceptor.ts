import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import e from "express";
import { map, Observable, of } from "rxjs";

export class treansformInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data)=>{
                return this.removePasswordFields(data);
            })
        )
    }
    private removePasswordFields(obj:any):any{
        if(Array.isArray(obj)){
            return obj.map((item)=>this.removePasswordFields(item));
        }else if(typeof obj!=null && typeof obj==='object'){
            const newobj={...obj};
            for(const key in newobj){
                if(key==='password'){
                    delete newobj[key];
                }else if(typeof newobj[key]==='object'){
                   newobj[key]= this.removePasswordFields(newobj[key]);
                }
            }
            return newobj;
        }
        return obj;
    }
}