type CloseDropdownCallback = (source: HTMLDivElement) => void;
const mountedDropdowns = new Set<CloseDropdownCallback>();

export function registerDropdownListener() {
  document.onclick = (e: Event) => {
    for (const callback of mountedDropdowns) {
      callback(e.target as HTMLDivElement);
    }
  };
}

export function dropdownMounted(callback: CloseDropdownCallback) {
  mountedDropdowns.add(callback);
}

export function dropdownUnmounted(callback: CloseDropdownCallback) {
  mountedDropdowns.delete(callback);
}
