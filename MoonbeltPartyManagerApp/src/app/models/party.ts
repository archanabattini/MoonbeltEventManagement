import { jsonObject, jsonMember } from '../../../node_modules/typedjson';

@jsonObject
export class Party {
    @jsonMember({ name: "id", constructor: Number })
    id!: number;

    @jsonMember({ name: "name", constructor: String })
    title!: string;

    @jsonMember({ name: "venue", constructor: String })
    venue!: string;

    @jsonMember({ name: "startDateTime", constructor: String })
    startDateTime!: string;

    @jsonMember({ name: "endDateTime", constructor: String })
    endDateTime!: string;

   public constructor(init?: Partial<Party>)
   {
      Object.assign(this,init);
   }
}
