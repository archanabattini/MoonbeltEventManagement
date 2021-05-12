import { jsonObject, jsonMember } from '../../../node_modules/typedjson';

@jsonObject
export class Drink {
    @jsonMember({ name: "id", constructor: Number })
    id: number = 0;
    @jsonMember({ name: "name", constructor: String })
    name: string = '';
 
    public constructor(init?: Partial<Drink>)
    {
       Object.assign(this,init);
    }
}
