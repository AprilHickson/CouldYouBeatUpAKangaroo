import { Component, OnInit } from '@angular/core';
import {
  faCheckCircle,
  faTimesCircle,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { FormService } from '../form.service';

@Component({
  selector: 'app-results-view',
  templateUrl: './results-view.component.html',
  styleUrls: ['./results-view.component.scss'],
})
export class ResultsViewComponent implements OnInit {
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  faArrowRight = faArrowRight;

  get could() {
    return this.formService.getIfCould();
  }

  constructor(private formService: FormService) {}

  ngOnInit(): void {}

  reset() {
    this.formService.form.reset();
    this.formService.currentStep = 0;
  }
}
