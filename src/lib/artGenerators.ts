// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable */

  /* ==================================================================
     ART — Nila and the fleet, drawn as SVG so every part can move
     ================================================================== */
  const C: Record<string, string> = {
    navy: '#1E2B4F', navy2: '#2A3A66', glass: '#2F4573', glassL: '#CFE3F5', glassT: '#3A5283',
    skin: '#A8704A', skinS: '#8E5A38', hair: '#1B1A26', apricot: '#F08A4B', apricotD: '#D9703A',
    sand: '#D9C6A5', sandS: '#C4AE89', gold: '#E2B34B', lip: '#7A2E2A', blush: '#E9846C',
    line: '#CBD4E1', tire: '#1F2433', hub: '#DCE3EC', shade: '#E7ECF3', hl: '#FFD27A', tail: '#EF6B5B',
    terracotta: '#C75A3A'
  };
  const PAX = [['#C68B5E', '#2B2233', '#7CC6B8'], ['#8E5A38', '#1B1A26', '#F2B880'], ['#E0B08A', '#5B3A29', '#9DB4E8'], ['#A8704A', '#1B1A26', '#E9A3B4'], ['#6E4630', '#1B1A26', '#B9D88F'], ['#D9A27A', '#3A2A20', '#F7D57A']];

  // Nila's palette: light warm skin, cream suit, white blouse, plum trousers, terracotta case.
  const N: Record<string, string> = {
    skin: '#F2CDAE', skinS: '#E0AC88', skinD: '#C68A66', skinH: '#FBE4D2',
    hair: '#2B1B15', hairS: '#160D09', hairH: '#6A4A38',
    suit: '#F3EADB', suitS: '#DCCAAE', suitD: '#BFA987', outline: '#A38B69',
    blouse: '#FFFFFF', blouseS: '#E6DEE2',
    trouser: '#4D1F47', trouserS: '#33102E', trouserH: '#6E3A66',
    shoe: '#2A0B26', shoeH: '#6B3A62',
    lip: '#B9585C', lipD: '#93404A', lipH: '#E09196',
    iris: '#4A2B1C', lash: '#1A0F0B', blush: '#E8937F',
    gold: '#D4A359', goldD: '#9C6F2C',
    case: '#C75A3A', caseD: '#9E4229', caseH: '#E0825F'
  };

  // Tapered limb with round ends, from joint (x1,y1) to joint (x2,y2).
  const limb = (x1: number, y1: number, x2: number, y2: number, r1: number, r2: number) => {
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1;
    const px = -dy / L, py = dx / L;
    const f = (n: number) => n.toFixed(2);
    return `M${f(x1 + px * r1)} ${f(y1 + py * r1)}L${f(x2 + px * r2)} ${f(y2 + py * r2)}A${r2} ${r2} 0 0 0 ${f(x2 - px * r2)} ${f(y2 - py * r2)}L${f(x1 - px * r1)} ${f(y1 - py * r1)}A${r1} ${r1} 0 0 0 ${f(x1 + px * r1)} ${f(y1 + py * r1)}Z`;
  };

  // Nila, full body. Coordinates: 170 × 360, feet at y≈356.
  // Joint positions (shoulders 60/110,110 · elbows 54,156 / 118,154 · hips 75/95,196 · eyes 85,58.5)
  // are fixed: the animation rig in useSiteAnimations pivots around them.
  // `p` prefixes gradient ids so several Nilas can share one page.
  function nilaRig(p: string = 'nl') {
    const u = (id: string) => `url(#${p}-${id})`;
    const ol = `stroke="${N.outline}" stroke-width=".7" stroke-linejoin="round"`;
    return `
<defs>
  <radialGradient id="${p}-face" cx=".42" cy=".4" r=".66"><stop offset="0" stop-color="${N.skinH}"/><stop offset=".55" stop-color="${N.skin}"/><stop offset="1" stop-color="${N.skinS}"/></radialGradient>
  <linearGradient id="${p}-hair" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${N.hairH}"/><stop offset=".4" stop-color="${N.hair}"/><stop offset="1" stop-color="${N.hairS}"/></linearGradient>
  <linearGradient id="${p}-suit" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${N.suitS}"/><stop offset=".28" stop-color="${N.suit}"/><stop offset=".72" stop-color="${N.suit}"/><stop offset="1" stop-color="${N.suitS}"/></linearGradient>
  <linearGradient id="${p}-sleeve" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${N.suitS}"/><stop offset=".45" stop-color="${N.suit}"/><stop offset="1" stop-color="${N.suitS}"/></linearGradient>
  <linearGradient id="${p}-trouser" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${N.trouserS}"/><stop offset=".5" stop-color="${N.trouser}"/><stop offset="1" stop-color="${N.trouserS}"/></linearGradient>
  <linearGradient id="${p}-case" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${N.caseH}"/><stop offset=".3" stop-color="${N.case}"/><stop offset="1" stop-color="${N.caseD}"/></linearGradient>
</defs>
<g class="n-root">
  <g class="n-case">
    <path d="M126.5 236V203M139.5 236V203" stroke="#8C8792" stroke-width="2.4"/>
    <path d="M126.5 224V236M139.5 224V236" stroke="#5F5A66" stroke-width="3.2"/>
    <rect x="121" y="198" width="24" height="6" rx="3" fill="${N.trouserS}"/>
    <rect x="115" y="235" width="38" height="99" rx="7" fill="${u('case')}" stroke="${N.caseD}" stroke-width=".8"/>
    <path d="M124.5 243V326M134 243V326M143.5 243V326" stroke="${N.caseD}" stroke-width="1.7" stroke-linecap="round" opacity=".75"/>
    <path d="M125.9 243V326M135.4 243V326M144.9 243V326" stroke="${N.caseH}" stroke-width=".7" opacity=".7"/>
    <path d="M115 325v2a7 7 0 0 0 7 7h3v-3.4h-3a3.6 3.6 0 0 1-3.6-3.6v-2z" fill="${N.trouserS}"/>
    <path d="M153 325v2a7 7 0 0 1-7 7h-3v-3.4h3a3.6 3.6 0 0 0 3.6-3.6v-2z" fill="${N.trouserS}"/>
    <path d="M120.6 237.5L121.6 248" stroke="${N.goldD}" stroke-width=".6"/>
    <rect x="117.4" y="248" width="8.6" height="12" rx="1.4" fill="#FAF6F2" stroke="${N.goldD}" stroke-width=".5"/>
    <path d="M119 253.4h5.4M119 256.2h3.6" stroke="${N.caseD}" stroke-width=".6"/>
    <circle cx="122" cy="338.4" r="4.3" fill="#1E1A22"/><circle cx="146" cy="338.4" r="4.3" fill="#1E1A22"/>
    <circle cx="122" cy="338.4" r="1.4" fill="#77707F"/><circle cx="146" cy="338.4" r="1.4" fill="#77707F"/>
  </g>
  <g class="n-legL">
    <path d="M68.6 341H83.8C84.8 346.4 83.4 351.4 79 354.4C77 355.8 74.4 355.8 72.6 354.4C68.8 351.2 67.8 346.2 68.6 341Z" fill="${N.shoe}"/>
    <path d="M71.4 347C72.2 350.4 74.2 352.8 76.8 353.4" stroke="${N.shoeH}" stroke-width="1" fill="none" stroke-linecap="round"/>
    <path d="M64.4 188H85.6L84.6 343Q76 346 67.4 343Z" fill="${u('trouser')}"/>
    <path d="M75.6 206L76.2 342" stroke="${N.trouserH}" stroke-width=".9" opacity=".75"/>
  </g>
  <g class="n-legR">
    <path d="M86.2 341H101.4C102.2 346.2 101.2 351.2 97.4 354.4C95.6 355.8 93 355.8 91 354.4C86.6 351.4 85.2 346.4 86.2 341Z" fill="${N.shoe}"/>
    <path d="M98.6 347C97.8 350.4 95.8 352.8 93.2 353.4" stroke="${N.shoeH}" stroke-width="1" fill="none" stroke-linecap="round"/>
    <path d="M84.4 188H105.6L102.6 343Q94 346 85.4 343Z" fill="${u('trouser')}"/>
    <path d="M94.4 206L93.8 342" stroke="${N.trouserH}" stroke-width=".9" opacity=".75"/>
  </g>
  <g class="n-upper">
    <path d="M79.2 80V101.6Q85 105 90.8 101.6V80Z" fill="${N.skin}"/>
    <path d="M79.2 97.6C74 99.6 66 102.2 61 105C57.4 107 56.2 110.5 56.6 115L60.6 128C63.6 140 65.8 151 65.6 161C65.4 172 62.6 184 62.2 198C62.2 201.5 63.6 203 67 203.6Q85 207 103 203.6C106.4 203 107.8 201.5 107.8 198C107.4 184 104.6 172 104.4 161C104.2 151 106.4 140 109.4 128L113.4 115C113.8 110.5 112.6 107 109 105.2C104 102.2 96 99.6 90.8 97.6Z" fill="${u('suit')}" ${ol}/>
    <path d="M85 153.5C84 170 81.6 188 79.2 205L90.8 205C88.4 188 86 170 85 153.5Z" fill="${u('trouser')}"/>
    <path d="M85 153.5C84 170 81.6 188 79.2 205M85 153.5C86 170 88.4 188 90.8 205" stroke="${N.outline}" stroke-width=".7" fill="none"/>
    <path d="M78.8 97.6Q85 101.8 91.2 97.6L86.4 148H83.6Z" fill="${N.blouse}"/>
    <path d="M80.3 98L85 108.6L89.7 98Q85 101 80.3 98Z" fill="${N.skin}"/>
    <path d="M79.6 97.8L85 109.6L90.4 97.8" stroke="${N.blouseS}" stroke-width=".8" fill="none"/>
    <path d="M85 110.6V146" stroke="${N.blouseS}" stroke-width=".6" opacity=".8"/>
    <path d="M78.6 97.6L73 103.2L71.6 111.6L74.6 112.4L71.4 117.2L84.6 150Z" fill="${N.suitS}" ${ol}/>
    <path d="M91.4 97.6L97 103.2L98.4 111.6L95.4 112.4L98.6 117.2L85.4 150Z" fill="${N.suitS}" ${ol}/>
    <circle cx="94.6" cy="117.6" r="1.5" fill="${N.gold}" stroke="${N.goldD}" stroke-width=".4"/>
    <path d="M72.6 124C74 140 73.8 156 72.4 172M97.4 124C96 140 96.2 156 97.6 172" stroke="${N.suitD}" stroke-width=".7" fill="none" opacity=".55"/>
    <path d="M96.2 126.4L97.4 123.2L99 125.2L100.4 122.8L101.8 126Z" fill="${C.terracotta}"/>
    <path d="M95 126.6L103 125.6" stroke="${N.outline}" stroke-width=".8" stroke-linecap="round"/>
    <path d="M67.4 176.2L80.2 177.4L80 180.6L67.6 179.6Z" fill="${N.suitS}" stroke="${N.outline}" stroke-width=".5"/>
    <path d="M102.6 176.2L89.8 177.4L90 180.6L102.4 179.6Z" fill="${N.suitS}" stroke="${N.outline}" stroke-width=".5"/>
    <path d="M63.4 199.4Q85 204 106.6 199.4" stroke="${N.suitD}" stroke-width=".6" fill="none" opacity=".5"/>
    <circle cx="85" cy="152" r="1.9" fill="${N.gold}" stroke="${N.goldD}" stroke-width=".5"/>
    <g class="n-armL">
      <path d="${limb(110, 110, 118, 154, 7.4, 5.8)}" fill="${u('sleeve')}" ${ol}/>
      <path d="M114.6 121C116.6 132 117.6 142 118.4 150" stroke="${N.suitD}" stroke-width=".6" fill="none" opacity=".5"/>
      <g class="n-foreL">
        <path d="${limb(118, 154, 127, 191, 5.8, 4.8)}" fill="${u('sleeve')}" ${ol}/>
        <path d="M122.2 190.4L131.6 188.2L132.6 192.4L123.2 194.6Z" fill="${N.blouse}" stroke="${N.blouseS}" stroke-width=".5"/>
        <path d="M124.6 193.4C122.8 196.6 123 201.6 125.4 204.6C127.6 207.2 132 207.2 134.2 204.4C136 202 135.8 197.4 133.6 193.6Z" fill="${N.skin}" stroke="${N.skinD}" stroke-width=".5"/>
        <path d="M125.6 200.6Q129.6 202.8 134.6 200.4" stroke="${N.skinS}" stroke-width=".7" fill="none"/>
        <path d="M124.8 196.6C126.4 198.2 128.6 198.8 130.4 198.4" stroke="${N.skinD}" stroke-width=".7" fill="none" stroke-linecap="round"/>
      </g>
    </g>
    <g class="n-head">
      <path d="M68.4 60C66.4 45 73.4 33.6 85 33.6C96.6 33.6 103.6 45 101.6 60C101.2 65 100.4 69 99 72H71C69.6 69 68.8 65 68.4 60Z" fill="${u('hair')}"/>
      <ellipse cx="85" cy="77" rx="13" ry="7.6" fill="${N.hair}"/>
      <path d="M73.6 76.4C76.6 73.2 81.4 72.6 85 74.4M74.6 80.4C78.8 77.8 88 78 93.6 80.2M85 74.4C89.2 73 94 74 96.6 77" stroke="${N.hairH}" stroke-width=".8" fill="none" opacity=".6" stroke-linecap="round"/>
      <path d="M79.2 72V93H90.8V72Z" fill="${N.skin}"/>
      <path d="M79.2 75Q85 86.5 90.8 75V84.5Q85 91 79.2 84.5Z" fill="${N.skinS}" opacity=".7"/>
      <path d="M70.6 56.4C67.8 55.6 66.8 58.4 67.2 61.4C67.6 64.4 68.8 67.4 71.2 67.6Z" fill="${N.skinS}"/>
      <path d="M99.4 56.4C102.2 55.6 103.2 58.4 102.8 61.4C102.4 64.4 101.2 67.4 98.8 67.6Z" fill="${N.skinS}"/>
      <circle cx="68.6" cy="67.6" r="1.3" fill="${N.gold}" stroke="${N.goldD}" stroke-width=".4"/>
      <circle cx="101.4" cy="67.6" r="1.3" fill="${N.gold}" stroke="${N.goldD}" stroke-width=".4"/>
      <path d="M85 38.6C95.4 38.6 100.6 46 100.6 56C100.6 63.4 99.4 68.4 96.8 72.6C93.8 77.6 89.4 81 85 81C80.6 81 76.2 77.6 73.2 72.6C70.6 68.4 69.4 63.4 69.4 56C69.4 46 74.6 38.6 85 38.6Z" fill="${u('face')}"/>
      <path d="M69.6 58C70 65 72.2 70.6 75.6 74.8C72.6 70 71.6 64 71.8 58Z" fill="${N.skinS}" opacity=".55"/>
      <path d="M100.4 58C100 65 97.8 70.6 94.4 74.8C97.4 70 98.4 64 98.2 58Z" fill="${N.skinS}" opacity=".55"/>
      <ellipse cx="75.4" cy="65.6" rx="4.2" ry="2.6" fill="${N.blush}" opacity=".16"/>
      <ellipse cx="94.6" cy="65.6" rx="4.2" ry="2.6" fill="${N.blush}" opacity=".16"/>
      <path d="M73.2 54.8C75.4 52 79 51.2 82.2 52.6L82 54C79 53.2 76 53.6 73.2 54.8Z" fill="${N.hair}"/>
      <path d="M96.8 54.8C94.6 52 91 51.2 87.8 52.6L88 54C91 53.2 94 53.6 96.8 54.8Z" fill="${N.hair}"/>
      <path d="M75.6 56.1C77.2 54.9 80.2 54.8 81.6 56.1M94.4 56.1C92.8 54.9 89.8 54.8 88.4 56.1" stroke="${N.skinD}" stroke-width=".45" fill="none" opacity=".7"/>
      <g class="n-eyes">
        <path d="M74.8 58.8C76 56.8 80.4 56.4 82 58.4C80.6 60 76.4 60.4 74.8 58.8Z" fill="#FBF6F2"/>
        <path d="M95.2 58.8C94 56.8 89.6 56.4 88 58.4C89.4 60 93.6 60.4 95.2 58.8Z" fill="#FBF6F2"/>
        <circle cx="78.6" cy="58.4" r="1.75" fill="${N.iris}"/><circle cx="91.4" cy="58.4" r="1.75" fill="${N.iris}"/>
        <circle cx="78.6" cy="58.4" r=".85" fill="#140A06"/><circle cx="91.4" cy="58.4" r=".85" fill="#140A06"/>
        <circle cx="79.2" cy="57.7" r=".45" fill="#fff"/><circle cx="92" cy="57.7" r=".45" fill="#fff"/>
        <path d="M74.5 58.8C75.9 56.4 80.6 55.9 82.2 58.3M74.8 58.6L73.9 58M95.5 58.8C94.1 56.4 89.4 55.9 87.8 58.3M95.2 58.6L96.1 58" stroke="${N.lash}" stroke-width=".85" fill="none" stroke-linecap="round"/>
        <path d="M75.4 59.6C77 60.6 80.2 60.6 81.6 59M94.6 59.6C93 60.6 89.8 60.6 88.4 59" stroke="${N.skinD}" stroke-width=".4" fill="none" opacity=".7"/>
      </g>
      <path d="M83.5 60.6C83.4 62.9 82.9 64.6 82.4 65.9" stroke="${N.skinS}" stroke-width=".7" fill="none" stroke-linecap="round" opacity=".6"/>
      <ellipse cx="85" cy="66.1" rx="1.6" ry="1.1" fill="${N.skinH}" opacity=".85"/>
      <path d="M81.7 67.4C82.5 68.6 83.9 68.8 84.6 68.2M85.4 68.2C86.1 68.8 87.5 68.6 88.3 67.4" stroke="${N.skinD}" stroke-width=".7" fill="none" stroke-linecap="round"/>
      <g class="n-mouth">
        <path d="M80.2 72.6C81.8 71.4 83.4 70.8 85 71.5C86.6 70.8 88.2 71.4 89.8 72.6C87.6 73.1 82.4 73.1 80.2 72.6Z" fill="${N.lipD}"/>
        <path d="M80.4 72.7C82.6 73.2 87.4 73.2 89.6 72.7C88.6 75.2 81.4 75.2 80.4 72.7Z" fill="${N.lip}"/>
        <path d="M83.2 73.9Q85 74.5 86.8 73.9" stroke="${N.lipH}" stroke-width=".6" fill="none" stroke-linecap="round"/>
        <path d="M79.4 71.8Q79.8 72.8 80.6 72.8M90.6 71.8Q90.2 72.8 89.4 72.8" stroke="${N.skinD}" stroke-width=".5" fill="none" opacity=".8"/>
      </g>
      <g class="n-mouthO" opacity="0">
        <path d="M80.4 72.4C82 70.4 88 70.4 89.6 72.4C88.6 76 81.4 76 80.4 72.4Z" fill="${N.lip}"/>
        <path d="M81.6 72.6C83 71.6 87 71.6 88.4 72.6C87.4 74.8 82.6 74.8 81.6 72.6Z" fill="#5A1F24"/>
        <path d="M82 72.5C83.6 71.9 86.4 71.9 88 72.5L87.6 73.2C86 73 84 73 82.4 73.2Z" fill="#fff"/>
      </g>
      <path d="M68.8 60.6C67 46.6 73.4 35.4 85.2 35.2C97.2 35.4 103.2 46.4 101.2 60.6C100.4 54.6 99.6 50.4 97.4 47.4C93.8 43.6 87.6 43.8 80.4 41.4C77.2 44.2 73.6 47.4 71.8 52.6C70.8 55.4 69.8 58.2 68.8 60.6Z" fill="${u('hair')}"/>
      <path d="M80.6 37.6C88 37.8 95.6 40.6 99 47.2M78.6 38.6C74 41 71 46 70.2 53.6M84 36.6C91.6 37 97.4 41.4 99.8 50" stroke="${N.hairH}" stroke-width=".7" fill="none" opacity=".55" stroke-linecap="round"/>
      <path d="M80.4 41.4C80.6 39.4 81 37.4 81.6 35.8" stroke="${N.hairS}" stroke-width=".6" fill="none"/>
    </g>
    <g class="n-armR">
      <path d="${limb(60, 110, 54, 156, 7.4, 5.8)}" fill="${u('sleeve')}" ${ol}/>
      <path d="M55.6 121C54.2 132 53.6 142 53.4 150" stroke="${N.suitD}" stroke-width=".6" fill="none" opacity=".5"/>
      <g class="n-foreR">
        <path d="${limb(54, 156, 52.4, 193, 5.8, 4.8)}" fill="${u('sleeve')}" ${ol}/>
        <path d="M47.4 191.4H57.4L57.2 195.4H47.6Z" fill="${N.blouse}" stroke="${N.blouseS}" stroke-width=".5"/>
        <path d="M47.8 194.6C46.6 199 46.4 205 47.4 210.4C48 214 49.6 217.6 51.6 218C53.4 218.4 54.4 216.4 54.4 214L55.2 214.8C56.4 215.6 57.8 214.6 57.6 212.6C57.4 207 57.8 200 57 194.6Z" fill="${N.skin}" stroke="${N.skinD}" stroke-width=".5"/>
        <path d="M50.6 206.6L51.4 216M53.8 207L54.4 214" stroke="${N.skinS}" stroke-width=".6" fill="none"/>
      </g>
    </g>
  </g>
</g>`;
  }

  // Sahi Travels Welcome Representative, full body cartoon character. Coordinates: 170 × 360, feet at y≈356.
  function repRig() {
    return `
<g class="r-root">
  <g class="r-legL">
    <path d="M65 194H85L83 346H67Z" fill="${C.navy}"/>
    <ellipse cx="74" cy="351" rx="11.5" ry="5.5" fill="#151C2C"/>
  </g>
  <g class="r-legR">
    <path d="M85 194H105L103 346H87Z" fill="${C.navy}"/>
    <path d="M86.2 202L87.6 344" stroke="#33466F" stroke-width="1.6"/>
    <ellipse cx="96" cy="351" rx="11.5" ry="5.5" fill="#151C2C"/>
  </g>
  <g class="r-upper">
    <rect x="79" y="82" width="12" height="22" rx="5" fill="${C.skinS}"/>
    <path d="M56 114Q58 103 72 100H98Q112 103 114 114L112 206Q85 212 58 206Z" fill="${C.navy}"/>
    <path d="M74 100L85 132L96 100Z" fill="#fff"/>
    <path d="M74 100L85 132L78 148L66 106Z" fill="${C.navy2}"/>
    <path d="M96 100L85 132L92 148L104 106Z" fill="${C.navy2}"/>
    <path d="M82 106L88 106L90 128L85 142L80 128Z" fill="${C.terracotta}"/>
    <path d="M82 103H88V108H82Z" fill="${C.apricotD}"/>
    <rect x="63" y="122" width="12" height="6" rx="1.5" fill="${C.gold}" stroke="#B88225" stroke-width="0.6"/>
    <circle cx="85" cy="162" r="2.2" fill="${C.gold}"/><circle cx="85" cy="179" r="2.2" fill="${C.gold}"/>
    
    <g class="r-armL">
      <path d="M112 110L122 154" stroke="${C.navy}" stroke-width="13" stroke-linecap="round"/>
      <g class="r-foreL">
        <path d="M122 154L112 188" stroke="${C.navy}" stroke-width="12" stroke-linecap="round"/>
        <circle cx="110" cy="192" r="6.5" fill="${C.skin}"/>
        <g class="r-board" transform="translate(108 175) rotate(-8)">
          <rect x="-8" y="-30" width="46" height="58" rx="5" fill="#FAF6F2" stroke="${C.terracotta}" stroke-width="1.8"/>
          <rect x="-5" y="-27" width="40" height="12" rx="3" fill="${C.navy}"/>
          <text x="15" y="-19" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="5" font-weight="700" letter-spacing="0.8" fill="${C.gold}">SAHI</text>
          <text x="15" y="-3" text-anchor="middle" font-family="Archivo, sans-serif" font-size="5.5" font-weight="700" letter-spacing="0.5" fill="${C.navy}">ARRIVAL</text>
          <text x="15" y="8" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-size="7.5" font-style="italic" font-weight="600" fill="${C.terracotta}">Welcome</text>
          <line x1="-2" y1="14" x2="32" y2="14" stroke="${C.line}" stroke-width="0.8" stroke-dasharray="2 1.5"/>
          <circle cx="15" cy="21" r="2" fill="${C.gold}"/>
        </g>
      </g>
    </g>

    <g class="r-head">
      <path d="M60 60Q58 24 85 22Q112 24 110 60Q110 72 105 78H65Q60 72 60 60Z" fill="${C.hair}"/>
      <ellipse cx="64.5" cy="62" rx="3.6" ry="5.2" fill="${C.skinS}"/><ellipse cx="105.5" cy="62" rx="3.6" ry="5.2" fill="${C.skinS}"/>
      <ellipse cx="85" cy="60" rx="20" ry="23.5" fill="${C.skin}"/>
      <path d="M63 52Q64 28 85 27Q107 28 107 48Q98 38 84 39Q70 40 63 52Z" fill="${C.hair}"/>
      <path d="M84 39Q92 46 95 52" stroke="${C.hair}" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M71 49Q75.5 46.5 80 49M90 49Q94.5 46.5 99 49" stroke="${C.hair}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <g class="r-eyes">
        <ellipse cx="76" cy="58.5" rx="2.4" ry="3.1" fill="${C.hair}"/>
        <ellipse cx="94" cy="58.5" rx="2.4" ry="3.1" fill="${C.hair}"/>
        <circle cx="76.8" cy="57.3" r=".9" fill="#fff"/>
        <circle cx="94.8" cy="57.3" r=".9" fill="#fff"/>
      </g>
      <path d="M85 61Q83.4 66 86 67.2" stroke="${C.skinS}" stroke-width="1.3" fill="none" stroke-linecap="round"/>
      <circle cx="70.5" cy="66.5" r="3.6" fill="${C.blush}" opacity=".35"/><circle cx="99.5" cy="66.5" r="3.6" fill="${C.blush}" opacity=".35"/>
      <path class="r-mouth" d="M78.5 71Q85 76.5 91.5 71" stroke="${C.lip}" stroke-width="2" fill="none" stroke-linecap="round"/>
      <ellipse class="r-mouthO" cx="85" cy="72.6" rx="3.6" ry="2.8" fill="${C.lip}" opacity="0"/>
    </g>

    <g class="r-armR">
      <path d="M58 110L50 154" stroke="${C.navy}" stroke-width="13" stroke-linecap="round"/>
      <g class="r-foreR">
        <path d="M50 154L44 194" stroke="${C.navy}" stroke-width="12" stroke-linecap="round"/>
        <circle cx="43" cy="199" r="6.5" fill="${C.skin}"/>
      </g>
    </g>
  </g>
</g>`;
  }
  const nilaShadow = (cx = 85, cy = 358, rx = 52) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="6" fill="#0F1B33" opacity=".1"/>`;

  // Nila's head and shoulders, for vehicle windows (face centre at 0,0)
  const miniNila = (cls: string = "mini") => `<g class="${cls}">
    <path d="M-10.4 2Q-11.8 -14 0 -15Q11.8 -14 10.4 2Q10.2 6 8.8 8H-8.8Q-10.2 6 -10.4 2Z" fill="${N.hair}"/>
    <ellipse cx="0" cy="9.6" rx="9.4" ry="4.4" fill="${N.hair}"/>
    <path d="M-3.4 7V15H3.4V7Z" fill="${N.skinS}"/>
    <path d="M-11 15.6Q0 11.6 11 15.6L12.6 30H-12.6Z" fill="${N.suit}" stroke="${N.outline}" stroke-width=".5"/>
    <path d="M-3.4 13.8L0 21L3.4 13.8Z" fill="#fff"/>
    <path d="M-3.6 13.8L-6.6 17.6L0 26M3.6 13.8L6.6 17.6L0 26" stroke="${N.outline}" stroke-width=".6" fill="none"/>
    <ellipse cx="0" cy="0" rx="8.4" ry="10.4" fill="${N.skin}"/>
    <circle cx="-8.5" cy="3.8" r=".8" fill="${N.gold}"/><circle cx="8.5" cy="3.8" r=".8" fill="${N.gold}"/>
    <path d="M-8.9 1.4Q-10.4 -12.6 .6 -13Q10.4 -12.6 8.9 1.4Q8.4 -4.8 6.4 -6.6Q3 -8.8 -1.6 -9.6Q-5.6 -6.4 -8.9 1.4Z" fill="${N.hair}"/>
    <path d="M-5.6 -3.4Q-3.6 -4.8 -1.6 -4M1.6 -4Q3.6 -4.8 5.6 -3.4" stroke="${N.hair}" stroke-width=".75" fill="none" stroke-linecap="round"/>
    <ellipse cx="-3.4" cy="-.4" rx="1.25" ry="1" fill="${N.iris}"/><ellipse cx="3.4" cy="-.4" rx="1.25" ry="1" fill="${N.iris}"/>
    <path d="M-5.2 -.6Q-3.4 -2.2 -1.6 -.8M1.6 -.8Q3.4 -2.2 5.2 -.6" stroke="${N.lash}" stroke-width=".55" fill="none" stroke-linecap="round"/>
    <path d="M-.2 1.4Q-.8 3.4 .6 3.8" stroke="${N.skinD}" stroke-width=".5" fill="none" stroke-linecap="round"/>
    <path d="M-2.6 5.8Q0 5 2.6 5.8Q0 7.8 -2.6 5.8Z" fill="${N.lip}"/>
    <circle cx="-5.4" cy="3" r="1.7" fill="${N.blush}" opacity=".3"/><circle cx="5.4" cy="3" r="1.7" fill="${N.blush}" opacity=".3"/>
    <g class="mini-hand"><path d="M11 16L17 1" stroke="${N.outline}" stroke-width="5.6" stroke-linecap="round"/><path d="M11 16L17 1" stroke="${N.suit}" stroke-width="4.4" stroke-linecap="round"/><circle cx="17.6" cy="-2" r="3" fill="${N.skin}" stroke="${N.skinD}" stroke-width=".4"/></g>
  </g>`;
  const chauffeur = () => `<g>
    <path d="M-10 15Q0 11 10 15L12 30H-12Z" fill="#2A3142"/>
    <ellipse cx="0" cy="0" rx="9" ry="10.5" fill="${C.skinS}"/>
    <path d="M-10.5 -5H10.5L9 -12Q0 -16 -9 -12Z" fill="${C.navy}"/><rect x="-11" y="-6" width="24" height="3" rx="1.5" fill="${C.navy}"/>
    <circle cx="-3.4" cy="0" r="1.1" fill="${C.hair}"/><circle cx="3.4" cy="0" r="1.1" fill="${C.hair}"/>
    <path d="M-4 4Q0 7 4 4" stroke="${C.hair}" stroke-width="2" fill="none"/>
  </g>`;
  const pax = (x, y, p) => `<g transform="translate(${x} ${y})"><path d="M-10 15Q0 11 10 15L12 30H-12Z" fill="${p[2]}"/><ellipse cx="0" cy="0" rx="9" ry="10.5" fill="${p[0]}"/><path d="M-9.5 -2Q-9 -13 0 -13Q9 -13 9.5 -2Q5 -8 0 -8Q-5 -8 -9.5 -2Z" fill="${p[1]}"/><circle cx="-3.3" cy="0" r="1.1" fill="${C.hair}"/><circle cx="3.3" cy="0" r="1.1" fill="${C.hair}"/><path d="M-2.6 4Q0 6 2.6 4" stroke="${C.lip}" stroke-width="1" fill="none"/></g>`;

  const wheel = (cx: any, cy: any, r: any) => `<g class="wheel"><circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.tire}"/><circle cx="${cx}" cy="${cy}" r="${(r * .58).toFixed(1)}" fill="${C.hub}"/><path d="M${cx - r * .5} ${cy}H${cx + r * .5}M${cx} ${cy - r * .5}V${cy + r * .5}" stroke="#9AA6BD" stroke-width="${(r * .13).toFixed(1)}"/><circle cx="${cx}" cy="${(cy - r * .8).toFixed(1)}" r="${(r * .1).toFixed(1)}" fill="#59637A"/><circle cx="${cx}" cy="${cy}" r="${(r * .17).toFixed(1)}" fill="${C.navy}"/></g>`;
  const arch = (cx, by, r) => `<path d="M${cx - r - 5} ${by}A${r + 5} ${r + 5} 0 0 1 ${cx + r + 5} ${by}Z" fill="#2A3142"/>`;
  const win = (id, d, inner, fill = C.glassL) => `<clipPath id="${id}"><path d="${d}"/></clipPath><path d="${d}" fill="${fill}"/><g clip-path="url(#${id})">${inner}</g>`;

  function vTaxi(p) {
    return `<g class="veh-art">
      <ellipse cx="0" cy="1" rx="150" ry="7" fill="#0F1B33" opacity=".08"/>
      <path d="M-148 -30Q-148 -48 -128 -52L-84 -58Q-58 -90 -4 -92H40Q76 -90 102 -60L136 -54Q152 -50 152 -32V-18Q152 -10 144 -10H-140Q-148 -10 -148 -18Z" fill="#fff" stroke="${C.line}" stroke-width="1.5"/>
      <path d="M-147 -26H151V-18Q151 -11 144 -11H-140Q-147 -11 -147 -18Z" fill="${C.shade}"/>
      ${win(p + 'a', 'M-74 -60Q-52 -84 -8 -86V-60Z', `<g class="mini-wrap" transform="translate(-38 -70)">${miniNila()}</g>`)}
      ${win(p + 'b', 'M0 -86H38Q66 -84 90 -60H0Z', `<g transform="translate(40 -70)">${chauffeur()}</g>`)}
      <rect x="-140" y="-44" width="286" height="5" rx="2.5" fill="${C.apricot}"/>
      <path d="M-4 -60V-24M-80 -56V-26" stroke="${C.line}" stroke-width="1.5"/>
      <rect x="-32" y="-54" width="12" height="3" rx="1.5" fill="#B7C2D2"/><rect x="44" y="-54" width="12" height="3" rx="1.5" fill="#B7C2D2"/>
      <path class="hl" d="M139 -48H151V-40H137Z" fill="${C.hl}"/><path d="M-147 -48H-139V-38H-147Z" fill="${C.tail}"/>
      <rect x="-22" y="-104" width="44" height="13" rx="3.5" fill="${C.apricot}"/>
      <text x="0" y="-94.5" text-anchor="middle" font-size="8.5" font-weight="700" fill="#fff" font-family="Archivo, sans-serif" letter-spacing="1.5">SAHI</text>
      ${arch(-92, -10, 22)}${arch(96, -10, 22)}${wheel(-92, -12, 21)}${wheel(96, -12, 21)}
    </g>`;
  }
  function vMpv(p) {
    let flowers = '';
    const cols = ['#F4A7B4', '#fff', '#F7C6A3', '#F08A4B'];
    for (let i = 0; i <= 10; i++) flowers += `<circle cx="${112 + i * 3.6}" cy="${-100 + i * 4}" r="4.2" fill="${cols[i % 4]}" stroke="#E9DCCF" stroke-width=".6"/>`;
    for (let i = 0; i <= 12; i++) flowers += `<circle cx="${-110 + i * 16}" cy="${-125 + Math.sin(i / 1.9) * 2}" r="3.4" fill="${cols[(i + 1) % 4]}" stroke="#E9DCCF" stroke-width=".6"/>`;
    return `<g class="veh-art">
      <ellipse cx="0" cy="1" rx="160" ry="7" fill="#0F1B33" opacity=".1"/>
      <path d="M-158 -26Q-158 -44 -148 -50L-140 -108Q-137 -122 -120 -122H68Q94 -120 114 -98L144 -64Q160 -60 160 -40V-20Q160 -10 150 -10H-150Q-158 -10 -158 -20Z" fill="${C.navy}"/>
      <path d="M-136 -112H64Q86 -110 102 -92L122 -70H-140Z" fill="#5C76A3"/>
      ${win(p + 'a', 'M-64 -112H-4V-70H-64Z', `<g class="mini-wrap" transform="translate(-34 -90)">${miniNila()}</g>`, '#7F98C2')}
      ${win(p + 'b', 'M6 -112H64Q86 -110 102 -92L122 -70H6Z', `<g transform="translate(46 -90)">${chauffeur()}</g>`, '#7F98C2')}
      <rect x="-70" y="-114" width="6" height="46" fill="${C.navy}"/><rect x="-4" y="-114" width="10" height="46" fill="${C.navy}"/>
      <path d="M-152 -62H156" stroke="#C9D3E0" stroke-width="2"/>
      <path d="M-8 -60V-22M-80 -60V-22" stroke="#33466F" stroke-width="1.6"/>
      <path class="hl" d="M144 -58H158V-48H142Z" fill="${C.hl}"/>
      <path d="M152 -42V-26" stroke="#C9D3E0" stroke-width="4" stroke-linecap="round"/>
      <path d="M-158 -52H-150V-38H-158Z" fill="${C.tail}"/>
      <g class="garland" opacity="0">${flowers}</g>
      ${arch(-104, -10, 24)}${arch(106, -10, 24)}${wheel(-104, -14, 23)}${wheel(106, -14, 23)}
    </g>`;
  }
  function vCoach(p) {
    let heads = '';
    [-222, -162, -102, -42, 18, 78].forEach((x, i) => { heads += pax(x, -116, PAX[i % PAX.length]); });
    heads += `<g class="mini-wrap" transform="translate(140 -116)">${miniNila()}</g>`;
    return `<g class="veh-art">
      <ellipse cx="0" cy="1" rx="270" ry="8" fill="#0F1B33" opacity=".08"/>
      <path d="M-264 -22V-160Q-264 -176 -248 -176H222Q248 -176 256 -152L270 -64V-22Q270 -12 260 -12H-254Q-264 -12 -264 -22Z" fill="#fff" stroke="${C.line}" stroke-width="1.5"/>
      ${win(p + 'a', 'M-252 -160H232Q244 -160 248 -148L258 -88H-252Z', heads, C.glassT)}
      ${[-192, -132, -72, -12, 48, 108, 168].map(x => `<rect x="${x}" y="-162" width="6" height="76" fill="#fff"/>`).join('')}
      <rect x="-264" y="-80" width="534" height="7" fill="${C.apricot}"/>
      <path d="M-263 -42H269V-22Q269 -13 260 -13H-254Q-263 -13 -263 -22Z" fill="${C.shade}"/>
      <text x="-150" y="-52" font-size="16" font-weight="500" fill="${C.navy}" font-family="Archivo, sans-serif" style="font-stretch:125%" letter-spacing="3">SAHI TRAVELS</text>
      <rect x="198" y="-84" width="34" height="66" rx="3" fill="none" stroke="${C.line}" stroke-width="2"/>
      <path class="hl" d="M258 -46H270V-36H256Z" fill="${C.hl}"/>
      ${arch(-170, -12, 28)}${arch(172, -12, 28)}${wheel(-170, -16, 27)}${wheel(172, -16, 27)}
    </g>`;
  }
  function vTrain(p) {
    const bogie = cx => `<rect x="${cx - 36}" y="-27" width="72" height="11" rx="5" fill="#2A3142"/>${wheel(cx - 19, -11, 11)}${wheel(cx + 19, -11, 11)}`;
    const heads = (x0, n, off) => { let s = ''; for (let i = 0; i < n; i++) s += pax(x0 + 30 + i * 62, -106, PAX[(i + off) % PAX.length]); return s; };
    const car = (x0, i) => `
      <rect x="${x0}" y="-146" width="412" height="124" rx="14" fill="#fff" stroke="${C.line}" stroke-width="1.5"/>
      ${win(p + 'c' + i, `M${x0 + 18} -126H${x0 + 394}V-88H${x0 + 18}Z`, heads(x0 + 18, 6, i), C.glassT)}
      ${[1, 2, 3, 4, 5].map(k => `<rect x="${x0 + 16 + k * 62.6}" y="-127" width="4" height="40" fill="#fff"/>`).join('')}
      <rect x="${x0}" y="-80" width="412" height="6" fill="${C.apricot}"/>
      <path d="M${x0 + 1} -46H${x0 + 411}V-34Q${x0 + 411} -23 ${x0 + 399} -23H${x0 + 13}Q${x0 + 1} -23 ${x0 + 1} -34Z" fill="${C.shade}"/>
      ${bogie(x0 + 76)}${bogie(x0 + 336)}`;
    return `<g class="veh-art">
      ${car(-1260, 2)}<rect x="-848" y="-132" width="12" height="96" fill="#C9D3E0"/>
      ${car(-836, 1)}<rect x="-424" y="-132" width="12" height="96" fill="#C9D3E0"/>
      <path d="M-412 -134Q-412 -146 -400 -146H-128Q-72 -142 -34 -104Q-2 -70 0 -40Q0 -23 -16 -23H-400Q-412 -23 -412 -34Z" fill="#fff" stroke="${C.line}" stroke-width="1.5"/>
      <path d="M-112 -137Q-70 -132 -42 -104L-58 -98Q-82 -120 -116 -123Z" fill="${C.glass}"/>
      ${win(p + 'L', 'M-396 -126H-160V-88H-396Z', heads(-396, 3, 3) + `<g class="mini-wrap" transform="translate(-196 -106)">${miniNila()}</g>`, C.glassT)}
      <rect x="-412" y="-80" width="396" height="6" fill="${C.apricot}"/>
      <path d="M-411 -46H-8Q-2 -40 -3 -34Q-4 -24 -16 -23H-400Q-411 -23 -411 -34Z" fill="${C.shade}"/>
      <circle class="hl" cx="-10" cy="-52" r="4.5" fill="${C.hl}"/>
      <path d="M-700 -146L-682 -166L-664 -146M-694 -166H-652" stroke="#9AA6BD" stroke-width="2.5" fill="none"/>
      ${bogie(-340)}${bogie(-86)}
    </g>`;
  }
  const cloudPath = 'M0 0H150Q170 0 170 -18Q170 -38 146 -38Q140 -66 108 -66Q84 -66 74 -48Q66 -60 48 -58Q24 -56 22 -34Q0 -34 0 -16Z';
  const cloud = (x: number, y: number, s: number = 1, op: number = 1, cls: string = "") => `<g class="${cls}" transform="translate(${x} ${y}) scale(${s})" opacity="${op}"><path d="${cloudPath}" fill="#fff"/></g>`;
  function vPlane(p) {
    let wins = '';
    for (let x = -200; x <= 172; x += 20) wins += `<rect x="${x}" y="-97" width="9" height="12" rx="4.5" fill="${C.glass}"/>`;
    return `<g class="plane-body">
      <path d="M-236 -104L-284 -196Q-286 -203 -278 -203H-248Q-240 -203 -234 -196L-166 -104Z" fill="${C.apricot}"/>
      <rect x="-266" y="-186" width="15" height="21" rx="7" fill="none" stroke="#fff" stroke-width="3"/>
      <path d="M-262 -94L-310 -72Q-314 -68 -308 -68L-230 -74Z" fill="#DCE4EE"/>
      <path d="M-282 -80Q-282 -106 -244 -108H196Q258 -106 290 -88Q302 -80 290 -72Q258 -54 196 -52H-244Q-282 -54 -282 -80Z" fill="#fff" stroke="${C.line}" stroke-width="1.5"/>
      <path d="M-244 -58H196Q246 -58 282 -71" stroke="${C.navy}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <rect x="-240" y="-77" width="430" height="4" rx="2" fill="${C.apricot}"/>
      ${wins}
      <path d="M262 -98L284 -92Q289 -89 284 -86L262 -88Z" fill="${C.glass}"/>
      <rect x="200" y="-102" width="16" height="42" rx="5" fill="${C.glass}"/>
      <rect class="door" x="200" y="-102" width="16" height="42" rx="5" fill="#fff" stroke="${C.line}" stroke-width="1.2" opacity="0"/>
      <g class="gear"><path d="M222 -54V-14M-4 -44V-16" stroke="#5B6880" stroke-width="5" stroke-linecap="round"/><circle cx="222" cy="-9" r="9" fill="${C.tire}"/><circle cx="-14" cy="-10" r="10" fill="${C.tire}"/><circle cx="8" cy="-10" r="10" fill="${C.tire}"/></g>
      <path d="M-62 -66H52Q62 -66 55 -59L-12 -6Q-16 -2 -22 -2H-44Q-51 -2 -49 -9L-30 -60Z" fill="#E6ECF4" stroke="${C.line}" stroke-width="1.2"/>
      <rect x="-28" y="-50" width="72" height="26" rx="13" fill="#D3DCE8"/><ellipse cx="42" cy="-37" rx="5" ry="12" fill="#2A3142"/>
    </g>
    <g class="porthole">
      <path d="M118 -150L126 -98L152 -150Z" fill="#fff" stroke="${C.navy}" stroke-width="2.5" stroke-linejoin="round"/>
      <circle cx="140" cy="-196" r="54" fill="#fff" stroke="${C.navy}" stroke-width="3"/>
      <clipPath id="${p}ph"><circle cx="140" cy="-196" r="46"/></clipPath>
      <g clip-path="url(#${p}ph)"><rect x="80" y="-250" width="120" height="110" fill="${C.glassL}"/>${cloud(84, -152, .5)}<g class="mini-wrap" transform="translate(140 -192) scale(2.1)">${miniNila()}</g></g>
    </g>`;
  }
  const vStairs = () => `<g class="stairs-art">
    <rect x="96" y="-16" width="128" height="14" rx="4" fill="${C.apricot}"/>
    <circle cx="114" cy="-2" r="7" fill="${C.tire}"/><circle cx="206" cy="-2" r="7" fill="${C.tire}"/>
    <path d="M120 -16L198 -60H212V-16Z" fill="#EDF1F6" stroke="#C9D3E0"/>
    <path d="M130 -22h12M144 -30h12M158 -38h12M172 -46h12M186 -54h12" stroke="#9AA6BD" stroke-width="2.5"/>
    <path d="M120 -40L198 -84M120 -16V-40M198 -60V-84" stroke="#9AA6BD" stroke-width="2.5" fill="none"/>
  </g>`;

  // scenery
  let seed = 11;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const building = (x, b, w, h, fill) => {
    let s = `<rect x="${x.toFixed(0)}" y="${(b - h).toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="${fill}"/>`;
    for (let yy = b - h + 14; yy < b - 14; yy += 22) s += `<rect x="${(x + 8).toFixed(0)}" y="${yy.toFixed(0)}" width="${(w - 16).toFixed(0)}" height="5" rx="2" fill="#EEF4FA" opacity=".85"/>`;
    return s;
  };
  const palm = (x: number, b: number = 722, s: number = 1) => `<g transform="translate(${x.toFixed(0)} ${b}) scale(${s})"><path d="M0 0Q-8 -60 8 -122" stroke="#C7A884" stroke-width="7" fill="none" stroke-linecap="round"/>${[[-52, -8], [-40, -34], [42, -30], [54, -4], [6, -52]].map(([dx, dy]) => `<path d="M8 -122Q${8 + dx * .5} ${-136 + dy} ${8 + dx} ${-112 + dy}" stroke="#86BFA2" stroke-width="7" fill="none" stroke-linecap="round"/>`).join('')}<circle cx="8" cy="-120" r="5" fill="#B08A63"/></g>`;
  const tree = (x: number, b: number = 722, s: number = 1) => `<g transform="translate(${x.toFixed(0)} ${b}) scale(${s})"><rect x="-4" y="-50" width="8" height="50" rx="3" fill="#C7A884"/><circle cx="0" cy="-76" r="34" fill="#AED6C1"/><circle cx="-15" cy="-62" r="22" fill="#98C9AF"/></g>`;
  const lamp = (x: number) => `<path d="M${x} 720V598Q${x} 590 ${x + 10} 590H${x + 26}" stroke="#C3CEDC" stroke-width="4" fill="none"/><rect x="${x + 20}" y="587" width="16" height="6" rx="3" fill="#A9B6C8"/>`;

  function buildJourney() {
    seed = 11;
    const W = 12600;
    // far: sun + clouds
    let far = `<g class="far-clouds">`;
    for (let i = 0; i < 16; i++) far += cloud(rnd() * 3800 - 300, 90 + rnd() * 270, .45 + rnd() * .7, .9);
    far += '</g>';
    // mid: skyline, lighthouse, tower, hills, hotel skyline
    let mid = '';
    for (let x = -260; x < 2350;) { const w = 60 + rnd() * 60, h = 110 + rnd() * 200; mid += building(x, 700, w, h, rnd() > .5 ? '#D4E2F1' : '#DDE8F4'); x += w + 6 + rnd() * 16; }
    mid += `<path d="M1506 700L1514 452H1530L1538 700Z" fill="#fff" stroke="#C9D6E6" stroke-width="2"/><rect x="1511" y="520" width="22" height="22" fill="#C9D9EC"/><rect x="1508" y="600" width="28" height="24" fill="#C9D9EC"/><rect x="1510" y="426" width="24" height="26" rx="4" fill="#FFE2CC"/><path d="M1504 428L1522 410L1540 428Z" fill="#C9D9EC"/>`;
    mid += `<rect x="2551" y="508" width="18" height="192" fill="#D3E1F0"/><path d="M2532 508L2538 478H2582L2588 508Z" fill="#C3D5EA"/><rect x="2536" y="470" width="48" height="8" rx="3" fill="#B6CAE2"/>`;
    let hd = 'M2650 700';
    for (let x = 2650; x < 5600; x += 360) hd += `Q${x + 180} ${(700 - 90 - rnd() * 110).toFixed(0)} ${x + 360} 700`;
    mid += `<path d="${hd}V720H2650Z" fill="#DCEAEC"/>`;
    for (let x = 5450; x < 6800;) { const w = 70 + rnd() * 70, h = 140 + rnd() * 240; mid += building(x, 700, w, h, rnd() > .5 ? '#D4E2F1' : '#DDE8F4'); x += w + 10 + rnd() * 20; }
    // near: ground, road, rails, terminal, trees, venue
    let near = `
      <rect x="-400" y="640" width="${W}" height="82" fill="#EEF3EC"/>
      <rect x="-400" y="720" width="${W}" height="112" fill="#E8EDF3"/>
      <path d="M-400 721H${W}" stroke="#DCE3EC" stroke-width="3"/>
      <path d="M-400 776H${W}" stroke="#fff" stroke-width="5" stroke-dasharray="46 40"/>
      <rect x="-400" y="832" width="${W}" height="90" fill="#EEF3EC"/>
      <path d="M-400 832H${W}" stroke="#DCE3EC" stroke-width="3"/>
      <path d="M4700 705H${W}" stroke="#CBD3DE" stroke-width="7" stroke-dasharray="5 15"/>
      <path d="M4700 700H${W}" stroke="#94A2B8" stroke-width="3"/>`;
    for (let x = 160; x < W; x += 520) if (x < 2950 || x > 4300) near += lamp(x);
    for (let x = 60; x < 2900; x += 260 + rnd() * 180) near += rnd() > .45 ? palm(x, 722, .85 + rnd() * .3) : tree(x, 722, .8 + rnd() * .3);
    for (let x = 4500; x < 10200; x += 240 + rnd() * 260) near += rnd() > .5 ? palm(x, 690, .7 + rnd() * .3) : tree(x, 690, .7 + rnd() * .3);
    near += `<rect x="3350" y="610" width="660" height="110" rx="6" fill="#F7FAFE" stroke="#D3DEEA" stroke-width="2"/>
      <path d="M3338 616Q3680 556 4022 616" stroke="#AFC3DA" stroke-width="12" fill="none" stroke-linecap="round"/>
      ${Array.from({ length: 16 }, (_, i) => `<path d="M${3378 + i * 40} 632V716" stroke="#DCE6F1" stroke-width="2"/>`).join('')}
      <rect x="3350" y="666" width="660" height="3" fill="#DCE6F1"/>
      <text x="3680" y="652" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="19" letter-spacing="6" fill="${C.navy}">MAA · CHENNAI</text>
      <!-- Destination runway threshold and runway centerlines -->
      ${Array.from({ length: 9 }, (_, i) => `<rect x="4740" y="${738 + i * 8}" width="30" height="5" fill="#fff" opacity=".92"/>`).join('')}
      ${Array.from({ length: 14 }, (_, i) => `<rect x="${4820 + i * 88}" y="774" width="56" height="5.5" rx="2" fill="#fff" opacity=".9"/>`).join('')}
      <!-- Destination Arrivals Terminal -->
      <rect x="5250" y="605" width="720" height="115" rx="6" fill="#F7FAFE" stroke="#D3DEEA" stroke-width="2"/>
      <path d="M5238 611Q5610 548 5982 611" stroke="#AFC3DA" stroke-width="12" fill="none" stroke-linecap="round"/>
      ${Array.from({ length: 18 }, (_, i) => `<path d="M${5278 + i * 40} 628V716" stroke="#DCE6F1" stroke-width="2"/>`).join('')}
      <rect x="5250" y="666" width="720" height="3" fill="#DCE6F1"/>
      <rect x="5460" y="626" width="300" height="28" rx="6" fill="${C.navy}"/>
      <text x="5610" y="645" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="14.5" font-weight="600" letter-spacing="4" fill="#fff">DESTINATION · ARRIVALS</text>`;
    const ax = 10560;
    let flowers = '';
    const fc = ['#F4A7B4', '#fff', '#F7C6A3', '#F08A4B'];
    for (let a = 180, i = 0; a >= 0; a -= 11, i++) { const r = a * Math.PI / 180; flowers += `<circle cx="${(ax + 72 * Math.cos(r)).toFixed(1)}" cy="${(566 - 72 * Math.sin(r)).toFixed(1)}" r="8" fill="${fc[i % 4]}" stroke="#EADBCB" stroke-width="1"/>`; }
    near += `<path d="M${ax - 46} 720L${ax - 30} 650H${ax + 30}L${ax + 46} 720Z" fill="#F8DCCB"/>
      <rect x="${ax - 78}" y="566" width="12" height="154" fill="#fff" stroke="#E5D8CA" stroke-width="2"/><rect x="${ax + 66}" y="566" width="12" height="154" fill="#fff" stroke="#E5D8CA" stroke-width="2"/>
      <path d="M${ax - 72} 566A72 72 0 0 1 ${ax + 72} 566" stroke="#F3E6D8" stroke-width="12" fill="none"/>${flowers}
      <rect x="10700" y="420" width="760" height="300" fill="#fff" stroke="#DCE4EE" stroke-width="2"/>
      ${Array.from({ length: 5 }, (_, r) => Array.from({ length: 9 }, (_, c) => `<rect x="${10730 + c * 80}" y="${446 + r * 44}" width="48" height="26" rx="4" fill="#DCEAF7"/>`).join('')).join('')}
      <path d="M10860 640H11060L11040 664H10880Z" fill="${C.navy}"/><rect x="10920" y="664" width="80" height="56" fill="#CFE3F5"/>
      <text x="11080" y="410" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="18" letter-spacing="8" fill="${C.navy}">HOTEL</text>`;
    let petals = '';
    for (let i = 0; i < 34; i++) petals += `<ellipse cx="${(860 + rnd() * 520).toFixed(0)}" cy="${(-40 - rnd() * 360).toFixed(0)}" rx="5" ry="3" fill="${fc[i % 4]}" stroke="#EADBCB" stroke-width=".6"/>`;
    let cruise = '';
    for (let i = 0; i < 12; i++) cruise += cloud(i * 360 + rnd() * 120, 300 + rnd() * 460, .9 + rnd() * 1.1, 1);

    return `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs><linearGradient id="jsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D3E6F8"/><stop offset=".72" stop-color="#F2F8FD"/><stop offset="1" stop-color="#FFF4EA"/></linearGradient></defs>
      <rect x="-2000" y="-1000" width="5600" height="2900" fill="url(#jsky)"/>
      <g id="jFar">${far}</g>
      <rect id="jAlt" x="-2000" y="-1000" width="5600" height="2900" fill="#B9D5F1" opacity="0"/>
      <g id="jSun"><circle cx="1260" cy="200" r="130" fill="#FFF1E6" opacity=".75"/><circle cx="1260" cy="200" r="64" fill="#FFD9B8"/></g>
      <g id="jMid">${mid}</g>
      <g id="jNear">${near}</g>
      <g id="jCruise">${cruise}</g>
      <g id="jTrain">${vTrain('jtr')}</g>
      <g id="jStairs">${vStairs()}</g>
      <g id="jPlane">${vPlane('jpl')}</g>
      <g id="jTaxi">${vTaxi('jtx')}</g>
      <g id="jCoach">${vCoach('jco')}</g>
      <g id="jMpv">${vMpv('jmp')}</g>
      <g id="jNila">${nilaShadow(0, 0, 14)}<g transform="scale(.28) translate(-85 -356)">${nilaRig('nj')}</g></g>
      <!-- Cartoon Characters: Arriving Passenger (Nila with suitcase) & Sahi Travels Welcome Representative -->
      <g id="jPassenger" opacity="0" pointer-events="none">
        <ellipse cx="0" cy="0" rx="20" ry="4" fill="#0F1B33" opacity="0.12"/>
        <g transform="scale(.32) translate(-85 -356)">
          ${nilaRig('np')}
        </g>
      </g>
      <g id="jRepresentative" opacity="0" pointer-events="none">
        <ellipse cx="0" cy="0" rx="20" ry="4" fill="#0F1B33" opacity="0.12"/>
        <g transform="scale(.32) translate(-85 -356)">
          ${repRig()}
        </g>
      </g>
      <g id="jPetals">${petals}</g>
    </svg>`;
  }



  function buildHero() {
    let clouds = '';
    [[110, 210, .55], [300, 150, .7], [190, 330, .45], [340, 420, .6], [90, 470, .4]].forEach(([x, y, s]) => { clouds += cloud(x, y, s, .95, 'h-cloud'); });
    return `<svg viewBox="0 0 560 720" aria-label="Nila, the Sahi Travels guide, standing in front of an aircraft window">
      <defs>
        <linearGradient id="hsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C9DFF6"/><stop offset=".62" stop-color="#EAF3FC"/><stop offset="1" stop-color="#FFEBDA"/></linearGradient>
        <clipPath id="hwin"><rect x="84" y="34" width="392" height="552" rx="172" ry="176"/></clipPath>
      </defs>
      <rect x="62" y="12" width="436" height="596" rx="192" ry="196" fill="#fff" stroke="#E2E8F0" stroke-width="2"/>
      <g clip-path="url(#hwin)">
        <rect x="84" y="34" width="392" height="552" fill="url(#hsky)"/>
        <circle cx="372" cy="176" r="70" fill="#FFF1E4" opacity=".9"/><circle cx="372" cy="176" r="40" fill="#FFD3AE"/>
        ${clouds}
        <path d="M84 540Q170 500 260 520T476 506V586H84Z" fill="#fff" opacity=".9"/>
      </g>
      <rect x="84" y="34" width="392" height="552" rx="172" ry="176" fill="none" stroke="#DDE6F0" stroke-width="2"/>
      <path id="h-path" d="M-60 300C80 60 480 40 640 250" fill="none"/>
      <g class="h-plane"><g transform="translate(-26 -9)"><path d="M2 9Q2 4 8 4H40Q50 5 54 9Q50 13 40 14H8Q2 14 2 9Z" fill="#fff" stroke="#C9D3E0"/><path d="M6 5L1 -4H8L16 5Z" fill="${C.apricot}"/><path d="M22 11L32 11L24 20H18Z" fill="#DCE4EE"/><rect x="14" y="7" width="26" height="2" rx="1" fill="${C.glass}"/></g></g>
      <ellipse cx="280" cy="664" rx="132" ry="11" fill="#0F1B33" opacity=".08"/>
      <g class="h-nila" transform="translate(170 196) scale(1.3)">${nilaRig('nh')}</g>
    </svg>`;
  }

  // `p` must be unique per Nila on the page (it prefixes her gradient ids).
  function buildGuide(p: string = 'ng') {
    return `<svg viewBox="-10 -10 190 380" aria-hidden="true">${nilaShadow()}${nilaRig(p)}</svg>`;
  }

  function buildPassport() {
    let guil = '';
    for (let y = 44; y < 350; y += 16) guil += `<path d="M34 ${y}q20 -7 40 0t40 0t40 0t40 0t40 0t40 0" stroke="#EEF3F9" stroke-width="2" fill="none"/>`;
    let guil2 = '';
    for (let y = 44; y < 350; y += 16) guil2 += `<path d="M294 ${y}q20 -7 40 0t40 0t40 0t40 0t40 0t40 0" stroke="#EEF3F9" stroke-width="2" fill="none"/>`;
    const circleStamp = (code: string, word: string, col: string) => `<circle r="40" fill="none" stroke="${col}" stroke-width="3"/><circle r="32" fill="none" stroke="${col}" stroke-width="1.2" stroke-dasharray="3 3"/><text y="-13" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="7.5" letter-spacing="1.5" fill="${col}">${word}</text><text y="8" text-anchor="middle" font-family="Archivo, sans-serif" font-weight="700" font-size="22" letter-spacing="2" fill="${col}">${code}</text><text y="22" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="6.5" letter-spacing="1.5" fill="${col}">SAHI TRAVELS</text>`;
    const rectStamp = (code: string, word: string, col: string) => `<rect x="-54" y="-30" width="108" height="60" rx="8" fill="none" stroke="${col}" stroke-width="3"/><rect x="-47" y="-23" width="94" height="46" rx="5" fill="none" stroke="${col}" stroke-width="1"/><text y="-8" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="7.5" letter-spacing="1.5" fill="${col}">${word}</text><text y="14" text-anchor="middle" font-family="Archivo, sans-serif" font-weight="700" font-size="20" letter-spacing="2" fill="${col}">${code}</text>`;
    const S = [
      [362, 124, -12, circleStamp('MAA', 'DEPARTED', '#2F4573')],
      [468, 116, 8, rectStamp('DXB', 'ARRIVED', '#B4511C')],
      [352, 228, 6, circleStamp('SIN', 'ARRIVED', '#23796F')],
      [466, 222, -7, rectStamp('KUL', 'ARRIVED', '#7B3F6E')],
      [366, 312, -4, rectStamp('JED', 'ARRIVED', '#2F4573')],
      [472, 310, 11, circleStamp('LHR', 'ARRIVED', '#B4511C')]
    ].map(([x, y, r, art]) => `<g class="stamp" data-rot="${r}" data-x="${x}" data-y="${y}" transform="translate(${x} ${y}) rotate(${r})" opacity="0" style="mix-blend-mode:multiply">${art}</g>`).join('');
    return `<svg viewBox="0 0 560 380" role="img" aria-label="Nila’s open passport. Each press of the button adds a travel stamp.">
      <g class="pp">
        <rect x="10" y="14" width="540" height="352" rx="22" fill="${C.navy}"/>
        <rect x="22" y="22" width="256" height="336" rx="14" fill="#fff"/>
        <rect x="282" y="22" width="256" height="336" rx="14" fill="#fff"/>
        ${guil}${guil2}
        <path d="M280 24V356" stroke="#D5DDE8" stroke-width="2"/>
        <text x="44" y="56" class="pp-l">PASSPORT</text>
        <clipPath id="ppPhoto"><rect x="44" y="72" width="88" height="112" rx="10"/></clipPath>
        <rect x="44" y="72" width="88" height="112" rx="10" fill="#E3EEF9"/>
        <g clip-path="url(#ppPhoto)"><g transform="translate(88 134) scale(2.7)">${miniNila('mini pp-mini')}</g></g>
        <text x="148" y="90" class="pp-l">NAME</text><text x="148" y="107" class="pp-v">NILA</text>
        <text x="148" y="130" class="pp-l">TRAVELS WITH</text><text x="148" y="147" class="pp-v">SAHI TRAVELS</text>
        <text x="148" y="170" class="pp-l">SINCE</text><text x="148" y="187" class="pp-v">2000</text>
        <text x="44" y="216" class="pp-l">OFFICES</text><text x="44" y="233" class="pp-v">CHENNAI · KEELAKARAI</text>
        <text x="44" y="300" class="pp-m">P&lt;SAHI&lt;&lt;NILA&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</text>
        <text x="44" y="320" class="pp-m">MAA2000&lt;&lt;100000&lt;TRAVELLERS&lt;</text>
        <text x="302" y="56" class="pp-l">VISAS · ENTRIES</text>
        ${S}
      </g>
      <g class="stamper" opacity="0"><rect x="-13" y="-98" width="26" height="46" rx="12" fill="#C79A6B"/><rect x="-6" y="-56" width="12" height="20" fill="#A47A50"/><rect x="-34" y="-38" width="68" height="22" rx="6" fill="${C.navy}"/><rect x="-36" y="-18" width="72" height="10" rx="3" fill="#2F4573"/></g>
    </svg>`;
  }

  function buildConvoy() {
    return `<svg viewBox="0 0 1600 330" preserveAspectRatio="xMidYMax slice">
      <rect x="0" y="238" width="1600" height="92" fill="#E8EDF3"/>
      <path d="M0 239H1600" stroke="#DCE3EC" stroke-width="3"/>
      <path d="M0 286H1600" stroke="#fff" stroke-width="5" stroke-dasharray="46 40"/>
      <g id="convoyG">
        <g transform="translate(0 300)">${vMpv('cv1')}</g>
        <g transform="translate(-400 300)">${vTaxi('cv2')}</g>
        <g transform="translate(-800 300)">${vMpv('cv3')}</g>
        <g transform="translate(-1340 300) scale(.8)">${vCoach('cv4')}</g>
      </g>
    </svg>`;
  }

  function buildClapper() {
    let lower = '', upper = '';
    for (let i = 0; i < 7; i++) lower += `<path d="M${40 + i * 40} 98h20l-14 26h-20z" fill="${C.navy}"/>`;
    for (let i = 0; i < 7; i++) upper += `<path d="M${40 + i * 40} 64h20l14 26h-20z" fill="${C.apricot}"/>`;
    return `<svg viewBox="0 0 320 260" aria-hidden="true">
      <rect x="30" y="98" width="260" height="140" rx="14" fill="${C.navy}"/>
      <rect x="30" y="98" width="260" height="26" rx="5" fill="#fff"/>${lower}
      <g class="clap-stick"><rect x="30" y="64" width="260" height="26" rx="5" fill="#fff"/>${upper}</g>
      <circle cx="38" cy="94" r="7" fill="#C9D3E0"/>
      <text x="52" y="156" font-family="IBM Plex Mono, monospace" font-size="13" letter-spacing="3" fill="#fff">SAHI TRAVELS</text>
      <text x="52" y="180" font-family="IBM Plex Mono, monospace" font-size="11" letter-spacing="2" fill="#93A0B8">PRODUCTION TRAVEL</text>
      <text x="52" y="214" font-family="Archivo, sans-serif" font-size="16" style="font-stretch:125%" fill="#FFD9BF">SCENE 01 · TAKE 1</text>
    </svg>`;
  }


export {
  buildJourney,
  buildHero,
  buildGuide,
  buildPassport,
  buildConvoy,
  buildClapper
};
