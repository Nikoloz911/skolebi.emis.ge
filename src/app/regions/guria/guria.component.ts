import { Component } from '@angular/core';
import { Ischool } from '../../interfaces/school.model';
import { SchoolService } from '../../services/school.service';
@Component({
  selector: 'app-guria',
  templateUrl: './guria.component.html',
  styleUrl: './guria.component.scss'
})
export class GuriaComponent {
  schools: Ischool[] = [];
  originalSchools: Ischool[] = [];
  schoolsToShow: number = 24;
  searchQuery: string = '';
  currentHeight: number = 3870;

  constructor(public schoolService: SchoolService) {}

  ngOnInit(): void {
    const rawSchools = this.schoolService.getMockSchools();
    this.originalSchools = this.filterValidSchools(rawSchools);
    console.log('Total schools loaded:', this.originalSchools.length);
    this.loadSchools();
    this.setaupeventListeners2();
    this.setaupeventListeners3();
    this.setupeventlisteners4();
  }

  private filterValidSchools(data: (Ischool | undefined)[]): Ischool[] {
    return data.filter((school): school is Ischool => school !== undefined);
  }
  setaupeventListeners2(): void {
    let mainCheckbox = document.getElementById('main-checkbox') as HTMLInputElement;
    let firstCheckbox = document.getElementById('first-checkbox-1') as HTMLInputElement;
    let secondCheckbox = document.getElementById('first-checkbox-2') as HTMLInputElement;
    let thirdCheckbox = document.getElementById('first-checkbox-3') as HTMLInputElement;
  
    if (mainCheckbox && firstCheckbox && secondCheckbox && thirdCheckbox) {
      mainCheckbox.addEventListener('change', () => {
        if (mainCheckbox.checked) {
          firstCheckbox.checked = true;
          secondCheckbox.checked = true;
          thirdCheckbox.checked = true;
        } else {
          firstCheckbox.checked = false;
          secondCheckbox.checked = false;
          thirdCheckbox.checked = false;
        }
      });
    }
  }
  
  setaupeventListeners3(): void {
    let mainCheckbox = document.getElementById('menu-main-checkbox') as HTMLInputElement;
    let checkboxes = document.querySelectorAll('.first-checkbox0') as NodeListOf<HTMLInputElement>;
    if (mainCheckbox && checkboxes) {
      mainCheckbox.addEventListener('change', () => {      
        checkboxes.forEach(checkbox => {
          checkbox.checked = mainCheckbox.checked;     
        });
      });
    } 
  }
  setupeventlisteners4(): void {
  
    let checkboxes = [
      'privateSchoolsCheckbox',
      'publicSchoolsCheckbox',
      'main-checkbox',
      'first-checkbox-1',
      'first-checkbox-2',
      'first-checkbox-3',
      'first-checkbox-01',
      'first-checkbox-02',
      'first-checkbox-03',
      'first-checkbox-04',
      'first-checkbox-05',
      'first-checkbox-06',
      'first-checkbox-07'
    ];
  
    checkboxes.forEach(id => {
      let checkbox = document.getElementById(id) as HTMLInputElement;
      if (checkbox) {
        checkbox.addEventListener('change', () => {
          this.filterSchools();
        });
      } else {
        console.warn(`Checkbox with id ${id} not found.`);
      }
    });
  }
  
  filterSchools(): void {
    let mainCheckbox = document.getElementById('main-checkbox') as HTMLInputElement;
    let firstCheckbox = document.getElementById('first-checkbox-1') as HTMLInputElement;
    let secondCheckbox = document.getElementById('first-checkbox-2') as HTMLInputElement;
    let thirdCheckbox = document.getElementById('first-checkbox-3') as HTMLInputElement;
    let oneCheckbox = document.getElementById('first-checkbox-01') as HTMLInputElement;
    let twoCheckbox = document.getElementById('first-checkbox-02') as HTMLInputElement;
    let threeCheckbox = document.getElementById('first-checkbox-03') as HTMLInputElement;
    let fourCheckbox = document.getElementById('first-checkbox-04') as HTMLInputElement;
    let fiveCheckbox = document.getElementById('first-checkbox-05') as HTMLInputElement;
    let sixCheckbox = document.getElementById('first-checkbox-06') as HTMLInputElement;
    let sevenCheckbox = document.getElementById('first-checkbox-07') as HTMLInputElement;
    let filteredSchools = this.originalSchools;
   
    if (mainCheckbox && mainCheckbox.checked) {
      filteredSchools = filteredSchools.filter(school => school.educationStatus === 'any');
    }
    if (firstCheckbox && firstCheckbox.checked) {
      filteredSchools = filteredSchools.filter(school => school.educationStatus === 'დაწყებითი (1-6)');
    }
    if (secondCheckbox && secondCheckbox.checked) {
      filteredSchools = filteredSchools.filter(school => school.educationStatus === 'საბაზო (7-9)');
    }
    if (thirdCheckbox && thirdCheckbox.checked) {
      filteredSchools = filteredSchools.filter(school => school.educationStatus === 'საშუალო (10-12)');
    }
  
  
    if (oneCheckbox && oneCheckbox.checked) {
      filteredSchools = filteredSchools.filter(school => school.sectors && school.sectors.includes('ქართული'));
    }
    if (twoCheckbox && twoCheckbox.checked) {
      filteredSchools = filteredSchools.filter(school => school.sectors && school.sectors.includes('რუსული'));
    }
    if (threeCheckbox && threeCheckbox.checked) {
      filteredSchools = filteredSchools.filter(school => school.sectors && school.sectors.includes('სომხური'));
    }
    if (fourCheckbox && fourCheckbox.checked) {
      filteredSchools = filteredSchools.filter(school => school.sectors && school.sectors.includes('უკრაინული'));
    }
    if (fiveCheckbox && fiveCheckbox.checked) {
      filteredSchools = filteredSchools.filter(school => school.sectors && school.sectors.includes('აზერბაიჯანული'));
    }
    if (sixCheckbox && sixCheckbox.checked) {
      filteredSchools = filteredSchools.filter(school => school.sectors && school.sectors.includes('ინგლისური'));
    }
    if (sevenCheckbox && sevenCheckbox.checked) {
      filteredSchools = filteredSchools.filter(school => school.sectors && school.sectors.includes('გერმანული'));
    }
  
  
    this.schools = filteredSchools.slice(0, this.schoolsToShow);
    this.adjustHeight();
  }
  

  searchSchools(): void {
    let searchInput = this.searchQuery.trim().toLowerCase();
    if (searchInput === "") {
      this.loadSchools();
      return;
    }

    this.schools = this.originalSchools.filter(school =>
      (school.name && school.name.toLowerCase().includes(searchInput)) ||
      (school.id?.toString()?.includes(searchInput))
    );

    console.log('Schools found:', this.schools.length); 

    if (this.schools.length === 0) {
    }
  }

  loadSchools(): void {
    this.originalSchools.forEach(school => {
      if (school.imageAttachmentId) {
        school.imageURL = `https://skolebi.emis.ge/back/imagedownload?attachmentId=${school.imageAttachmentId}`;
      } else {
        school.imageURL = 'https://skolebi.emis.ge/assets/images/empty-image.png';
      }
      
    });

    this.schools = this.originalSchools.slice(0, this.schoolsToShow);
    this.schools = this.originalSchools.filter(school => school.regionName === 'გურია').slice(0, this.schoolsToShow);
    console.log('Schools to display:', this.schools.length);
    this.adjustHeight();
  }



  showMoreSchools(): void {
    this.schoolsToShow += 12;  
    this.loadSchools();
    this.filterSchools();
    this.adjustHeight();
  }

  adjustHeight(): void {
    let schoolsSection = document.getElementById('schools-section');
    if (schoolsSection) {
      this.currentHeight += 750
      schoolsSection.style.height = `${this.currentHeight}px`;
    }
  }


  
  clearSearch(): void {
    this.searchQuery = '';
    this.loadSchools(); 
  }




  ngAfterViewInit(): void {
    let dropdowns = document.querySelectorAll<HTMLElement>(".dropdown");
    let thirdDropdowns = document.querySelectorAll<HTMLAnchorElement>(".third-dropdown");
    let fourthDropdowns = document.querySelectorAll<HTMLAnchorElement>(".fourth-dropdown");

    let initializeDropdown = (dropdowns: NodeListOf<HTMLElement | HTMLAnchorElement>) => {
      dropdowns.forEach((dropdown) => {
        let select = dropdown.querySelector<HTMLElement>(".select");
        let caret = dropdown.querySelector<HTMLElement>(".caret");
        let menu = dropdown.querySelector<HTMLElement>(".menu");
        let options = dropdown.querySelectorAll<HTMLElement>(".menu li");
        let selected = dropdown.querySelector<HTMLElement>(".selected");
        select?.addEventListener("click", () => {
          let menuIsOpen = menu?.classList.toggle("menu-open");
          let clearButton = document.getElementById('clear-button');
          let checkmarkSide = document.getElementById('checkmark-side');
          
          select?.classList.toggle("select-clicked");
          caret?.classList.toggle("caret-rotate");
        
          if (clearButton) {
            clearButton.style.display = menuIsOpen ? 'none' : '';
          }
          if (checkmarkSide) {
            checkmarkSide.style.display = menuIsOpen ? 'none' : '';
          }
          if (menuIsOpen) {
            
            dropdown.style.zIndex = '2000';
          } else {
           
            dropdown.style.zIndex = '';
          }
        });

        options.forEach((option) => {
          option.addEventListener("click", () => {
            if (selected) {
              selected.innerText = option.innerText;
            }
            select?.classList.remove("select-clicked");
            caret?.classList.remove("caret-rotate");
            menu?.classList.remove("menu-open");
          });
        });

        document.addEventListener("click", (event) => {
          if (!dropdown.contains(event.target as Node)) {
            select?.classList.remove("select-clicked");
            caret?.classList.remove("caret-rotate");
            menu?.classList.remove("menu-open");
          }
        });
      });
    };

    initializeDropdown(dropdowns);
    initializeDropdown(thirdDropdowns);
    initializeDropdown(fourthDropdowns);
  }

}
