/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const CONSULTATION_FORM_CARD_ID = 'consultation-form-card';

export function getConsultationFormTargetId(): string {
  return CONSULTATION_FORM_CARD_ID;
}

export function scrollToElement(
  elementId: string,
  options?: { focusFirstField?: boolean; behavior?: ScrollBehavior }
): void {
  const element = document.getElementById(elementId);
  if (!element) return;

  const header = document.getElementById('main-header');
  const headerHeight = header?.getBoundingClientRect().height ?? 80;
  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  const stickyCtaOffset = isMobile ? 12 : 0;
  const extraPadding = 16;

  const top =
    element.getBoundingClientRect().top +
    window.scrollY -
    headerHeight -
    extraPadding -
    stickyCtaOffset;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: options?.behavior ?? 'smooth',
  });

  if (options?.focusFirstField) {
    window.setTimeout(() => {
      const field = element.querySelector<HTMLElement>(
        'input:not([type="hidden"]), select, textarea'
      );
      field?.focus({ preventScroll: true });
    }, 600);
  }
}

/** Scroll to the consultation booking form (not just the section header). */
export function scrollToConsultationForm(options?: { focusFirstField?: boolean }): void {
  const card = document.getElementById(CONSULTATION_FORM_CARD_ID);
  const fallback = document.getElementById('consultation-form');
  scrollToElement(card ? CONSULTATION_FORM_CARD_ID : 'consultation-form', {
    focusFirstField: options?.focusFirstField,
  });
}

/** Run scroll after React has committed DOM updates (state, prefills, etc.). */
export function scrollToConsultationFormAfterRender(
  options?: { focusFirstField?: boolean; delayMs?: number }
): void {
  const delay = options?.delayMs ?? 120;
  window.setTimeout(() => {
    requestAnimationFrame(() => {
      scrollToConsultationForm({ focusFirstField: options?.focusFirstField });
    });
  }, delay);
}
