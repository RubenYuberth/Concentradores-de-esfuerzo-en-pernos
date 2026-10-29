type Severity = 0 | 1 | 2 | 3;

interface SeverityStyle {
  r: number;
  f: string;
  t: string;
}

interface LoadCase {
  cap: string;
  lv: [Severity, Severity, Severity, Severity, Severity];
  side?: 'L' | 'R';
  tx: [string, string, string, string, string];
  show: string[];
}

const S: Partial<Record<Severity, SeverityStyle>> = {
  3: { r: 11, f: '#A32D2D', t: '#fff' },
  2: { r: 10, f: '#EF9F27', t: '#412402' },
  1: { r: 9, f: '#FAC775', t: '#412402' },
};

const N = 'Sin efecto relevante aquí';

const C: LoadCase[] = [
  {
    cap: 'La carga pasa de la tuerca al perno por las roscas. La primera rosca engranada toma cerca de un tercio y además su raíz es una entalla aguda.',
    lv: [3, 2, 1, 0, 0],
    tx: [
      'Máxima: entalla + carga concentrada',
      'Alta: cambio de sección',
      'Moderada: filete bajo cabeza',
      N,
      N,
    ],
    show: ['load1', 'bars'],
  },
  {
    cap: 'Si las caras de apoyo no son paralelas, el momento flector se suma a la tracción en un solo lado del perno, justo donde ya hay entalla.',
    lv: [2, 1, 3, 0, 0],
    side: 'R',
    tx: [
      'Alta: flexión + tracción',
      'Moderada: flexión + tracción',
      'Máxima: lado traccionado',
      N,
      N,
    ],
    show: ['load1', 'wedge'],
  },
  {
    cap: 'Si la carga vence la fricción de la unión, el perno trabaja a corte en el plano entre placas. Con roscas en ese plano, el área resistente es menor.',
    lv: [0, 0, 0, 3, 2],
    tx: [
      'Bajo en este caso',
      'Bajo en este caso',
      'Bajo en este caso',
      'Máxima: corte directo',
      'Alta: aplastamiento local',
    ],
    show: ['load3'],
  },
  {
    cap: 'Al apretar, el torque agrega cortante por torsión. Es mayor donde el diámetro es menor: la raíz de rosca dentro del agarre.',
    lv: [2, 3, 0, 0, 0],
    tx: [
      'Alta: torque pasa por la rosca',
      'Máxima: menor diámetro (raíz)',
      'Baja: diámetro mayor',
      N,
      N,
    ],
    show: ['load4'],
  },
];

function $(id: string): HTMLElement {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Elemento #${id} no encontrado`);
  return el;
}

function setCase(i: number): void {
  const c = C[i];

  document.querySelectorAll<SVGGElement>('.hz').forEach((g) => {
    const z = Number(g.dataset.z);
    const s = g.dataset.s;
    const lv = c.lv[z - 1];
    let vis = lv > 0;
    if (c.side && z <= 3 && s !== c.side) vis = false;
    g.style.opacity = vis ? '1' : '0';
    const st = S[lv];
    if (st) {
      const ci = g.querySelector('circle');
      if (ci) {
        ci.setAttribute('r', String(st.r));
        ci.setAttribute('fill', st.f);
      }
      const tx = g.querySelector('text');
      if (tx) tx.style.fill = st.t;
    }
  });

  ['load1', 'wedge', 'load3', 'load4', 'bars'].forEach((id) => {
    $(id).style.opacity = c.show.indexOf(id) > -1 ? '1' : '0';
  });

  for (let k = 1; k <= 5; k++) {
    const lv = c.lv[k - 1];
    const st = S[lv];
    const ci = $('lc' + k);
    const n = $('ln' + k);
    if (st) {
      ci.setAttribute('fill', st.f);
      ci.setAttribute('stroke', 'var(--surface-2)');
      n.style.fill = st.t;
    } else {
      ci.setAttribute('fill', 'none');
      ci.setAttribute('stroke', 'var(--border-strong)');
      n.style.fill = 'var(--text-secondary)';
    }
    $('lr' + k).style.opacity = lv ? '1' : '.45';
    $('zs' + k).textContent = c.tx[k - 1];
  }

  $('cap').textContent = c.cap;

  for (let j = 0; j < 4; j++) {
    $('b' + j).setAttribute('aria-pressed', j === i ? 'true' : 'false');
  }
}

document.querySelectorAll<HTMLButtonElement>('.tab').forEach((btn, i) => {
  btn.addEventListener('click', () => setCase(i));
});

setCase(0);
