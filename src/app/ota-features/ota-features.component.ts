import {Component, OnInit} from '@angular/core';
import {NgFor, NgForOf, NgStyle} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {OtaVariable} from "../shared/models/ota-variable";
import {OtaVariableService} from "../shared/services/ota-variable.service";

@Component({
  selector: 'app-ota-features',
  standalone: true,
  imports: [
    NgForOf,
    NgStyle,
    IconFieldModule,
    InputIconModule
  ],
  templateUrl: './ota-features.component.html',
  styleUrl: './ota-features.component.scss'
})
export class OtaFeaturesComponent implements OnInit {

  loading: boolean = false;

  features: OtaVariable[] = [
    {
      id: 1,
      name: 'Εμβαδό Οριζοντίων',
      lastUpdate: new Date().toISOString(),
      description: 'Το εμβαδό των οριζοντίων αναφέρεται στο συνολικό εμβαδόν των οριζοντίων επιφανειών ΟΤΑ',
      variableType: ''
    },
    {
      id: 2,
      name: 'Κατάσταση Κτηματογράφησης',
      lastUpdate: new Date().toISOString(),
      description: 'Η κτηματογράφηση αναφέρεται στη διαδικασία καταγραφής, ανάλυσης και ενημέρωσης των στοιχείων που αφορούν την ακίνητη περιουσία σε μια συγκεκριμένη περιοχή για κάθε ΟΤΑ',
      variableType: ''
    },
    {
      id: 3,
      name: 'Πλήθος Κατασχέσεων',
      lastUpdate: new Date().toISOString(),
      description: 'Το πλήθος κατασχέσεων αναφέρεται στον συνολικό αριθμό των κατασχέσεων που έχουν πραγματοποιηθεί σε ένα συγκεκριμένο χρονικό' +
        'πλαίσιο ΟΤΑ',
      variableType: ''
    },
    {
      id: 4,
      name: 'Πλήθος Υποθηκών',
      lastUpdate: new Date().toISOString(),
      description: 'Το πλήθος υποθηκών είναι ο αριθμός των υποθηκών που έχουν εγγραφεί πάνω σε ένα ακίνητο',
      variableType: ''
    },
    {
      id: 5,
      name: 'Πλήθος Ιδιοκτητών',
      lastUpdate: new Date().toISOString(),
      description: 'Το πλήθος ιδιοκτητών αφορά τον συνολικό αριθμό των ατόμων ή νομικών προσώπων που κατέχουν ιδιοκτησιακά δικαιώματα σε ένα ακίνητο ή σε μια συγκεκριμένη περιοχή',
      variableType: ''
    },
    {
      id: 6,
      name: 'Πλήθος Οριζόντιων Ιδιοκτησιών',
      lastUpdate: new Date().toISOString(),
      description: 'Το πλήθος οριζόντιων ιδιοκτησιών είναι ο αριθμός των ξεχωριστών οριζόντιων ιδιοκτησιών που υπάρχουν σε ένα συγκεκριμένο ακίνητο ή συγκρότημα ακινήτων',
      variableType: ''
    },
    {
      id: 7,
      name: 'Πλήθος Αγοραπωλησιών',
      lastUpdate: new Date().toISOString(),
      description: 'Το πλήθος αγοραπωλησιών αφορά τον αριθμό των συναλλαγών που σχετίζονται με την αγορά και την πώληση ακινήτων ή άλλων περιουσιακών στοιχείων μέσα σε ένα συγκεκριμένο χρονικό διάστημα',
      variableType: ''
    },
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private otaVariableService: OtaVariableService
  ) {}

  ngOnInit() {
    this.loadOtaVariables();
  }

  loadOtaVariables() {
    this.loading = true;
    this.otaVariableService.getOtaVariables().subscribe({
      next: (data: OtaVariable[]) => {
        this.features = data;
        this.loading = false;
      },
      error: err => {
        this.loading = false;
      }
    });
  }

  goToFeatureReport(feature: OtaVariable) {
    // TODO: add the routing function to a service
    this.router.navigate([ feature.id ], { relativeTo: this.activatedRoute });
  }
}
