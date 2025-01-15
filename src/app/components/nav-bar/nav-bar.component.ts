import { Component, AfterViewInit } from '@angular/core';
import { SchoolService } from '../../services/school.service';
import { Ischool } from '../../interfaces/school.model';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements AfterViewInit {
  searchId: string = '';
  selectedSchool: any = null;
  //  API -ს  ნაცვლად გამოვიყენე INTERFACE და ეს მასივი 
  schools = {
    result: <Ischool[]>[
      {"id":2,"imageAttachmentId":3452,"name":"სსიპ - ქალაქ თბილისის №154 საჯარო სკოლა","regionName":"თბილისი","districtName":"გლდანი-ნაძალადევი","address":"გლდანი-ნაძალადევი, თემქის მე-4 მ/რ","socialNetwork":"https://www.facebook.com/154skola","principal":"გიორგი გარსიძე","educationStatus":"დაწყებითი (1-6), საბაზო (7-9), საშუალო (10-12)","schoolType":"PUBLIC","buildingCount":1,"authorizationStartDate":"08/09/2023 00:00:00","authorizationEndDate":"08/09/2029 00:00:00","email":"tbilisi154@mes.gov.ge","phoneNumber":"2647084","studentCount":742,"teacherCount":46,"sectors":"ქართული","mission":true,"structure":true,"programsandsupport":true,"behaviorrulesandappellation":true,"infrastructure":true,"finance":true,"strategicplan":true,"yearlyactionplan":true},{"id":3,"name":"სსიპ - ქალაქ თბილისის №159 საჯარო სკოლა","regionName":"თბილისი","districtName":"გლდანი-ნაძალადევი","address":"გლდანი-ნაძალადევი, თემქის მე-3 მ/რ, მე-5 კვარტალი","socialNetwork":"https://www.facebook.com/159publicschool?mibextid=LQQJ4d","principal":"თამილა გვარამაძე","educationStatus":"დაწყებითი (1-6), საბაზო (7-9), საშუალო (10-12)","schoolType":"PUBLIC","buildingCount":1,"authorizationStartDate":"18/10/2023 00:00:00","authorizationEndDate":"18/10/2029 00:00:00","email":"tbilisi159@mes.gov.ge","phoneNumber":"2647208","studentCount":1182,"teacherCount":72,"sectors":"ქართული","mission":true,"structure":true,"programsandsupport":true,"behaviorrulesandappellation":true,"infrastructure":true,"finance":true,"strategicplan":true,"yearlyactionplan":true},
    ]

    // CHARACTERS:  1 602 946 WORDS:  41 575 SENTENCES:  7 836 PARAGRAPHS:  284 SPACES:  42 983
   // https://www.charactercountonline.com/
   // nav-bar.components.ts
  };
  ngOnInit(): void {
    console.log(this.schools);            
    this.schools.result.forEach(school => {
      if (school.imageAttachmentId) {
        school.imageURL = `https://skolebi.emis.ge/back/imagedownload?attachmentId=${school.imageAttachmentId}`;
      } else {
        school.imageURL = 'https://skolebi.emis.ge/assets/images/empty-image.png';
      }
    });
  }
  
  ngAfterViewInit2() {
    let suggestionsContainer = document.getElementById("suggestions") as HTMLDivElement;
    let noResultElement = document.getElementById("no-result") as HTMLElement;
    let element01 = document.getElementById("01");
    let element02 = document.getElementById("02");
    if (!suggestionsContainer || !noResultElement || !element01 || !element02) {
      console.error("Cannot find required DOM elements.");
      return;
    }

  
    this.onInput(); 
  }

  onInput() {
    let searchInput = (document.getElementById("search-input") as HTMLInputElement).value.trim();
    let suggestionsContainer = document.getElementById("suggestions") as HTMLDivElement;
    let isPublicChecked = (document.getElementById("public-school-checkbox") as HTMLInputElement).checked;

    if (!searchInput) {
      suggestionsContainer.style.display = 'none';
      return;
    }

    let filteredSchools = this.schools.result.filter(school => {
      let matchesSearch =
        (school.name && school.name.toLowerCase().includes(searchInput.toLowerCase())) ||
        (school.regionName && school.regionName.toLowerCase().includes(searchInput.toLowerCase())) ||
        (school.districtName && school.districtName.toLowerCase().includes(searchInput.toLowerCase()));

      let matchesType = !isPublicChecked || school.schoolType === 'PUBLIC';
      return matchesSearch && matchesType;
    });

    let uniqueSchools = [];
    let schoolIds = new Set();

    for (let school of filteredSchools) {
      if (!schoolIds.has(school.id)) {
        uniqueSchools.push(school);
        schoolIds.add(school.id);
      }
    }

    this.displaySuggestions(uniqueSchools);
  }

  displaySuggestions(schools: Ischool[]) {
    let suggestionsContainer = document.getElementById("suggestions") as HTMLDivElement;
    let noResultElement = document.getElementById("no-result") as HTMLElement;
    suggestionsContainer.innerHTML = '';

    if (schools.length === 0) {
      suggestionsContainer.style.display = 'none';
      let element02 = document.getElementById("02");
      if (element02) {
        element02.style.height = "1055px";
      }
      let element01 = document.getElementById("01");
      if (element01) {
        element01.style.height = "1100px";
      }
      if (noResultElement) {
        noResultElement.style.display = 'block';
      }
      return;
    }

    if (noResultElement) {
      noResultElement.style.display = 'none';
    }

    schools.forEach(school => {
      let suggestionItem = document.createElement('div');
      suggestionItem.classList.add('suggestion-item');
      suggestionItem.style.fontWeight = '900';
      suggestionItem.style.marginTop = '10px';

      suggestionItem.addEventListener('mouseenter', () => {
        suggestionItem.style.textDecoration = 'underline';
      });

      suggestionItem.addEventListener('mouseleave', () => {
        suggestionItem.style.textDecoration = 'none';
      });

      suggestionItem.textContent = `${school.name} - ${school.regionName} - ${school.districtName}`;
      suggestionItem.addEventListener('click', () => this.selectSuggestion(school));
      suggestionsContainer.appendChild(suggestionItem);
    });

    suggestionsContainer.style.display = 'block';
  }

  selectSuggestion(school: Ischool | undefined) {
    if (!school) {
      return;
    }

    let searchInputField = document.getElementById("search-input") as HTMLInputElement;
    if (searchInputField) {
      searchInputField.value = school.name ?? '';
    }

    this.searchSchool();
  }

  searchSchool() {
    let searchInput = (document.getElementById("search-input") as HTMLInputElement).value.trim();
    let searchErrorMessage = document.getElementById("search-input-error") as HTMLParagraphElement;
    let searchInputField = document.getElementById("search-input") as HTMLInputElement;
    let noResultElement = document.getElementById("no-result") as HTMLElement;
    let suggestionsContainer = document.getElementById("suggestions") as HTMLDivElement;
    let resultContainer = document.getElementById('result-container') as HTMLElement;
    
    let element01 = document.getElementById("01");
    let element02 = document.getElementById("02");
  
    if (element01) element01.style.height = "1100px";
    if (element02) element02.style.height = "1055px";
  
    suggestionsContainer.innerHTML = '';
    suggestionsContainer.style.display = 'none';
  
    if (!searchInput) {
      searchErrorMessage.textContent = "გთხოვთ, შეიყვანოთ სკოლა ან სკოლის ID";
      searchErrorMessage.style.color = "red";
      this.selectedSchool = null;
      searchInputField.style.border = "3px solid red";
  
      if (noResultElement) {
        noResultElement.style.display = "none";
      }
      return;
    }
    searchInputField.style.border = "";
    searchErrorMessage.textContent = "";
  
    let id = parseInt(searchInput, 10);
  
    let foundSchool = this.schools.result.find(school => {
      let idMatch = school.id === id;
      let nameMatch = school.name && school.name.toLowerCase() === searchInput.toLowerCase();
      return idMatch || nameMatch;
    });
  
    if (foundSchool) {
      this.selectedSchool = foundSchool;
      suggestionsContainer.style.display = "none";
      if (element01) element01.style.height = "1400px";
      if (element02) element02.style.height = "1355px";
  
      if (noResultElement) {
        noResultElement.style.display = "none";
      }
    } else {
      this.selectedSchool = null;
      searchErrorMessage.textContent = "სკოლა ვერ მოიძებნა";
      searchErrorMessage.style.color = "red";
      if (element01) element01.style.height = "1100px";
      if (element02) element02.style.height = "1055px";
  
      if (noResultElement) {
        noResultElement.style.display = "block";
      }
    }
  
    suggestionsContainer.innerHTML = '';
    suggestionsContainer.style.display = 'none';
  }
  
  ngAfterViewInit() {
    let dropdowns = document.querySelectorAll<HTMLElement>(".dropdown");

    dropdowns.forEach((dropdown) => {
      let select = dropdown.querySelector<HTMLElement>(".select");
      let caret = dropdown.querySelector<HTMLElement>(".caret");
      let menu = dropdown.querySelector<HTMLElement>(".menu");
      let options = dropdown.querySelectorAll<HTMLElement>(".menu li");
      let selected = dropdown.querySelector<HTMLElement>(".selected");
      let idsToHide = ['001', '002', '003', '004',].map(id => document.getElementById(id));
      select?.addEventListener("click", () => {
        let menuIsOpen = menu?.classList.toggle("menu-open");
        select?.classList.toggle("select-clicked");
        caret?.classList.toggle("caret-rotate");

        idsToHide.forEach(element => {
          if (element) {
            element.style.display = menuIsOpen ? 'none' : '';
          }
        });
      });

      options.forEach((option) => {
        option.addEventListener("click", () => {
          if (selected) {
            selected.innerText = option.innerText;
          }
          select?.classList.remove("select-clicked");
          caret?.classList.remove("caret-rotate");
          menu?.classList.remove("menu-open");

          options.forEach((opt) => {
            opt.classList.remove("active");
          });
          option.classList.add("active");

          idsToHide.forEach(element => {
            if (element) {
              element.style.display = '';
            }
          });
        });
      });

      document.addEventListener("click", (event) => {
        if (!dropdown.contains(event.target as Node)) {
          select?.classList.remove("select-clicked");
          caret?.classList.remove("caret-rotate");
          menu?.classList.remove("menu-open");

          idsToHide.forEach(element => {
            if (element) {
              element.style.display = '';
            }
          });
        }
      });
    });
  }
}
  
   // nav-bar.components.ts