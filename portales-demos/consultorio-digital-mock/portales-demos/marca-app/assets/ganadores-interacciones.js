/* Static demo only. No backend, analytics, cookies or persistent patient information. */
(() => {
  'use strict';
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));
  const DATA = window.SALUD_DATA || { plans: [], brands: [], whatsapp: '18099949227' };
  const brandName = document.body.dataset.brand || 'G-Salud';
  const currency = value => 'US$' + Number(value).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});

  // Optional brand-comparison bar: hidden only for this page, never stored.
  const toolbar = $('.demo-toolbar');
  const restore = $('.restore-toolbar');
  $('.toolbar-hide')?.addEventListener('click', () => {
    toolbar.hidden = true;
    restore.hidden = false;
    restore.focus({preventScroll: true});
  });
  restore?.addEventListener('click', () => {
    toolbar.hidden = false;
    restore.hidden = true;
    $('.back-lab')?.focus({preventScroll: true});
  });

  const menuButton = $('.mobile-menu');
  const nav = $('.main-nav');
  const closeMenu = () => {
    nav?.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Abrir menú');
  };
  menuButton?.addEventListener('click', () => {
    const open = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });
  $$('.main-nav a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  document.addEventListener('click', e => {
    if (nav?.classList.contains('is-open') && !e.target.closest('.site-header')) closeMenu();
  });

  // Both mock interfaces have their own local state.
  $$('[data-dashboard]').forEach(dashboard => {
    $$('[data-screen]', dashboard).forEach(button => button.addEventListener('click', () => {
      const screen = button.dataset.screen;
      $$('[data-screen]', dashboard).forEach(tab => {
        const active = tab === button;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-pressed', String(active));
      });
      $$('[data-screen-panel]', dashboard).forEach(panel => { panel.hidden = panel.dataset.screenPanel !== screen; });
    }));
    $('[data-call-patient]', dashboard)?.addEventListener('click', () => {
      const status = $('[data-call-status]', dashboard);
      status.textContent = 'Turno A-014 llamado. Simulación completada: no se envió ninguna notificación.';
      $('[data-call-patient]', dashboard).textContent = 'Llamar nuevamente';
    });
  });

  // Audience and pricing filters stay in sync; no prices are altered by changing a brand.
  const setPricing = group => {
    $$('[data-pricing]').forEach(button => {
      const active = button.dataset.pricing === group;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    $$('[data-plan-group]').forEach(card => { card.hidden = card.dataset.planGroup !== group; });
  };
  $$('[data-pricing]').forEach(button => button.addEventListener('click', () => setPricing(button.dataset.pricing)));
  const originalLead = $('[data-audience-copy]')?.textContent || '';
  $$('[data-audience]').forEach(button => button.addEventListener('click', () => {
    const group = button.dataset.audience;
    $$('[data-audience]').forEach(tab => {
      tab.classList.toggle('is-active', tab === button);
      tab.setAttribute('aria-pressed', String(tab === button));
    });
    const lead = $('[data-audience-copy]');
    if (lead) lead.textContent = group === 'clinicas'
      ? 'Coordina profesionales, consultorios y centros desde una operación conectada. La identidad del paciente se conserva y cada equipo trabaja dentro de sus permisos.'
      : originalLead;
    const heroTrial = $('.hero-copy [data-interest]');
    if (heroTrial) heroTrial.dataset.interest = 'Prueba de 30 días · ' + (group === 'clinicas' ? 'Clínica' : 'Consultorio Esencial');
    setPricing(group);
  }));

  // Capacity estimate. Red Clínica publishes "20+", not an exact licensed limit.
  const calculator = $('.calculator-form');
  if (calculator) {
    const select = $('[data-calc="plan"]', calculator);
    const output = $('[data-estimate]');
    const detail = $('[data-estimate-detail]');
    const note = $('[data-estimate-note]');
    const baseNote = note.textContent;
    const names = ['doctors', 'admins', 'rooms'];
    const currentPlan = () => DATA.plans.find(p => p.id === select.value);
    const compute = () => {
      const p = currentPlan();
      if (!p) { output.textContent = 'Plan no disponible'; return; }
      if (p.id === 'red') {
        output.textContent = currency(p.price) + ' base';
        detail.textContent = 'Red Clínica: precio base de referencia. Médicos, espacios y sedes adicionales requieren cotización.';
        note.textContent = 'La página publica 20+ médicos, 20+ espacios y múltiples centros, sin fijar la cantidad final. Por eso este demo no calcula automáticamente los adicionales de Red Clínica. El alcance, los impuestos, los servicios y el SLA se definen en la propuesta.';
        return;
      }
      note.textContent = baseNote;
      const values = names.map(name => Number($(`[data-calc="${name}"]`, calculator).value));
      const valid = names.every((name, i) => {
        const field = $(`[data-calc="${name}"]`, calculator);
        return field.value.trim() !== '' && Number.isInteger(values[i]) && field.checkValidity();
      });
      if (!valid) {
        output.textContent = 'Revisa las cantidades';
        detail.textContent = 'Usa cantidades enteras válidas: de 0 a 500 personas, y de 1 a 500 espacios.';
        return;
      }
      const extraDoctors = Math.max(0, values[0] - p.doctors);
      const extraAdmins = Math.max(0, values[1] - p.admins);
      const extraRooms = Math.max(0, values[2] - p.rooms);
      const total = p.price + extraDoctors * 10 + extraAdmins * 5 + extraRooms * 45;
      output.textContent = currency(total);
      const parts = ['Plan ' + currency(p.price)];
      if (extraDoctors) parts.push(`${extraDoctors} médico(s) extra: ${currency(extraDoctors * 10)}`);
      if (extraAdmins) parts.push(`${extraAdmins} administrativo(s) extra: ${currency(extraAdmins * 5)}`);
      if (extraRooms) parts.push(`${extraRooms} espacio(s) extra: ${currency(extraRooms * 45)}`);
      if (parts.length === 1) parts.push('Sin capacidad adicional');
      detail.textContent = parts.join(' · ') + '.';
    };
    select.addEventListener('change', () => {
      const p = currentPlan();
      if (!p) return;
      names.forEach(name => {
        const field = $(`[data-calc="${name}"]`, calculator);
        field.value = p[name];
        field.disabled = p.id === 'red';
      });
      compute();
    });
    $$('input[data-calc]', calculator).forEach(input => input.addEventListener('input', compute));
    calculator.addEventListener('submit', e => { e.preventDefault(); compute(); });
    compute();
  }

  // User-controlled handoff to WhatsApp. Never sends a message or activates a plan.
  const dialog = $('#contacto-dialogo');
  let trigger = null;
  if (dialog) {
    $$('[data-contact]').forEach(button => button.addEventListener('click', () => {
      trigger = button;
      const interest = button.dataset.interest;
      const select = $('select[name="interes"]', dialog);
      if (interest && Array.from(select.options).some(option => option.value === interest)) select.value = interest;
      else select.selectedIndex = 0;
      dialog.showModal();
    }));
    $('.dialog-close', dialog).addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', e => {
      const bounds = dialog.getBoundingClientRect();
      if (e.target === dialog && (e.clientX < bounds.left || e.clientX > bounds.right || e.clientY < bounds.top || e.clientY > bounds.bottom)) dialog.close();
    });
    dialog.addEventListener('close', () => { trigger?.focus({preventScroll: true}); });
    const form = $('form', dialog);
    $$('input[type="text"],input:not([type])', form).forEach(input => input.addEventListener('input', () => input.setCustomValidity('')));
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = $('input[name="nombre"]', form);
      const institution = $('input[name="institucion"]', form);
      [name, institution].forEach(field => field.setCustomValidity(field.value.trim() ? '' : 'Completa este campo.'));
      if (!form.reportValidity()) return;
      const interest = $('select[name="interes"]', form).value;
      const text = `Hola, equipo G-Salud. Soy ${name.value.trim()}, de ${institution.value.trim()}. Revisé el demo de ${brandName} y me interesa: ${interest}. Quisiera conocer alcance, condiciones e implementación.`;
      const url = `https://wa.me/${DATA.whatsapp}?text=${encodeURIComponent(text)}`;
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      a.remove();
      // Fields remain in this page only. No server request and no persistent storage.
    });
  }
})();
