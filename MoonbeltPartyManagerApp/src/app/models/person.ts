import { jsonObject, jsonMember } from '../../../node_modules/typedjson';

@jsonObject
export class Person {
    @jsonMember({ name: "id", constructor: Number })
    id!: number;
    
    @jsonMember({ name: "firstName", constructor: String })
    firstName!: string;

    @jsonMember({ name: "lastName", constructor: String })
    lastName!: string;

    @jsonMember({ name: "email", constructor: String })
    email!: string;

    @jsonMember({ name: "phoneNumber", constructor: String })
    phoneNumber!: string;
 
    public constructor(init?: Partial<Person>)
    {
       Object.assign(this,init);
    }
}
