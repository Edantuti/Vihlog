import { createFn } from "@/app/actions/site/actions"
import { Input } from "@/components/ui/input"
import {Checkbox} from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import SubmitButton from "@/components/submitButton"

export default ()=>{
    return (
        <form action={createFn} className="flex flex-col w-96 gap-5">
                <Label htmlFor="name">Name:</Label>
                <Input name="name" title="name" placeholder="Name" type="text" required/>
                <Label htmlFor="description">Description:</Label>
                <Textarea name="description" title="description" placeholder="Description" required/>
                <span className="flex items-center gap-2">
                    <Checkbox name="visible" title="visible" value="true"/>
                    <Label htmlFor="visible">Private?</Label>
                </span>
                <SubmitButton />                
            </form>
    )
}
