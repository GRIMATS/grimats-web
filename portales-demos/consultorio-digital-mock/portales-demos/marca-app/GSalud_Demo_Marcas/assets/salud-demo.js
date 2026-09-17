/* Static demo. No frameworks, network fetches, cookies, storage or patient-data writes. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const catalogue = window.GSALUD_CATALOG;
  const brandName = document.body.dataset.brandName || 'G-Salud';
  const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const format = n => Number(n).toLocaleString('en-US');
  const money = (n, decimals = 2) => 'US$' + Number(n).toLocaleString('en-US', {minimumFractionDigits: decimals, maximumFractionDigits: decimals});
  const check = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>';
  const plus = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';
  const arrow = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';

  const navigate = destination => {
    if (typeof window.GSaludDemoNavigate === 'function') window.GSaludDemoNavigate(destination);
    else window.location.assign(destination);
  };

  const menuToggle = $('.menu-toggle');
  const menu = $('#site-menu');
  function closeMenu() {
    if (!menu || !menuToggle) return;
    menu.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menú');
  }
  menuToggle?.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });
  $$('a', menu || document.createElement('div')).forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  window.matchMedia('(min-width:681px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

  $('[data-brand-switcher]')?.addEventListener('change', event => {
    const allowed = ['cliniva', 'atria-salud', 'medinexa', 'saluvia'];
    if (allowed.includes(event.target.value)) navigate(event.target.value + '.html' + window.location.hash);
  });

  // The mock menu only switches conceptual screens, never fetches health information.
  $$('[data-demo-app]').forEach(app => {
    $$('[data-app-tab]', app).forEach(button => button.addEventListener('click', () => {
      const tab = button.dataset.appTab;
      $$('[data-app-tab]', app).forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      $$('[data-app-panel]', app).forEach(panel => { panel.hidden = panel.dataset.appPanel !== tab; });
    }));
  });

  const flow = [
    ['01 / 04 · ANTES DE LA VISITA', 'Un espacio para cada cita.', 'Consulta horarios y disponibilidad por médico y consultorio. Organiza la jornada con sus duraciones, cupos y excepciones.', 'Ana Martínez · 09:00', 'Consulta de seguimiento · Confirmada'],
    ['02 / 04 · AL LLEGAR', 'Recepción sabe qué sigue.', 'Registra la llegada y ubica al paciente en la cola de atención. Coordina visitas con y sin cita desde el mismo flujo.', 'Ana Martínez · Turno A-014', 'Llegada registrada · En sala de espera'],
    ['03 / 04 · DURANTE LA ATENCIÓN', 'El contexto, antes de empezar.', 'Revisa identidad, antecedentes y datos del seguro dentro de los permisos de tu rol. Registra la atención en su encuentro correspondiente.', 'Ana Martínez · Historia clínica', 'Encuentro de ejemplo · Contexto organizado'],
    ['04 / 04 · DESPUÉS DE LA CONSULTA', 'La historia puede continuar.', 'Conserva evolución, documentos y próximos controles con la procedencia de la atención. Las comunicaciones se activan según el plan y los módulos contratados.', 'Ana Martínez · Próximo control', 'Seguimiento conectado con la atención anterior']
  ];
  $$('[data-flow]').forEach(button => button.addEventListener('click', () => {
    const step = flow[Number(button.dataset.flow)];
    if (!step) return;
    $$('[data-flow]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    ['flow-number','flow-title','flow-text','flow-card-title','flow-card-text'].forEach((id, i) => {
      const element = document.getElementById(id); if (element) element.textContent = step[i];
    });
  }));

  // Shared commercial source for all four proposals.
  if (catalogue && $('#plan-grid')) {
    $$('[data-start-price]').forEach(el => { el.textContent = money(catalogue.plans[0].price, 0); });
    $('#plan-grid').innerHTML = catalogue.plans.map(plan => {
      const included = ['Pacientes ilimitados', `${plan.dataGB} GB de datos clínicos estructurados`, `${plan.filesGB} GB para archivos e imágenes`, plan.support];
      return `<article class="plan-card" data-plan-group="${escapeHTML(plan.group)}" data-plan-id="${escapeHTML(plan.id)}" ${plan.group !== 'consultorios' ? 'hidden' : ''}>
        <span class="plan-category">${plan.group === 'consultorios' ? 'Para consultorios' : 'Para clínicas y redes'}</span>
        <h3>${escapeHTML(plan.name)}</h3><p>${escapeHTML(plan.summary)}</p>
        <div class="plan-price"><small>US$</small><strong>${format(plan.price)}</strong><span>/ mes</span></div>
        <span class="tax-note">Impuestos, implementación y extras según propuesta.</span>
        <div class="plan-team"><div><strong>${escapeHTML(plan.doctors)} médicos</strong>incluidos</div><div><strong>${escapeHTML(plan.admins)} ${plan.admins === 1 ? 'administrativo' : 'administrativos'}</strong>${plan.admins === 1 ? 'incluido' : 'incluidos'}</div><div><strong>${escapeHTML(plan.rooms)} consultorios</strong>o cubículos</div><div><strong>${escapeHTML(plan.centers)}</strong>estructura operativa</div></div>
        <ul class="plan-includes">${included.map(text => `<li>${check}<span>${escapeHTML(text)}</span></li>`).join('')}</ul>
        <div class="plan-bags"><span>${format(plan.email)} correos</span><span>${format(plan.whatsapp)} WhatsApp utility</span><span>${format(plan.ai)} acciones IA</span></div>
        <p class="smallprint" style="font-size:10px;min-height:0">${escapeHTML(plan.note)}</p>
        <div class="plan-bottom"><button class="btn block" data-contact="${escapeHTML(plan.name)}">Consultar este plan ${arrow}</button><p>30 días de prueba · Nuevos clientes · Solo plan base</p></div>
      </article>`;
    }).join('');
    $$('[data-plan-filter]').forEach(button => button.addEventListener('click', () => {
      const filter = button.dataset.planFilter;
      $$('[data-plan-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      $$('[data-plan-group]').forEach(card => { card.hidden = filter !== 'todos' && card.dataset.planGroup !== filter; });
      $('#plan-grid').classList.toggle('show-all', filter === 'todos');
    }));

    const groups = [...new Set(catalogue.extras.map(item => item.group))];
    $('#extras-container').innerHTML = groups.map((group, index) => `<details class="extra-group" ${index === 0 ? 'open' : ''}><summary>${escapeHTML(group)}${plus}</summary><div class="extras-grid">${catalogue.extras.filter(item => item.group === group).map(item => `<article class="extra-item"><h4>${escapeHTML(item.name)}</h4><div class="extra-amount"><strong>${escapeHTML(item.price)}</strong><small>${escapeHTML(item.unit)}</small></div><p>${escapeHTML(item.detail)}</p></article>`).join('')}</div></details>`).join('') +
      `<details class="extra-group"><summary>Facturación electrónica${plus}</summary><p class="billing-note">Beneficio de integración GRIMATS: 20 % de descuento sobre la mensualidad al integrar el facturador con una aplicación o servicio de GRIMATS. No aplica a las facturas adicionales. Su aplicación se confirma en la propuesta comercial.</p><div class="billing-grid">${catalogue.billing.map(item => `<article class="billing-card"><h4>${escapeHTML(item.name)}</h4><p>Regular: ${money(item.price,0)} / mes</p><strong>${money(item.integrated, item.integrated % 1 ? 2 : 0)} <span style="font-size:11px">/ mes integrado</span></strong><small>Hasta ${format(item.documents)} facturas al mes</small><small>${money(item.extra,3)} por factura adicional</small></article>`).join('')}</div><p class="billing-note">Impuestos y puesta en marcha según la propuesta. La prueba de la plataforma no cubre este complemento.</p></details>`;

    const inputs = ['#calc-doctors','#calc-admins','#calc-rooms'].map(s => $(s));
    const calcPlan = $('#calc-plan');
    function calculate() {
      const plan = catalogue.plans.find(item => item.id === calcPlan.value);
      if (!plan) return;
      if (plan.id === 'red') {
        $('#simulador [data-contact]').disabled = false;
        $('#calc-total').textContent = money(plan.price,0) + ' / mes';
        $('#calc-description').textContent = 'Referencia publicada. Capacidad 20+ y alcance multicentro por confirmar.';
        $('#calc-breakdown').innerHTML = '<div><span>Escenario personalizado</span><span>A cotizar</span></div>';
        inputs.forEach(input => { input.disabled = true; });
        return;
      }
      inputs.forEach(input => { input.disabled = false; });
      const counts = inputs.map(input => Number(input.value));
      const invalid = inputs.some((input, i) => input.value.trim() === '' || !Number.isFinite(counts[i]) || !Number.isInteger(counts[i]) || counts[i] < Number(input.min) || counts[i] > Number(input.max));
      inputs.forEach((input, i) => input.setAttribute('aria-invalid', String(input.value.trim() === '' || !Number.isInteger(counts[i]) || counts[i] < Number(input.min) || counts[i] > Number(input.max))));
      if (invalid) {
        $('#simulador [data-contact]').disabled = true;
        $('#calc-total').textContent = 'Revisa los datos';
        $('#calc-description').textContent = 'Introduce cantidades enteras válidas (hasta 1,000 por campo).';
        $('#calc-breakdown').replaceChildren();
        return;
      }
      $('#simulador [data-contact]').disabled = false;
      const extra = [Math.max(0, counts[0] - plan.doctors), Math.max(0, counts[1] - plan.admins), Math.max(0, counts[2] - plan.rooms)];
      const amounts = [extra[0] * catalogue.rates.doctor, extra[1] * catalogue.rates.admin, extra[2] * catalogue.rates.room];
      const total = plan.price + amounts.reduce((a,b) => a+b,0);
      $('#calc-total').textContent = money(total);
      $('#calc-description').textContent = extra.some(Boolean) ? 'Capacidad base + adicionales de tu escenario.' : 'Dentro de la capacidad incluida del plan.';
      const lines = [[plan.name,plan.price], [`${extra[0]} médicos adicionales`,amounts[0]],[`${extra[1]} administrativos adicionales`,amounts[1]],[`${extra[2]} espacios adicionales`,amounts[2]]];
      $('#calc-breakdown').innerHTML = lines.map(([name, amount]) => `<div><span>${escapeHTML(name)}</span><span>${money(amount)}</span></div>`).join('');
      $('#simulador [data-contact]').dataset.contact = `Estimado: ${plan.name} · ${counts[0]} médicos únicos, ${counts[1]} administrativos y ${counts[2]} espacios · ${money(total)}/mes, sujeto a propuesta`;
    }
    calcPlan.addEventListener('change', () => {
      const plan = catalogue.plans.find(item => item.id === calcPlan.value);
      if (plan && plan.id !== 'red') {
        inputs.forEach((input, i) => { input.value = [plan.doctors, plan.admins, plan.rooms][i]; });
      }
      if (plan?.id === 'red') $('#simulador [data-contact]').dataset.contact = 'Red Clínica: alcance multicentro a cotizar';
      calculate();
    });
    inputs.forEach(input => input.addEventListener('input', calculate));
    calculate();
  }

  // Contact is explicit and user-initiated; no form data or automatic message delivery.
  const dialog = $('#contact-dialog');
  let previouslyFocused = null;
  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-contact]');
    if (!trigger || !dialog) return;
    const topic = trigger.dataset.contact || 'Asesoría general';
    previouslyFocused = trigger;
    $('#contact-selection').textContent = `${brandName} · ${topic}`;
    const message = `Hola, estoy evaluando ${brandName} (Powered by G-Salud). Me interesa: ${topic}. Quisiera conocer el alcance y las condiciones.`;
    const divisionMessage = `Hola, me interesan las soluciones de G-Salud. Quisiera conversar sobre: ${topic}.`;
    const selectedMessage = document.body.dataset.page === 'division' ? divisionMessage : message;
    $('#contact-whatsapp').href = `https://wa.me/${catalogue?.whatsapp || '18099949227'}?text=${encodeURIComponent(selectedMessage)}`;
    $('#contact-email').href = `mailto:${catalogue?.email || 'Ventas@grimats.com'}?subject=${encodeURIComponent(brandName + ' · Consulta comercial')}&body=${encodeURIComponent(selectedMessage)}`;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open','');
  });
  $('[data-close-dialog]')?.addEventListener('click', () => { dialog.close(); });
  dialog?.addEventListener('close', () => { previouslyFocused?.focus(); });
  dialog?.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
})();
