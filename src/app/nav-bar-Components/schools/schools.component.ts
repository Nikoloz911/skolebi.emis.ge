import { Component, OnInit } from '@angular/core';
import { Ischool } from '../../interfaces/school.model';
import { SchoolService } from '../../services/school.service';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss'],
})
export class SchoolsComponent implements OnInit {
  schools: Ischool[] = [];
  originalSchools: Ischool[] = [];
  schoolsToShow: number = 24;
  searchQuery: string = '';
  currentHeight: number = 3500;

  //  API -ს  ნაცვლად გამოვიყენე INTERFACE და ეს სერვისი

  constructor(public schoolService: SchoolService) {}

  showMoreSchools(): void {
    this.schoolsToShow += 12;
    this.loadSchools();
    this.filterSchools();
    this.adjustHeight();
  }

  ngOnInit(): void {
    let rawSchools = this.schoolService.getMockSchools();
    this.originalSchools = this.filterValidSchools(rawSchools);
    console.log('schools loaded:', this.originalSchools.length);
    this.loadSchools();
    this.setupEventListeners();
    this.setaupeventListeners2();
    this.setaupeventListeners3();
    this.setupeventlisteners4();
  }

  private filterValidSchools(data: (Ischool | undefined)[]): Ischool[] {
    return data.filter((school): school is Ischool => school !== undefined);
  }
  searchSchools(): void {
    let searchInput = this.searchQuery.trim().toLowerCase();
    if (searchInput === '') {
      this.loadSchools();
      return;
    }

    let uniqueSchools = new Set<number>();
    this.schools = [];

    for (let school of this.originalSchools) {
      if (
        (school.name && school.name.toLowerCase().includes(searchInput)) ||
        (typeof school.id === 'number' &&
          school.id.toString().includes(searchInput))
      ) {
        if (!uniqueSchools.has(school.id!)) {
          uniqueSchools.add(school.id!);
          this.schools.push(school);
        }
      }
    }

    let noResultContainer = document.getElementById('no-result');

    if (noResultContainer) {
      if (this.schools.length === 0) {
        noResultContainer.style.display = 'block';
      } else {
        noResultContainer.style.display = 'none';
      }
    }
  }
  loadSchools(): void {
    this.originalSchools.forEach((school) => {
      if (school.imageAttachmentId) {
        school.imageURL = `https://skolebi.emis.ge/back/imagedownload?attachmentId=${school.imageAttachmentId}`;
      } else {
        school.imageURL =
          'https://skolebi.emis.ge/assets/images/empty-image.png';
      }
    });

    this.schools = this.originalSchools.slice(0, this.schoolsToShow);
    console.log('Schools to display:', this.schools.length);
    this.adjustHeight();
  }

  setupEventListeners(): void {
    let privateSchoolsCheckbox = document.getElementById(
      'privateSchoolsCheckbox'
    ) as HTMLInputElement;
    let publicSchoolsCheckbox = document.getElementById(
      'publicSchoolsCheckbox'
    ) as HTMLInputElement;

    privateSchoolsCheckbox.addEventListener(
      'change',
      this.filterSchools.bind(this)
    );
    publicSchoolsCheckbox.addEventListener(
      'change',
      this.filterSchools.bind(this)
    );
  }

  setaupeventListeners2(): void {
    let mainCheckbox = document.getElementById(
      'main-checkbox'
    ) as HTMLInputElement;
    let firstCheckbox = document.getElementById(
      'first-checkbox-1'
    ) as HTMLInputElement;
    let secondCheckbox = document.getElementById(
      'first-checkbox-2'
    ) as HTMLInputElement;
    let thirdCheckbox = document.getElementById(
      'first-checkbox-3'
    ) as HTMLInputElement;

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
    let mainCheckbox = document.getElementById(
      'menu-main-checkbox'
    ) as HTMLInputElement;
    let checkboxes = document.querySelectorAll(
      '.first-checkbox0'
    ) as NodeListOf<HTMLInputElement>;
    if (mainCheckbox && checkboxes) {
      mainCheckbox.addEventListener('change', () => {
        checkboxes.forEach((checkbox) => {
          checkbox.checked = mainCheckbox.checked;
        });
      });
    }
  }
  setupeventlisteners4(): void {
    let privateSchoolsCheckbox = document.getElementById(
      'privateSchoolsCheckbox'
    ) as HTMLInputElement;
    let publicSchoolsCheckbox = document.getElementById(
      'publicSchoolsCheckbox'
    ) as HTMLInputElement;
    let mainCheckbox = document.getElementById(
      'main-checkbox'
    ) as HTMLInputElement;
    let firstCheckbox = document.getElementById(
      'first-checkbox-1'
    ) as HTMLInputElement;
    let secondCheckbox = document.getElementById(
      'first-checkbox-2'
    ) as HTMLInputElement;
    let thirdCheckbox = document.getElementById(
      'first-checkbox-3'
    ) as HTMLInputElement;
    let oneCheckbox = document.getElementById(
      'first-checkbox-01'
    ) as HTMLInputElement;
    let twoCheckbox = document.getElementById(
      'first-checkbox-02'
    ) as HTMLInputElement;
    let threeCheckbox = document.getElementById(
      'first-checkbox-03'
    ) as HTMLInputElement;
    let fourCheckbox = document.getElementById(
      'first-checkbox-04'
    ) as HTMLInputElement;
    let fiveCheckbox = document.getElementById(
      'first-checkbox-05'
    ) as HTMLInputElement;
    let sixCheckbox = document.getElementById(
      'first-checkbox-06'
    ) as HTMLInputElement;
    let sevenCheckbox = document.getElementById(
      'first-checkbox-07'
    ) as HTMLInputElement;

    let checkboxes = [
      privateSchoolsCheckbox,
      publicSchoolsCheckbox,
      mainCheckbox,
      firstCheckbox,
      secondCheckbox,
      thirdCheckbox,
      oneCheckbox,
      twoCheckbox,
      threeCheckbox,
      fourCheckbox,
      fiveCheckbox,
      sixCheckbox,
      sevenCheckbox,
    ];

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
        this.filterSchools();
      });
    });
  }
  filterSchools(): void {
    let privateSchoolsCheckbox = document.getElementById(
      'privateSchoolsCheckbox'
    ) as HTMLInputElement;
    let publicSchoolsCheckbox = document.getElementById(
      'publicSchoolsCheckbox'
    ) as HTMLInputElement;
    let mainCheckbox = document.getElementById(
      'main-checkbox'
    ) as HTMLInputElement;
    let firstCheckbox = document.getElementById(
      'first-checkbox-1'
    ) as HTMLInputElement;
    let secondCheckbox = document.getElementById(
      'first-checkbox-2'
    ) as HTMLInputElement;
    let thirdCheckbox = document.getElementById(
      'first-checkbox-3'
    ) as HTMLInputElement;
    let oneCheckbox = document.getElementById(
      'first-checkbox-01'
    ) as HTMLInputElement;
    let twoCheckbox = document.getElementById(
      'first-checkbox-02'
    ) as HTMLInputElement;
    let threeCheckbox = document.getElementById(
      'first-checkbox-03'
    ) as HTMLInputElement;
    let fourCheckbox = document.getElementById(
      'first-checkbox-04'
    ) as HTMLInputElement;
    let fiveCheckbox = document.getElementById(
      'first-checkbox-05'
    ) as HTMLInputElement;
    let sixCheckbox = document.getElementById(
      'first-checkbox-06'
    ) as HTMLInputElement;
    let sevenCheckbox = document.getElementById(
      'first-checkbox-07'
    ) as HTMLInputElement;
  
  
    let checkboxes = [
      privateSchoolsCheckbox,
      publicSchoolsCheckbox,
      mainCheckbox,
      firstCheckbox,
      secondCheckbox,
      thirdCheckbox,
      oneCheckbox,
      twoCheckbox,
      threeCheckbox,
      fourCheckbox,
      fiveCheckbox,
      sixCheckbox,
      sevenCheckbox,
    ];
  
    let checkedCount = checkboxes.filter((checkbox) => checkbox.checked).length;
  
   
    if (checkedCount === 1) {
      let filteredSchools = this.originalSchools;
  
      if (privateSchoolsCheckbox.checked && !publicSchoolsCheckbox.checked) {
        filteredSchools = filteredSchools.filter(
          (school) => school.schoolType === 'PRIVATE'
        );
      } else if (
        publicSchoolsCheckbox.checked &&
        !privateSchoolsCheckbox.checked
      ) {
        filteredSchools = filteredSchools.filter(
          (school) => school.schoolType === 'PUBLIC'
        );
      }
  
      if (mainCheckbox.checked) {
        filteredSchools = filteredSchools.filter(
          (school) => school.educationStatus === 'any'
        );
      }
      if (firstCheckbox.checked) {
        filteredSchools = filteredSchools.filter(
          (school) => school.educationStatus === 'დაწყებითი (1-6)'
        );
      }
      if (secondCheckbox.checked) {
        filteredSchools = filteredSchools.filter(
          (school) => school.educationStatus === 'საბაზო (7-9)'
        );
      }
      if (thirdCheckbox.checked) {
        filteredSchools = filteredSchools.filter(
          (school) => school.educationStatus === 'საშუალო (10-12)'
        );
      }
      if (oneCheckbox.checked) {
        filteredSchools = filteredSchools.filter(
          (school) => school.sectors && school.sectors.includes('ქართული')
        );
      }
      if (twoCheckbox.checked) {
        filteredSchools = filteredSchools.filter(
          (school) => school.sectors && school.sectors.includes('რუსული')
        );
      }
      if (threeCheckbox.checked) {
        filteredSchools = filteredSchools.filter(
          (school) => school.sectors && school.sectors.includes('სომხური')
        );
      }
      if (fourCheckbox.checked) {
        filteredSchools = filteredSchools.filter(
          (school) => school.sectors && school.sectors.includes('უკრაინული')
        );
      }
      if (fiveCheckbox.checked) {
        filteredSchools = filteredSchools.filter(
          (school) => school.sectors && school.sectors.includes('აზერბაიჯანული')
        );
      }
      if (sixCheckbox.checked) {
        filteredSchools = filteredSchools.filter(
          (school) => school.sectors && school.sectors.includes('ინგლისური')
        );
      }
      if (sevenCheckbox.checked) {
        filteredSchools = filteredSchools.filter(
          (school) => school.sectors && school.sectors.includes('გერმანული')
        );
      }
  
      this.schools = filteredSchools.slice(0, this.schoolsToShow);
    } else {
      this.schools = this.originalSchools.slice(0, this.schoolsToShow);
    }
  
  }
  

  adjustHeight(): void {
    let schoolsSection = document.getElementById('schools-section');
    if (schoolsSection) {
      this.currentHeight += 1130;
      schoolsSection.style.height = `${this.currentHeight}px`;
    }
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.loadSchools();
  }

  ngAfterViewInit(): void {
    let dropdowns = document.querySelectorAll<HTMLElement>('.dropdown');
    let thirdDropdowns =
      document.querySelectorAll<HTMLAnchorElement>('.third-dropdown');
    let fourthDropdowns =
      document.querySelectorAll<HTMLAnchorElement>('.fourth-dropdown');

    let initializeDropdown = (
      dropdowns: NodeListOf<HTMLElement | HTMLAnchorElement>
    ) => {
      dropdowns.forEach((dropdown) => {
        let select = dropdown.querySelector<HTMLElement>('.select');
        let caret = dropdown.querySelector<HTMLElement>('.caret');
        let menu = dropdown.querySelector<HTMLElement>('.menu');
        let options = dropdown.querySelectorAll<HTMLElement>('.menu li');
        let selected = dropdown.querySelector<HTMLElement>('.selected');

        select?.addEventListener('click', (event) => {
          let menuIsOpen = menu?.classList.toggle('menu-open');
          let clearButton = document.getElementById('clear-button');
          let checkmarkSide = document.getElementById('checkmark-side');

          select?.classList.toggle('select-clicked');
          caret?.classList.toggle('caret-rotate');

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

          dropdowns.forEach((otherDropdown) => {
            if (otherDropdown !== dropdown) {
              let otherMenu = otherDropdown.querySelector<HTMLElement>('.menu');
              if (otherMenu?.classList.contains('menu-open')) {
                otherMenu.classList.remove('menu-open');
                let otherSelect =
                  otherDropdown.querySelector<HTMLElement>('.select');
                let otherCaret =
                  otherDropdown.querySelector<HTMLElement>('.caret');
                otherSelect?.classList.remove('select-clicked');
                otherCaret?.classList.remove('caret-rotate');
                otherDropdown.style.zIndex = '';
              }
            }
          });
        });

        options.forEach((option) => {
          option.addEventListener('click', () => {
            if (selected) {
              selected.innerText = option.innerText;
            }
            select?.classList.remove('select-clicked');
            caret?.classList.remove('caret-rotate');
            menu?.classList.remove('menu-open');
            dropdown.style.zIndex = '';
          });
        });

        document.addEventListener('click', (event) => {
          if (!dropdown.contains(event.target as Node)) {
            select?.classList.remove('select-clicked');
            caret?.classList.remove('caret-rotate');
            menu?.classList.remove('menu-open');
            dropdown.style.zIndex = '';
          }
        });
      });
    };

    initializeDropdown(dropdowns);
    initializeDropdown(thirdDropdowns);
    initializeDropdown(fourthDropdowns);
  }
}
