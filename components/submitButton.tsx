"use client"
import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom"

export default ({children}:{children?:string})=>{
    const {pending} = useFormStatus()
    return(
        <Button disabled={pending}>{children?children:"Submit"}</Button>
    )
}