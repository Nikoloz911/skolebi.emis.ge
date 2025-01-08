import { Component, OnInit } from '@angular/core';
import { Ischool } from '../../interfaces/school.model';
import { SchoolService } from '../../services/school.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-schools-details',
  templateUrl: './schools-details.component.html',
  styleUrls: ['./schools-details.component.scss']
})
export class SchoolsDetailsComponent implements OnInit {
  chool: Ischool | undefined;
  chools: Ischool[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private schoolService: SchoolService
  ) {}

  ngOnInit(): void {
    let id = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.chool = this.schoolService.getMockSchools().find(s => s?.id === id);
    if (this.chool) {
      this.chool.imageURL = this.chool.imageAttachmentId 
        ? `https://skolebi.emis.ge/back/imagedownload?attachmentId=${this.chool.imageAttachmentId}` 
        : 'https://skolebi.emis.ge/assets/images/empty-image.png';
    }
  }
  
}






