/**
 * Shows error message.
 * @param errorEl Error DOM element.
 * @param text Message.
 */
export function setError(errorEl: HTMLElement | null, text: string): void {
  if (errorEl) {
    errorEl.textContent = text;
  }
}

/**
 * Clears error message.
 * @param errorEl Error DOM element.
 */
export function clearError(errorEl: HTMLElement | null): void {
  if (errorEl) {
    errorEl.textContent = '';
  }
}
