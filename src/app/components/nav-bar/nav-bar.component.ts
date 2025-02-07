import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SchoolService } from '../../services/school.service';
import { Ischool } from '../../interfaces/school.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, AfterViewInit {
  searchId: string = '';
  selectedSchool: Ischool | null = null;
  schools: Ischool[] = [];

  constructor(private schoolService: SchoolService) {}

  ngOnInit(): void {
    let rawSchools = this.schoolService.getMockSchools();
    this.schools = this.filterValidSchools(rawSchools);  
    console.log('Total schools loaded:', this.schools.length);   
    this.schools.forEach(school => {
      if (school.imageAttachmentId) {
        school.imageURL = `https://skolebi.emis.ge/back/imagedownload?attachmentId=${school.imageAttachmentId}`;
      } else {
        school.imageURL = 'https://skolebi.emis.ge/assets/images/empty-image.png';
      }
    });
  }
  private filterValidSchools(data: (Ischool | undefined)[]): Ischool[] {
    return data.filter((school): school is Ischool => school !== undefined);
  }
  private setupEventListeners(): void {
    let searchInput = document.getElementById("search-input") as HTMLInputElement;
    let publicSchoolCheckbox = document.getElementById("public-school-checkbox") as HTMLInputElement;
    if (searchInput) {
      searchInput.addEventListener('input', () => this.onInput());
    }
    if (publicSchoolCheckbox) {
      publicSchoolCheckbox.addEventListener('change', () => this.onInput());
    }
  }
  onInput() {
    let searchInput = (document.getElementById("search-input") as HTMLInputElement).value.trim();
    let suggestionsContainer = document.getElementById("suggestions") as HTMLDivElement;
    let isPublicChecked = (document.getElementById("public-school-checkbox") as HTMLInputElement).checked;
    if (!searchInput) {
      suggestionsContainer.style.display = 'none';
      return;
    }
    let filteredSchools = this.schools.filter(school => {
      let matchesSearch =
        (school.name && school.name.toLowerCase().includes(searchInput.toLowerCase())) ||
        (school.regionName && school.regionName.toLowerCase().includes(searchInput.toLowerCase())) ||
        (school.districtName && school.districtName.toLowerCase().includes(searchInput.toLowerCase()));
      let matchesType = !isPublicChecked || school.schoolType === 'PUBLIC';     
      return matchesSearch && matchesType;
    });
    let uniqueSchools = this.getUniqueSchools(filteredSchools);
    this.displaySuggestions(uniqueSchools);
  }
  private getUniqueSchools(schools: Ischool[]): Ischool[] {
    let uniqueSchools: Ischool[] = [];
    let schoolIds = new Set<number>();
    for (let school of schools) {
      if (school.id !== undefined && !schoolIds.has(school.id)) {
        uniqueSchools.push(school);
        schoolIds.add(school.id);
      }
    }
    return uniqueSchools;
  }
  displaySuggestions(schools: Ischool[]) {
    let suggestionsContainer = document.getElementById("suggestions") as HTMLDivElement;
    let noResultElement = document.getElementById("no-result") as HTMLElement;
    suggestionsContainer.innerHTML = '';
    if (schools.length === 0) {
      this.handleNoResults(suggestionsContainer, noResultElement);
      return;
    }
    this.showSuggestionItems(schools, suggestionsContainer, noResultElement);
  }
  private handleNoResults(suggestionsContainer: HTMLDivElement, noResultElement: HTMLElement) {
    suggestionsContainer.style.display = 'none';
    let element02 = document.getElementById("02");
    let element01 = document.getElementById("01");
    if (element02) element02.style.height = "1055px";
    if (element01) element01.style.height = "1100px";  
    if (noResultElement) {
      noResultElement.style.display = 'block';
    }
  }
  private showSuggestionItems(schools: Ischool[], suggestionsContainer: HTMLDivElement, noResultElement: HTMLElement) {
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
    if (!school) return;
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
    let element01 = document.getElementById("01");
    let element02 = document.getElementById("02");
    if (element01) element01.style.height = "1100px";
    if (element02) element02.style.height = "1055px"; 
    suggestionsContainer.innerHTML = '';
    suggestionsContainer.style.display = 'none';
    if (!searchInput) {
      this.handleInvalidInput(searchErrorMessage, searchInputField, noResultElement);
      return;
    }
    searchInputField.style.border = "";
    searchErrorMessage.textContent = "";
    let id = parseInt(searchInput, 10);
    let foundSchool = this.schools.find(school => 
      school.id === id || 
      (school.name && school.name.toLowerCase() === searchInput.toLowerCase())
    );
    this.processFoundSchool(foundSchool, element01, element02, suggestionsContainer, noResultElement, searchErrorMessage);
  }
  private handleInvalidInput(
    searchErrorMessage: HTMLParagraphElement, 
    searchInputField: HTMLInputElement, 
    noResultElement: HTMLElement
  ) {
    searchErrorMessage.textContent = "გთხოვთ, შეიყვანოთ სკოლა ან სკოლის ID";
    searchErrorMessage.style.color = "red";
    this.selectedSchool = null;
    searchInputField.style.border = "3px solid red";
    
    if (noResultElement) {
      noResultElement.style.display = "none";
    }
  }
  private processFoundSchool(
    foundSchool: Ischool | undefined, 
    element01: HTMLElement | null, 
    element02: HTMLElement | null,
    suggestionsContainer: HTMLDivElement,
    noResultElement: HTMLElement,
    searchErrorMessage: HTMLParagraphElement
  ) {
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
    this.setupEventListeners();
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