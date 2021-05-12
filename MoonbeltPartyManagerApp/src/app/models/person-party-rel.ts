import { jsonObject, jsonMember } from '../../../node_modules/typedjson';

@jsonObject
export class PersonPartyRel {
    @jsonMember({ name: "personId", constructor: Number })
    personId!: number;

    @jsonMember({ name: "partyId", constructor: Number })
    partyId!: number;

    @jsonMember({ name: "drinkId", constructor: Number })
    drinkId!: number;

    public constructor(init?: Partial<PersonPartyRel>)
    {
       Object.assign(this,init);
    }
}
