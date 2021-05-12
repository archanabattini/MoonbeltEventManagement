import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Party } from '../models/party';
import { PartyService } from '../services/party.service';

@Component({
  selector: 'app-manage-party',
  templateUrl: './manage-party.component.html',
  styleUrls: ['./manage-party.component.scss']
})
export class ManagePartyComponent implements OnInit {

  partyForm: FormGroup;
  party: Party;
  constructor(
    private partyService: PartyService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
    ) { 
    this.party = new Party();
    this.partyForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.party = new Party();
    this.partyForm = this.fb.group({
      "id": new FormControl(null, []),
      "title": new FormControl(null, [Validators.required]),
      "venue": new FormControl(null, [Validators.required]),
      "startDateTime": new FormControl(null, [Validators.required]),
      "endDateTime": new FormControl(null, [Validators.required])
    });
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id && id > 0) {
        this.partyService.getParty(id).subscribe((data) => {
          this.party = data;
          this.partyForm.patchValue(this.party);
        });
      }
    });
  }

  onAddOrUpdateParty() {
    if (this.partyForm.valid) {
      const party = this.partyForm.value;
      if (party.id) {
        this.partyService.updateParty(new Party(party)).subscribe((data) => {
          this.router.navigateByUrl('/parties');
        });
      } else {
        this.partyService.addNewParty(new Party(party)).subscribe((data) => {
          this.router.navigateByUrl('/parties');
        });
      }
    }
  }
}
