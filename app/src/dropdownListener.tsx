import { Dropdown } from './components/Navigation/Dropdown';

const activeDropdowns: Dropdown[] = [];

export function registerGlobaListener() {
    document.onclick = (e: Event) => {
        activeDropdowns.forEach((dropdown) => {
            dropdown.close();
            if (dropdown.toggle && e.target === dropdown.toggle) {
                dropdown.closedFlag = true;
            }
        });
        while (activeDropdowns.length > 0) {
            activeDropdowns.pop();
        }
    };
}

export function dropdownOpened(dropdown: Dropdown) {
    const index = activeDropdowns.indexOf(dropdown);
    if (index < 0) {
        activeDropdowns.push(dropdown);
    }
}
