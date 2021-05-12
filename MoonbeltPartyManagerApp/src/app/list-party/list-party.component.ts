import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Party } from '../models/party';
import { PartyService } from '../services/party.service';

@Component({
  selector: 'app-list-party',
  templateUrl: './list-party.component.html',
  styleUrls: ['./list-party.component.scss']
})
export class ListPartyComponent implements OnInit {

  parties: Party[] = [];

  constructor(
    private partyService: PartyService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.partyService.getParties().subscribe((data) => {
      this.parties = data;
    });
  }

  deleteParty(party: Party) {
    this.partyService.deleteParty(party.id).subscribe(() => {
      this.partyService.getParties().subscribe((data) => {
        this.parties = data;
      });
    });
  }

  goToAddPerson(party: Party) {
    this.router.navigate([party.id, 'add-person'], { relativeTo: this.route });
  }
  goToUpdateParty(party: Party) {
    this.router.navigate([party.id, 'edit'], { relativeTo: this.route });
  }
  goToPersons(party: Party) {
    this.router.navigate([party.id, 'persons'], { relativeTo: this.route });
  }
}
