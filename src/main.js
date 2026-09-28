import * as THREE from 'three';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import './style.css';

const app = document.querySelector('#app');

app.innerHTML = `
  <header class="site-header">
    <a class="brand" href="#top" aria-label="Tau home">τ<span>tau</span></a>
    <nav aria-label="Main navigation">
      <a href="#ecosystem">Ecosystem</a>
      <a href="#experience">Experience</a>
      <a href="#releases">Downloads</a>
      <a href="#built">Built for the curious</a>
    </nav>
    <a class="nav-cta" href="#start">Meet Tau <span aria-hidden="true">↗</span></a>
  </header>

  <main id="top">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow">MUSIC, MADE PHYSICAL</p>
        <h1 id="hero-title">Keep your<br><em>Pocket</em> in tune.</h1>
        <p class="lede">Tau makes the Analogue Pocket feel like your favourite music player—then gives every part of the journey a home.</p>
        <div class="hero-actions">
          <a class="button button-primary" href="#ecosystem">Explore the system <span aria-hidden="true">↓</span></a>
          <button class="text-button" type="button" data-device-action="play" aria-pressed="false">Press play <span aria-hidden="true">→</span></button>
        </div>
      </div>
      <div class="device-stage" aria-label="Interactive 3D Pocket concept">
        <div class="stage-caption"><span class="status-dot"></span><span id="device-status" aria-live="polite">READY / TAP A TO PLAY</span></div>
        <div class="control-strip" id="control-strip" aria-label="Pocket controls">
          <select id="track-select" class="native-control" aria-hidden="true" tabindex="-1">
            <option value="empacotatron">Empacotatron</option>
            <option value="bright">Bright EDM loop</option>
            <option value="city">City loop</option>
            <option value="hyperton">Hyperton</option>
            <option value="plingy">Plingy loop</option>
          </select>
          <select id="meter-select" class="native-control" aria-hidden="true" tabindex="-1">
            <option value="wscope">Winamp scope</option>
            <option value="wbars">Winamp bars</option>
            <option value="chladni">Chladni</option>
          </select>
          <select id="pocket-colour" class="native-control" aria-hidden="true" tabindex="-1">
            <optgroup label="Classic"><option value="black">Black</option><option value="white">White</option><option value="glow">Glow</option><option value="silver">Silver</option></optgroup>
            <optgroup label="Pocket editions"><option value="indigo">Indigo</option><option value="red">Red</option><option value="green">Green</option><option value="blue">Blue</option><option value="yellow">Yellow</option><option value="pink">Pink</option><option value="orange">Orange</option></optgroup>
            <optgroup label="Transparent"><option value="trans_purple">Transparent purple</option><option value="trans_orange">Transparent orange</option><option value="trans_blue">Transparent blue</option><option value="trans_clear">Transparent clear</option><option value="trans_green" selected>Transparent green</option><option value="trans_red">Transparent red</option><option value="trans_smoke">Transparent smoke</option></optgroup>
            <optgroup label="Aluminum"><option value="aluminium_natural">Aluminum natural</option><option value="aluminium_noir">Aluminum noir</option><option value="aluminium_black">Aluminum black</option><option value="aluminium_indigo">Aluminum indigo</option></optgroup>
            <optgroup label="GBC"><option value="gbc_kiwi">GBC kiwi</option><option value="gbc_dandelion">GBC dandelion</option><option value="gbc_teal">GBC teal</option><option value="gbc_grape">GBC grape</option><option value="gbc_berry">GBC berry</option><option value="gbc_gold">GBC gold</option></optgroup>
          </select>
          <select id="render-select" class="native-control" aria-hidden="true" tabindex="-1">
            <option value="studio">Studio fidelity</option>
            <option value="glass">Glass / transmission</option>
            <option value="matte">Soft matte</option>
            <option value="noir">Noir contrast</option>
            <option value="specimen">Specimen wireframe</option>
          </select>
          <select id="light-select" class="native-control" aria-hidden="true" tabindex="-1">
            <option value="gallery">Gallery</option>
            <option value="theme">Follow finish</option>
            <option value="sunset">Sunset</option>
            <option value="midnight">Midnight</option>
            <option value="disco">Disco motion</option>
          </select>
        </div>
        <audio id="tau-audio" preload="metadata" src="./assets/music/empacotatron-loop.ogg"></audio>
        <canvas id="scope-canvas" aria-hidden="true"></canvas>
        <canvas id="pocket-canvas"></canvas>
        <p class="device-hint">Drag to turn · tap a control to try Tau</p>
      </div>
      <div class="hero-footnote">FOR ANALOGUE POCKET<br>AND THE WAY YOU LISTEN.</div>
    </section>

    <section class="ticker" aria-label="Tau features"><span>YOUR LIBRARY</span><i></i><span>YOUR THEMES</span><i></i><span>YOUR POCKET</span><i></i><span>YOUR RULES</span><i></i></section>

    <section class="intro" id="ecosystem" aria-labelledby="intro-title">
      <p class="eyebrow">ONE MUSIC SYSTEM, FOUR WAYS IN</p>
      <h2 id="intro-title">Everything your<br>music needs. <em>Nothing it doesn’t.</em></h2>
      <p>From a first play to a perfectly prepared card, Tau is a small collection of purpose-built tools that keep the attention where it belongs: on the music.</p>
    </section>

    <section class="products" aria-label="Tau products">
      <article class="product-card alpha"><div class="card-top"><span>01</span><span>NOW</span></div><div class="product-mark">τ<sup>α</sup></div><h3>Tau Alpha</h3><p>A focused music player for Pocket. MP3, FLAC, playlists, album art, hardware EQ and live meters—right where your hands are.</p><a href="#experience">Play it your way <span>↗</span></a></article>
      <article class="product-card omega"><div class="card-top"><span>02</span><span>NOW</span></div><div class="product-mark">τ<sup>ω</sup></div><h3>Tau Omega</h3><p>Your calm desktop companion. Build a library, make a plan, sync with confidence and know what is on every card.</p><a href="#omega">Keep it in sync <span>↓</span></a></article>
      <article class="product-card cart"><div class="card-top"><span>03</span><span>IN DEVELOPMENT</span></div><div class="product-mark">τ<sup>+</sup></div><h3>Tau Cart</h3><p>A thoughtful place for the new things your Pocket can become. Discover, choose and keep a collection you actually care about.</p><a href="#start">Follow its arrival <span>↗</span></a></article>
      <article class="product-card themes"><div class="card-top"><span>04</span><span>IN DEVELOPMENT</span></div><div class="product-mark">τ<sup>✦</sup></div><h3>Themes Repository</h3><p>Make Tau unmistakably yours. A living library of visual worlds, from the first boot screen to the last track at night.</p><a href="#start">See the palette <span>↗</span></a></article>
    </section>

    <section class="omega-feature" id="omega" aria-labelledby="omega-title">
      <div class="omega-image"><img src="./assets/tau-omega-card-library.png" alt="Tau Omega desktop app showing its card library, known card and player-core overview"><div class="omega-image-caption"><span>τ<sup>ω</sup></span><span>DESKTOP COMPANION / MAC + WINDOWS</span></div></div>
      <div class="omega-copy">
        <p class="eyebrow">TAU OMEGA / DESKTOP COMPANION</p>
        <h2 id="omega-title">The whole card.<br><em>In clear view.</em></h2>
        <p class="omega-lede">Tau Omega is the calm, local place to prepare a Pocket card. It reads every core, maps every library, and lets you see the exact change before a single file moves.</p>
        <div class="omega-features">
          <article><span>01</span><div><h3>Start with what is there.</h3><p>Open a Pocket card or staging folder. See recognised Tau cores, index health, media roots and the things that need attention.</p></div></article>
          <article><span>02</span><div><h3>Review the plan, then act.</h3><p>Choose music, a destination core and your options. Omega makes the copy plan legible before you confirm it.</p></div></article>
          <article><span>03</span><div><h3>Leave a clean trail.</h3><p>Copies are verified, the library index is built last, and a local report records what happened—without uploading your music.</p></div></article>
        </div>
        <div class="omega-local"><strong>LOCAL BY DEFAULT</strong><span>Sources stay read-only. No card write happens without a reviewed plan.</span></div>
      </div>
    </section>

    <section class="releases" id="releases" aria-labelledby="releases-title">
      <div class="releases-intro"><p class="eyebrow">DOWNLOADS / CURRENT BUILDS</p><h2 id="releases-title">Ready when<br><em>you are.</em></h2><p>Choose the Pocket build that fits your day, then add Tau Omega when you want the whole card in view.</p><span id="release-status" role="status">Checking GitHub for newer builds…</span></div>
      <div class="release-list">
        <article class="release-card alpha-release"><div class="release-heading"><span>τ<sup>α</sup></span><p>FOR ANALOGUE POCKET</p></div><h3>Tau Alpha</h3><p>Music player core for Pocket. Pick the stable build, or the diagnostic companion when you need a closer look.</p><div class="release-version"><span data-alpha-version>v0.5.0</span><span>POCKET CORE</span></div><div class="release-actions"><a class="button button-primary" data-alpha-normal href="./downloads/alfatreze.TAU_0.5.0_2026-09-27.zip" download>Download normal <span>↓</span></a><a class="release-link" data-alpha-diagnostic href="./downloads/alfatreze.TAU_DIAGNOSTIC_0.5.0_2026-09-27.zip" download>Diagnostic build <span>↓</span></a></div></article>
        <article class="release-card omega-release"><div class="release-heading"><span>τ<sup>ω</sup></span><p>FOR DESKTOP</p></div><h3>Tau Omega</h3><p>Local card companion for planning, syncing, verifying and understanding the library your Pocket will see.</p><div class="release-version"><span data-omega-version>v0.3.0</span><span>MACOS / APP ZIP</span></div><div class="release-actions"><a class="button button-outline" data-omega-download href="./downloads/tau-omega_0.3.0_macos-arm64.zip" download>Download Omega <span>↓</span></a><a class="release-link" data-omega-release href="https://github.com/alfatreze/Tau-Omega/releases" target="_blank" rel="noreferrer">All releases <span>↗</span></a></div></article>
      </div>
    </section>

    <section class="experience" id="experience" aria-labelledby="experience-title">
      <div><p class="eyebrow">A SYSTEM THAT STAYS OUT OF THE WAY</p><h2 id="experience-title">The good stuff<br>is <em>immediate.</em></h2></div>
      <div class="experience-list">
        <article><span>01</span><h3>Press play, not setup.</h3><p>Bring a folder. Choose a card. Tau Omega shows the plan before changing a single file.</p></article>
        <article><span>02</span><h3>Hear your whole collection.</h3><p>Browse artists, albums, tracks and playlists on the Pocket—then pick up exactly where you left off.</p></article>
        <article><span>03</span><h3>Make the screen yours.</h3><p>Switch a palette, tune the EQ, choose a meter. Tau is built to feel personal without getting precious.</p></article>
      </div>
    </section>

    <section class="built" id="built" aria-labelledby="built-title">
      <p class="eyebrow">BUILT FOR THE CURIOUS</p>
      <div class="built-grid"><h2 id="built-title">More feeling.<br><em>Less friction.</em></h2><div><p>Tau is a love letter to dedicated listening, but it is not nostalgia software. Under the hood, a RISC-V CPU and FPGA audio path keep playback stable while Tau’s own drawing and meter systems make the little screen feel alive.</p><a class="button button-outline" href="./technical.html">See what makes it tick <span>↗</span></a></div></div>
      <div class="stat-grid"><div><strong>MP3 + FLAC</strong><span>music, straight from your card</span></div><div><strong>11 METERS</strong><span>movement you can feel</span></div><div><strong>LOCAL FIRST</strong><span>your library stays yours</span></div></div>
    </section>

    <section class="closing" id="start"><p class="eyebrow">THIS IS YOUR INVITATION</p><h2>Turn the volume<br><em>toward yourself.</em></h2><a class="button button-primary" href="mailto:hello@tau.system?subject=Tau%20updates">Get Tau updates <span>↗</span></a></section>
  </main>
  <footer><a class="brand" href="#top">τ<span>tau</span></a><span>DESIGNED FOR LISTENING.</span><span>© 2026 TAU</span></footer>
`;

const status = document.querySelector('#device-status');
const releaseStatus = document.querySelector('#release-status');
const updateRelease = (release, product) => {
  if (!release?.assets?.length) return false;
  const assetFor = (pattern) => release.assets.find(asset => pattern.test(asset.name));
  if (product === 'alpha') {
    const normal = assetFor(/TAU_(?!DIAGNOSTIC).*\.zip$/i);
    const diagnostic = assetFor(/TAU_DIAGNOSTIC.*\.zip$/i);
    if (!normal || !diagnostic) return false;
    document.querySelector('[data-alpha-version]').textContent = release.tag_name;
    document.querySelector('[data-alpha-normal]').href = normal.browser_download_url;
    document.querySelector('[data-alpha-diagnostic]').href = diagnostic.browser_download_url;
  } else {
    const app = assetFor(/\.zip$/i);
    if (!app) return false;
    document.querySelector('[data-omega-version]').textContent = release.tag_name;
    document.querySelector('[data-omega-download]').href = app.browser_download_url;
    document.querySelector('[data-omega-release]').href = release.html_url;
  }
  return true;
};
Promise.allSettled([
  fetch('https://api.github.com/repos/alfatreze/Tau-Alpha/releases/latest').then(response => response.ok ? response.json() : Promise.reject(response.status)),
  fetch('https://api.github.com/repos/alfatreze/Tau-Omega/releases/latest').then(response => response.ok ? response.json() : Promise.reject(response.status))
]).then(([alpha, omega]) => {
  const alphaUpdated = alpha.status === 'fulfilled' && updateRelease(alpha.value, 'alpha');
  const omegaUpdated = omega.status === 'fulfilled' && updateRelease(omega.value, 'omega');
  releaseStatus.textContent = alphaUpdated || omegaUpdated ? 'LIVE / GITHUB RELEASE CHECK COMPLETE' : 'LOCAL BUILDS / GITHUB CHECK UNAVAILABLE';
});
const audio = document.querySelector('#tau-audio');
const tracks = {
  empacotatron: { title: 'EMPACOTATRON', artist: 'TAU SIGNALS', collection: 'POCKET TRANSMISSIONS', art: 'orbit', src: '/assets/music/empacotatron-loop.ogg' },
  bright: { title: 'BRIGHT EDM LOOP', artist: 'TAU SIGNALS', collection: 'POCKET TRANSMISSIONS', art: 'sunset', src: '/assets/music/bright-edm-loop.ogg' },
  city: { title: 'CITY LOOP', artist: 'TAU SIGNALS', collection: 'POCKET TRANSMISSIONS', art: 'city', src: '/assets/music/city-loop.mp3' },
  hyperton: { title: 'HYPERTON', artist: 'TAU SIGNALS', collection: 'POCKET TRANSMISSIONS', art: 'prism', src: '/assets/music/hyperton.mp3' },
  plingy: { title: 'PLINGY LOOP', artist: 'TAU SIGNALS', collection: 'POCKET TRANSMISSIONS', art: 'tiles', src: '/assets/music/plingy-loop.ogg' }
};
const trackKeys = Object.keys(tracks);
let currentTrack = tracks.empacotatron;
audio.volume = .72;
let autoAdvance = false;
const scopeCanvas = document.querySelector('#scope-canvas');
const scopeContext = scopeCanvas.getContext('2d');
const playControls = document.querySelectorAll('[data-device-action="play"]');
let audioContext, analyser, audioData, frequencyData;
const scopeSamples = 160;
const smoothedScope = new Float32Array(scopeSamples);
const scopeHistory = [];
const barLevels = new Float32Array(16);
const barPeaks = new Float32Array(16);
let meterMode = 'wscope';
let scopeTint = { r: 157, g: 255, b: 222 };
const initialiseAnalyser = () => {
  if (audioContext) return;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  audioContext = new AudioContextClass();
  analyser = audioContext.createAnalyser();
  analyser.fftSize = 1024;
  analyser.smoothingTimeConstant = .88;
  audioData = new Uint8Array(analyser.frequencyBinCount);
  frequencyData = new Uint8Array(analyser.frequencyBinCount);
  const source = audioContext.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioContext.destination);
};
const actions = {
  browse: ['LIBRARY / ARTISTS · ALBUMS · TRACKS', 'LIBRARY / 7180 TRACKS READY'],
  theme: ['THEME / OCEAN · DARK', 'THEME / TAU · LIGHT']
};
const activeIndex = { browse: 0, theme: 0 };
const updatePlaybackUI = () => {
  const playing = !audio.paused;
  status.textContent = playing ? `PLAYING / ${currentTrack.title}` : 'PAUSED / TAP A TO PLAY';
  playControls.forEach(control => {
    control.setAttribute('aria-pressed', String(playing));
    control.innerHTML = playing ? 'Stop playback <span aria-hidden="true">■</span>' : 'Press play <span aria-hidden="true">→</span>';
  });
};
const togglePlayback = async () => {
  if (audio.paused) {
    try { initialiseAnalyser(); await audioContext.resume(); await audio.play(); }
    catch { status.textContent = 'AUDIO UNAVAILABLE / TRY AGAIN'; return; }
  } else audio.pause();
  updatePlaybackUI();
};
document.addEventListener('click', (event) => {
  const control = event.target.closest('[data-device-action]');
  if (!control) return;
  const key = control.dataset.deviceAction;
  if (key === 'play') togglePlayback();
  else status.textContent = actions[key][activeIndex[key]++ % actions[key].length];
  document.querySelector('.device-stage').classList.add('is-active');
  window.setTimeout(() => document.querySelector('.device-stage').classList.remove('is-active'), 420);
});
document.querySelector('#track-select').addEventListener('change', async (event) => {
  const wasPlaying = !audio.paused || autoAdvance;
  autoAdvance = false;
  currentTrack = tracks[event.target.value];
  audio.src = currentTrack.src; audio.load(); scopeHistory.length = 0; smoothedScope.fill(0);
  if (wasPlaying) {
    try { await audio.play(); updatePlaybackUI(); }
    catch { status.textContent = 'TRACK READY / PRESS PLAY'; }
  } else status.textContent = `TRACK / ${currentTrack.title}`;
});
const changeTrack = (direction) => {
  const currentIndex = trackKeys.indexOf(document.querySelector('#track-select').value);
  const nextIndex = (currentIndex + direction + trackKeys.length) % trackKeys.length;
  const trackSelect = document.querySelector('#track-select');
  trackSelect.value = trackKeys[nextIndex];
  trackSelect.dispatchEvent(new Event('change', { bubbles: true }));
};
const changeVolume = (direction) => {
  audio.volume = Math.min(1, Math.max(0, Math.round((audio.volume + direction * .08) * 100) / 100));
  status.textContent = `VOLUME / ${Math.round(audio.volume * 100)}%`;
};
audio.addEventListener('ended', () => { autoAdvance = true; changeTrack(1); });
audio.addEventListener('loadedmetadata', () => drawPlayerScreen(performance.now()));
const meterLabels = { wscope: 'WINAMP SCOPE', wbars: 'WINAMP BARS', chladni: 'CHLADNI' };
const setMeter = (meter) => {
  meterMode = meter;
  scopeHistory.length = 0;
  barLevels.fill(0); barPeaks.fill(0);
  status.textContent = `METER / ${meterLabels[meterMode]}`;
};
document.querySelector('#meter-select').addEventListener('change', (event) => setMeter(event.target.value));
const cycleMeter = () => {
  const meters = Object.keys(meterLabels);
  const next = meters[(meters.indexOf(meterMode) + 1) % meters.length];
  document.querySelector('#meter-select').value = next;
  setMeter(next);
};

const canvas = document.querySelector('#pocket-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
let renderPixelRatio = 2;
renderer.setPixelRatio(Math.min(window.devicePixelRatio, renderPixelRatio));
renderer.setClearColor(0x000000, 0);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const scene = new THREE.Scene();
const pmremGenerator = new THREE.PMREMGenerator(renderer);
const studioEnvironment = new RoomEnvironment();
scene.environment = pmremGenerator.fromScene(studioEnvironment, .04).texture;
studioEnvironment.dispose();
pmremGenerator.dispose();
const camera = new THREE.PerspectiveCamera(31, 1, 0.1, 100);
camera.position.set(0, 0.45, 15.5);
const pocket = new THREE.Group();
pocket.scale.setScalar(.15);
pocket.rotation.set(-.1, -.52, .04);
scene.add(pocket);
const hemisphereLight = new THREE.HemisphereLight(0xd5fff5, 0x132625, 3.1); scene.add(hemisphereLight);
const keyLight = new THREE.DirectionalLight(0xd9fff6, 6.5); keyLight.position.set(5, 7, 9); keyLight.castShadow = true; scene.add(keyLight);
const rimLight = new THREE.PointLight(0x77ffdb, 75, 35); rimLight.position.set(-5, 4, 5); scene.add(rimLight);
const fillLight = new THREE.PointLight(0x8fa9ff, 24, 32); fillLight.position.set(3, -1, 7); scene.add(fillLight);
const discoLights = [
  new THREE.PointLight(0xff4f9a, 0, 24), new THREE.PointLight(0x6d79ff, 0, 24),
  new THREE.PointLight(0xcaff79, 0, 24), new THREE.PointLight(0xffb45c, 0, 24)
];
discoLights.forEach((light, index) => { light.position.set(Math.cos(index * Math.PI / 2) * 8, 3, Math.sin(index * Math.PI / 2) * 8); scene.add(light); });
const discoTargets = [new THREE.Object3D(), new THREE.Object3D()];
discoTargets.forEach(target => { target.position.set(0, 0, 0); scene.add(target); });
const discoSpots = [
  new THREE.SpotLight(0xb8ccff, 0, 32, Math.PI / 7, .58, 1.35),
  new THREE.SpotLight(0xffcfaa, 0, 32, Math.PI / 7, .58, 1.35)
];
discoSpots.forEach((spot, index) => { spot.target = discoTargets[index]; spot.castShadow = true; spot.shadow.mapSize.set(512, 512); scene.add(spot); });
const discoFog = new THREE.FogExp2(0x05090d, .009);

const shellMaterial = new THREE.MeshPhysicalMaterial({color:0x1f2e2d, roughness:.25, metalness:.36, clearcoat:.42, clearcoatRoughness:.32});
const controlsMaterial = new THREE.MeshPhysicalMaterial({color:0x0b1515, roughness:.26, metalness:.5, clearcoat:.24});
const screenMaterial = new THREE.MeshPhysicalMaterial({color:0x071617, emissive:0x0adabf, emissiveIntensity:.32, roughness:.12, metalness:.1, clearcoat:1, clearcoatRoughness:.1});
const stl = new STLLoader();
const gltf = new GLTFLoader();
const geometries = new Map();
const interactiveMeshes = [];
const getGeometry = (url) => {
  if (!geometries.has(url)) geometries.set(url, stl.loadAsync(url));
  return geometries.get(url);
};
const loadPart = async (url, material, transform = {}, action) => {
  const geometry = await getGeometry(url);
  geometry.computeVertexNormals();
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true; mesh.receiveShadow = true;
  mesh.scale.setScalar(transform.scale ?? .2);
  mesh.rotation.set(...(transform.rotation ?? [-Math.PI / 2, 0, 0]));
  mesh.position.set(...(transform.position ?? [0, 0, 0]));
  (transform.parent ?? pocket).add(mesh);
  if (action) { mesh.userData.action = action; mesh.userData.baseY = mesh.position.y; mesh.userData.press = 0; interactiveMeshes.push(mesh); }
  return mesh;
};

const dpadGroup = new THREE.Group(); dpadGroup.position.set(-4.9,-5.2,1); dpadGroup.rotation.set(Math.PI/2,0,0); pocket.add(dpadGroup);
const faceGroup = new THREE.Group(); faceGroup.position.set(4.9,-5.2,.8); faceGroup.rotation.set(Math.PI/2,Math.PI/4,0); pocket.add(faceGroup);
const bottomGroup = new THREE.Group(); bottomGroup.position.set(0,-11.9,.6); bottomGroup.rotation.set(Math.PI/2,Math.PI/4,0); pocket.add(bottomGroup);
let innerBoard;
let hasScreenTexture = false;
const playerScreen = document.createElement('canvas');
playerScreen.width = 400; playerScreen.height = 360;
const playerContext = playerScreen.getContext('2d');
playerContext.imageSmoothingEnabled = false;
const playerTexture = new THREE.CanvasTexture(playerScreen);
playerTexture.colorSpace = THREE.SRGBColorSpace;
playerTexture.magFilter = THREE.NearestFilter;
playerTexture.minFilter = THREE.NearestFilter;
const screenTime = (seconds) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
const screenAccent = () => `rgb(${scopeTint.r}, ${scopeTint.g}, ${scopeTint.b})`;
const screenPalette = () => {
  const { r, g, b } = scopeTint;
  const luminance = (r * .2126 + g * .7152 + b * .0722) / 255;
  return {
    accent: `rgb(${r}, ${g}, ${b})`,
    soft: `rgba(${r}, ${g}, ${b}, .35)`,
    glow: `rgba(${r}, ${g}, ${b}, .18)`,
    ink: luminance > .7 ? '#07100f' : '#f3faf4',
    muted: luminance > .7 ? '#34504a' : '#a6b7b1'
  };
};
function drawAlbumArt(context, x, y, size, palette) {
  const { accent, soft, glow } = palette;
  context.save();
  context.fillStyle = '#081419'; context.fillRect(x, y, size, size);
  context.strokeStyle = soft; context.lineWidth = 1;
  for (let line = 8; line < size; line += 12) { context.beginPath(); context.moveTo(x, y + line); context.lineTo(x + size, y + line); context.stroke(); }
  context.beginPath(); context.rect(x, y, size, size); context.clip();
  if (currentTrack.art === 'orbit') {
    context.strokeStyle = accent; context.lineWidth = 2;
    [18, 34, 50].forEach((radius, index) => { context.beginPath(); context.ellipse(x + size * .52, y + size * .5, radius, radius * .42, -.42, 0, Math.PI * 2); context.stroke(); if (index === 1) { context.fillStyle = accent; context.fillRect(x + size * .69, y + size * .44, 5, 5); } });
  } else if (currentTrack.art === 'sunset') {
    context.fillStyle = glow; context.fillRect(x, y + size * .52, size, size * .48);
    context.fillStyle = accent; context.beginPath(); context.arc(x + size * .5, y + size * .48, size * .22, 0, Math.PI * 2); context.fill();
    context.strokeStyle = '#071419'; context.lineWidth = 2; for (let line = 0; line < 7; line++) { context.beginPath(); context.moveTo(x, y + size * (.4 + line * .075)); context.lineTo(x + size, y + size * (.82 - line * .025)); context.stroke(); }
  } else if (currentTrack.art === 'city') {
    context.fillStyle = glow; context.fillRect(x, y, size, size);
    context.fillStyle = accent; [12, 30, 46, 67, 82].forEach((left, index) => { const tall = [34, 61, 43, 74, 51][index]; context.fillRect(x + left, y + size - tall - 10, 11, tall); });
    context.fillStyle = '#081419'; for (let row = 0; row < 4; row++) for (let col = 0; col < 4; col++) context.fillRect(x + 15 + col * 17, y + 34 + row * 13, 3, 4);
  } else if (currentTrack.art === 'prism') {
    context.strokeStyle = accent; context.lineWidth = 3; context.beginPath(); context.moveTo(x + size * .5, y + 13); context.lineTo(x + size - 15, y + size - 15); context.lineTo(x + 15, y + size - 15); context.closePath(); context.stroke();
    context.fillStyle = glow; context.beginPath(); context.moveTo(x + size * .5, y + 21); context.lineTo(x + size - 25, y + size - 22); context.lineTo(x + 25, y + size - 22); context.closePath(); context.fill();
  } else {
    context.fillStyle = glow; context.fillRect(x, y, size, size);
    context.fillStyle = accent; for (let row = 0; row < 5; row++) for (let col = 0; col < 5; col++) if ((row + col) % 2 === 0) context.fillRect(x + 9 + col * 20, y + 9 + row * 20, 13, 13);
  }
  context.restore();
  context.strokeStyle = accent; context.lineWidth = 1; context.strokeRect(x + .5, y + .5, size - 1, size - 1);
  context.fillStyle = accent; context.font = '700 8px monospace'; context.fillText('TAU', x + 8, y + size - 8);
}
function drawPlayerMeter(context, time, palette) {
  const { accent, ink } = palette, x = 0, y = 151, width = 400, height = 128;
  const playing = !audio.paused && analyser;
  context.fillStyle = '#000'; context.fillRect(x, y, width, height);
  context.save(); context.beginPath(); context.rect(x, y, width, height); context.clip();
  const level = (index) => playing && frequencyData ? frequencyData[Math.min(frequencyData.length - 1, 5 + index * 11)] / 255 : .18 + .11 * Math.sin(time * .0018 + index * .73);
  if (meterMode === 'wbars') {
    const count = 32, gap = 4, barWidth = (width - 32 - (count - 1) * gap) / count;
    for (let index = 0; index < count; index++) {
      const amount = Math.max(.07, level(index)); const barHeight = amount * 112;
      const left = 16 + index * (barWidth + gap), bottom = y + 122;
      context.fillStyle = '#121c2e'; context.fillRect(left, y + 3, barWidth, 119);
      context.fillStyle = accent; context.fillRect(left, bottom - barHeight, barWidth, barHeight);
      context.fillStyle = ink; context.fillRect(left, bottom - barHeight - 3, barWidth, 2);
    }
  } else if (meterMode === 'chladni') {
    const centreX = width / 2, centreY = y + height / 2, energy = level(3);
    context.strokeStyle = palette.soft; context.lineWidth = 1;
    for (let row = 0; row < 9; row++) { context.beginPath(); context.moveTo(0, y + row * 16); context.lineTo(width, y + row * 16); context.stroke(); }
    context.fillStyle = accent;
    for (let px = 12; px < width; px += 7) for (let py = y + 8; py < y + height; py += 7) {
      const dx = (px - centreX) / width, dy = (py - centreY) / height;
      const field = Math.abs(Math.sin(dx * 29 + time * .0014) * Math.cos(dy * 23 - time * .001) + Math.sin((dx + dy) * 14));
      if (field < .12 + energy * .08) context.fillRect(px, py, 2, 2);
    }
  } else {
    context.strokeStyle = palette.soft; context.lineWidth = 1;
    for (let gx = 0; gx <= width; gx += 32) { context.beginPath(); context.moveTo(gx, y); context.lineTo(gx, y + height); context.stroke(); }
    for (let gy = y; gy <= y + height; gy += 16) { context.beginPath(); context.moveTo(0, gy); context.lineTo(width, gy); context.stroke(); }
    context.beginPath();
    for (let index = 0; index <= 120; index++) {
      const ratio = index / 120, wave = playing && audioData ? (audioData[Math.floor(ratio * (audioData.length - 1))] - 128) / 128 : Math.sin(ratio * Math.PI * 4 + time * .003) * .48 + Math.sin(ratio * Math.PI * 15 - time * .0014) * .12;
      const px = ratio * width, py = y + height / 2 + wave * height * .38;
      index ? context.lineTo(px, py) : context.moveTo(px, py);
    }
    context.strokeStyle = accent; context.lineWidth = 2; context.shadowColor = accent; context.shadowBlur = 8; context.stroke(); context.shadowBlur = 0;
  }
  context.restore();
}
function drawPlayerScreen(time) {
  const context = playerContext, palette = screenPalette(), { accent, ink, muted } = palette, playing = !audio.paused;
  const width = playerScreen.width, height = playerScreen.height;
  context.fillStyle = '#050811'; context.fillRect(0, 0, width, height);
  context.strokeStyle = palette.soft; context.globalAlpha = .2; context.lineWidth = 1;
  for (let x = 0; x <= width; x += 32) { context.beginPath(); context.moveTo(x, 0); context.lineTo(x, height); context.stroke(); }
  for (let y = 0; y <= height; y += 40) { context.beginPath(); context.moveTo(0, y); context.lineTo(width, y); context.stroke(); }
  context.globalAlpha = 1;
  drawAlbumArt(context, 8, 8, 128, palette);
  context.fillStyle = 'rgba(50, 69, 23, .95)'; context.beginPath(); context.roundRect(152, 8, 44, 22, 8); context.fill();
  context.fillStyle = accent; context.font = '700 9px monospace'; context.fillText('TAU', 163, 22);
  context.fillStyle = ink; context.font = '700 20px monospace'; context.fillText(currentTrack.title, 152, 62);
  context.fillStyle = accent; context.font = '700 12px monospace'; context.fillText(currentTrack.artist, 152, 84);
  context.fillStyle = muted; context.font = '12px monospace'; context.fillText(currentTrack.collection, 152, 105);
  context.fillStyle = muted; context.font = '9px monospace'; context.fillText(playing ? 'PLAYING' : 'PAUSED', 152, 129);
  drawPlayerMeter(context, time, palette);
  const duration = Number.isFinite(audio.duration) ? audio.duration : 0, elapsed = audio.currentTime, progress = duration ? Math.min(1, elapsed / duration) : 0;
  context.fillStyle = '#121c2e'; context.fillRect(0, 292, width, 8); context.fillStyle = accent; context.fillRect(0, 292, width * progress, 8);
  context.fillStyle = accent; context.font = '700 11px monospace'; context.fillText(screenTime(elapsed), 16, 319);
  context.fillStyle = ink; context.fillText(`${String(trackKeys.indexOf(document.querySelector('#track-select').value) + 1).padStart(2, '0')} / 05`, 178, 319); context.fillText(duration ? screenTime(duration) : '--:--', 344, 319);
  context.fillStyle = '#121c2e'; context.fillRect(0, 332, width, 28);
  context.fillStyle = accent; context.font = '700 10px monospace'; context.fillText(playing ? '▶ PLAYING' : '■ STOPPED', 16, 350);
  context.fillStyle = muted; context.fillText(`X ${meterLabels[meterMode]}   ↑↓ VOL`, 144, 350);
  playerTexture.needsUpdate = true;
}

Promise.all([
  loadPart('/assets/pocket-sync/front.stl', shellMaterial, {rotation:[0, Math.PI, 0], position:[0,0,1.05]}),
  loadPart('/assets/pocket-sync/back.stl', shellMaterial, {rotation:[0,0,0], position:[0,0,-1.66]}),
  loadPart('/assets/pocket-sync/dpad.stl', controlsMaterial, {parent:dpadGroup, rotation:[-Math.PI/2,0,0]}, 'browse'),
  ...[[[1.25,0,1.25],'play'],[[-1.25,0,1.25],'meters']].map(([position, action]) => loadPart('/assets/pocket-sync/convex-button.stl', controlsMaterial, {parent:faceGroup, position, rotation:[-Math.PI/2,0,0]}, action)),
  ...[[[-1.25,0,-1.25],'meters'],[[1.25,0,-1.25],'theme']].map(([position, action]) => loadPart('/assets/pocket-sync/concave-button.stl', controlsMaterial, {parent:faceGroup, position, rotation:[-Math.PI/2,0,0]}, action)),
  loadPart('/assets/pocket-sync/shoulder-button.stl', controlsMaterial, {position:[-7.3,2.8,-2.6], scale:.2, rotation:[-Math.PI/2,0,0]}),
  loadPart('/assets/pocket-sync/shoulder-button.stl', controlsMaterial, {position:[7.3,2.8,-2.6], scale:.2, rotation:[-Math.PI/2,0,Math.PI]}),
  loadPart('/assets/pocket-sync/power-button.stl', controlsMaterial, {position:[-8.3,5.678,-.07], scale:.2, rotation:[0,Math.PI/2,0]}),
  loadPart('/assets/pocket-sync/volume-button.stl', controlsMaterial, {position:[-8.35,8.1,-.07], scale:.2, rotation:[0,-Math.PI/2,0]}),
]).then(async () => {
  const screenMask = await new THREE.TextureLoader().loadAsync('/assets/pocket-sync/screen-alpha.png');
  const screenGlass = new THREE.Mesh(new THREE.PlaneGeometry(17.25,15.95), new THREE.MeshPhysicalMaterial({color:0x030708, alphaMap:screenMask, alphaTest:.5, clearcoat:1, clearcoatRoughness:.55, reflectivity:.3}));
  screenGlass.position.set(0,6.8,1.1); pocket.add(screenGlass);
  drawPlayerScreen(0);
  screenMaterial.map = playerTexture; screenMaterial.emissiveMap = playerTexture; screenMaterial.color.set('#ffffff'); screenMaterial.emissive.set('#ffffff'); screenMaterial.emissiveIntensity = .18; screenMaterial.needsUpdate = true;
  hasScreenTexture = true;
  const display = new THREE.Mesh(new THREE.PlaneGeometry(160/11.5,140/11.5), screenMaterial);
  display.position.set(0,7,1.2); pocket.add(display);
  [[1.25,0,1.25],[0,0,0],[-1.25,0,-1.25]].forEach((position, index) => { const button = new THREE.Mesh(new THREE.CylinderGeometry(.58,.58,1.55,12), controlsMaterial); button.position.set(...position); button.userData.action = ['previous', 'play', 'next'][index]; button.userData.baseY = button.position.y; button.userData.press = 0; interactiveMeshes.push(button); bottomGroup.add(button); });
});

const pocketSyncColours = {
  black:'#000000',white:'#f5f5f5',glow:'#a3c38a',indigo:'#504c89',red:'#872b2a',green:'#068a64',blue:'#445a99',yellow:'#e3af2d',pink:'#ee8db7',orange:'#ec9f4a',silver:'#d0cdcc',
  trans_purple:'#cdaffa',trans_orange:'#c8820a',trans_clear:'#dcdcdc',trans_smoke:'#787878',trans_red:'#eb5a5a',trans_blue:'#6e64ff',trans_green:'#6eff6e',
  aluminium_natural:'#b4b9b9',aluminium_noir:'#414141',aluminium_black:'#141414',aluminium_indigo:'#46418b',
  gbc_kiwi:'#78970c',gbc_dandelion:'#f5a930',gbc_teal:'#00666d',gbc_grape:'#47327b',gbc_berry:'#7f1f39',gbc_gold:'#a4a383'
};
const controlMetadata = {
  'track-select': { label: 'TRACK', icon: '<svg viewBox="0 0 18 18"><path d="M7 13.5a2.5 2.5 0 1 1-1.5-2.3V5l8-1.5v7a2.5 2.5 0 1 1-1.5-2.3V2.3L5.5 3.5v7.7A2.5 2.5 0 0 1 7 13.5Z"/></svg>' },
  'meter-select': { label: 'METER', icon: '<svg viewBox="0 0 18 18"><path d="M1.5 9h2l1.7-4 3.1 8 2.5-6 1.7 2h4"/></svg>' },
  'pocket-colour': { label: 'COLOUR', icon: '<svg viewBox="0 0 18 18"><circle cx="9" cy="9" r="5.5"/></svg>' },
  'render-select': { label: 'RENDER', icon: '<svg viewBox="0 0 18 18"><path d="m9 2.5 5.5 3.2v6.6L9 15.5l-5.5-3.2V5.7L9 2.5Zm0 0v6.4m5.5-3.2L9 8.9 3.5 5.7"/></svg>' },
  'light-select': { label: 'LIGHT', icon: '<svg viewBox="0 0 18 18"><path d="M9 2.2v2.1M9 13.7v2.1M2.2 9h2.1m9.4 0h2.1M4.2 4.2l1.5 1.5m6.6 6.6 1.5 1.5m0-9.6-1.5 1.5m-6.6 6.6-1.5 1.5"/><circle cx="9" cy="9" r="2.5"/></svg>' }
};
const mountCustomControls = () => {
  const strip = document.querySelector('#control-strip');
  Object.entries(controlMetadata).forEach(([id, metadata]) => {
    const select = document.querySelector(`#${id}`);
    const details = document.createElement('details'); details.className = `control-menu control-${id.replace('-select', '')}`;
    const summary = document.createElement('summary');
    summary.innerHTML = `<span class="control-name">${metadata.icon}<span>${metadata.label}</span></span><span class="control-value"></span><span class="control-chevron" aria-hidden="true">⌄</span>`;
    const panel = document.createElement('div'); panel.className = 'control-options'; panel.setAttribute('role', 'listbox'); panel.setAttribute('aria-label', metadata.label);
    Array.from(select.children).forEach(groupOrOption => {
      const options = groupOrOption.tagName === 'OPTGROUP' ? Array.from(groupOrOption.children) : [groupOrOption];
      if (groupOrOption.tagName === 'OPTGROUP') { const group = document.createElement('span'); group.className = 'control-group'; group.textContent = groupOrOption.label; panel.append(group); }
      options.forEach(option => {
        const choice = document.createElement('button'); choice.type = 'button'; choice.className = 'control-option'; choice.dataset.value = option.value; choice.setAttribute('role', 'option');
        const swatch = id === 'pocket-colour' ? `<i class="colour-swatch" style="--swatch:${pocketSyncColours[option.value]}"></i>` : '';
        choice.innerHTML = `${swatch}<span>${option.textContent}</span><b aria-hidden="true">✓</b>`;
        choice.addEventListener('click', () => { select.value = option.value; select.dispatchEvent(new Event('change', { bubbles: true })); details.open = false; summary.focus(); });
        panel.append(choice);
      });
    });
    const update = () => {
      const selected = select.options[select.selectedIndex];
      summary.querySelector('.control-value').textContent = selected.textContent;
      summary.style.setProperty('--selected-colour', id === 'pocket-colour' ? pocketSyncColours[selected.value] : 'transparent');
      panel.querySelectorAll('.control-option').forEach(option => { const chosen = option.dataset.value === select.value; option.classList.toggle('is-selected', chosen); option.setAttribute('aria-selected', String(chosen)); });
    };
    select.addEventListener('change', update); update();
    details.append(summary, panel); strip.append(details);
  });
};
mountCustomControls();
let renderMode = 'studio';
let lightingMode = 'gallery';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const materialMeshes = () => [shellMaterial, controlsMaterial, screenMaterial];
const applyRenderMode = (quiet = false) => {
  const modes = {
    studio: { pixelRatio: 2, tone: THREE.ACESFilmicToneMapping, exposure: 1.05, shadows: true, shadowType: THREE.PCFSoftShadowMap, shellRoughness: .3, controlRoughness: .28, clearcoat: .3, wireframe: false },
    glass: { pixelRatio: 2, tone: THREE.ACESFilmicToneMapping, exposure: 1.22, shadows: true, shadowType: THREE.PCFSoftShadowMap, shellRoughness: .14, controlRoughness: .16, clearcoat: .8, wireframe: false },
    matte: { pixelRatio: 1.5, tone: THREE.ACESFilmicToneMapping, exposure: .91, shadows: true, shadowType: THREE.PCFSoftShadowMap, shellRoughness: .62, controlRoughness: .55, clearcoat: .04, wireframe: false },
    noir: { pixelRatio: 2, tone: THREE.ReinhardToneMapping, exposure: .72, shadows: true, shadowType: THREE.PCFSoftShadowMap, shellRoughness: .24, controlRoughness: .2, clearcoat: .48, wireframe: false },
    specimen: { pixelRatio: 1.25, tone: THREE.NoToneMapping, exposure: 1, shadows: false, shadowType: THREE.BasicShadowMap, shellRoughness: .45, controlRoughness: .42, clearcoat: 0, wireframe: true }
  };
  const mode = modes[renderMode];
  renderPixelRatio = mode.pixelRatio;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, renderPixelRatio));
  renderer.toneMapping = mode.tone; renderer.toneMappingExposure = mode.exposure;
  renderer.shadowMap.enabled = mode.shadows; renderer.shadowMap.type = mode.shadowType;
  shellMaterial.roughness = mode.shellRoughness; controlsMaterial.roughness = mode.controlRoughness;
  shellMaterial.clearcoat = controlsMaterial.clearcoat = mode.clearcoat;
  [shellMaterial, controlsMaterial].forEach(material => { material.wireframe = mode.wireframe; material.needsUpdate = true; });
  if (!quiet) status.textContent = `RENDER / ${renderMode.replaceAll('_', ' ').toUpperCase()}`;
};
const setLight = (light, color, intensity, position) => { light.color.set(color); light.intensity = intensity; light.position.set(...position); };
const applyLightingMode = (quiet = false) => {
  discoLights.forEach(light => { light.intensity = 0; });
  discoSpots.forEach(spot => { spot.intensity = 0; });
  scene.fog = null;
  if (lightingMode === 'gallery') {
    hemisphereLight.color.set('#d5fff5'); hemisphereLight.groundColor.set('#132625'); hemisphereLight.intensity = 3.1;
    setLight(keyLight, '#d9fff6', 6.5, [5, 7, 9]); setLight(rimLight, '#77ffdb', 75, [-5, 4, 5]); setLight(fillLight, '#8fa9ff', 24, [3, -1, 7]);
  } else if (lightingMode === 'theme') {
    const finish = new THREE.Color(pocketSyncColours[document.querySelector('#pocket-colour').value]);
    const opposite = finish.clone().offsetHSL(.5, 0, .1);
    hemisphereLight.color.copy(finish).lerp(new THREE.Color('#ffffff'), .35); hemisphereLight.groundColor.copy(finish).multiplyScalar(.11); hemisphereLight.intensity = 2.6;
    setLight(keyLight, finish.clone().lerp(new THREE.Color('#ffffff'), .42), 6.8, [5, 7, 9]); setLight(rimLight, opposite, 72, [-5, 4, 5]); setLight(fillLight, finish, 32, [3, -1, 7]);
  } else if (lightingMode === 'sunset') {
    hemisphereLight.color.set('#ffd4a8'); hemisphereLight.groundColor.set('#211019'); hemisphereLight.intensity = 2.5;
    setLight(keyLight, '#ffe1bc', 7.4, [6, 5, 8]); setLight(rimLight, '#ff4f9a', 68, [-6, 2, 3]); setLight(fillLight, '#754bff', 20, [1, -2, 7]);
  } else if (lightingMode === 'midnight') {
    hemisphereLight.color.set('#9db9ff'); hemisphereLight.groundColor.set('#050a18'); hemisphereLight.intensity = 1.35;
    setLight(keyLight, '#b8cbff', 3.8, [3, 8, 7]); setLight(rimLight, '#3e6aff', 95, [-4, 3, 4]); setLight(fillLight, '#281d6e', 32, [4, -1, 6]);
  } else {
    hemisphereLight.color.set('#111827'); hemisphereLight.groundColor.set('#030407'); hemisphereLight.intensity = .8;
    setLight(keyLight, '#e6efff', 2.3, [4, 7, 8]); setLight(rimLight, '#ffffff', 18, [-5, 4, 5]); setLight(fillLight, '#182132', 10, [3, -1, 7]);
    scene.fog = discoFog;
    discoLights.forEach(light => { light.intensity = reducedMotion ? 18 : 6; });
    discoSpots.forEach(spot => { spot.intensity = reducedMotion ? 16 : 4; });
  }
  if (!quiet) status.textContent = `LIGHT / ${lightingMode === 'disco' ? 'DISCO STROBE + FOG' : lightingMode.toUpperCase()}`;
};
const applyPocketColour = async (colour, quiet = false) => {
  const isTransparent = colour.startsWith('trans_'); const isAluminium = colour.startsWith('aluminium_');
  const configureFinish = (material) => {
    material.color.set(pocketSyncColours[colour]); material.emissive.set(pocketSyncColours[colour]); material.emissiveIntensity = colour === 'glow' ? .7 : 0;
    // Use Three's transmission path for Pocket shells. Mixing that path with
    // ordinary alpha blending makes the front/back STL shells sort differently
    // as the model turns, which is the source of the crawling transparent edges.
    material.transmission = isTransparent ? .92 : 0; material.transparent = false; material.opacity = 1; material.ior = isAluminium ? 1.36 : 1.46;
    material.metalness = isAluminium ? 1 : colour === 'silver' ? .8 : 0;
    material.roughness = isTransparent ? (colour === 'trans_green' ? .22 : .16) : isAluminium ? .5 : .3;
    material.clearcoat = isTransparent ? .65 : isAluminium ? 0 : .25; material.clearcoatRoughness = isTransparent ? .24 : .5;
    material.thickness = isTransparent ? .65 : 0; material.envMapIntensity = isAluminium ? 1 : isTransparent ? .8 : .5; material.needsUpdate = true;
  };
  configureFinish(shellMaterial); configureFinish(controlsMaterial);
  const tint = new THREE.Color(pocketSyncColours[colour]);
  scopeTint = { r: Math.round(tint.r * 255), g: Math.round(tint.g * 255), b: Math.round(tint.b * 255) };
  if (!hasScreenTexture) { screenMaterial.color.set('#ffffff'); screenMaterial.emissive.set('#ffffff'); } screenMaterial.emissiveIntensity = hasScreenTexture ? .18 : .24;
  if (isTransparent && !innerBoard) { const model = await gltf.loadAsync('/assets/pocket-sync-board.glb'); innerBoard = model.scene; innerBoard.scale.set(6,6,6); innerBoard.rotation.set(Math.PI/2,0,0); innerBoard.position.set(0,-.1,-.4); pocket.add(innerBoard); }
  if (innerBoard) innerBoard.visible = isTransparent;
  document.querySelector('#pocket-colour').value = colour;
  applyRenderMode(true); applyLightingMode(true);
  if (!quiet) status.textContent = `FINISH / ${colour.replaceAll('_',' ').toUpperCase()}`;
};
document.querySelector('#pocket-colour').addEventListener('change', (event) => applyPocketColour(event.target.value));
document.querySelector('#render-select').addEventListener('change', (event) => { renderMode = event.target.value; applyRenderMode(); });
document.querySelector('#light-select').addEventListener('change', (event) => { lightingMode = event.target.value; applyLightingMode(); });
applyRenderMode(true); applyLightingMode(true);
applyPocketColour('trans_green', true);

const raycaster = new THREE.Raycaster(); const pointer = new THREE.Vector2();
let dragging = false, previousX = 0, dragDistance = 0, targetRotation = -.52;
const dpadPress = { x: 0, y: 0, amount: 0 };
const triggerPress = (mesh, event) => {
  mesh.userData.press = 1;
  if (mesh.userData.action !== 'browse') return;
  const bounds = canvas.getBoundingClientRect();
  const origin = dpadGroup.getWorldPosition(new THREE.Vector3()).project(camera);
  const centreX = bounds.left + (origin.x + 1) * bounds.width / 2;
  const centreY = bounds.top + (-origin.y + 1) * bounds.height / 2;
  const dx = event.clientX - centreX, dy = event.clientY - centreY;
  const magnitude = Math.max(1, Math.hypot(dx, dy));
  dpadPress.x = dx / magnitude; dpadPress.y = dy / magnitude; dpadPress.amount = 1;
  const direction = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'RIGHT' : 'LEFT') : (dy > 0 ? 'DOWN' : 'UP');
  if (direction === 'LEFT') changeTrack(-1);
  else if (direction === 'RIGHT') changeTrack(1);
  else changeVolume(direction === 'UP' ? 1 : -1);
};
canvas.addEventListener('pointerdown', (event) => { dragging=true; previousX=event.clientX; dragDistance=0; canvas.setPointerCapture(event.pointerId); });
canvas.addEventListener('pointermove', (event) => { if(dragging){ targetRotation += (event.clientX - previousX) * .012; previousX = event.clientX; }});
canvas.addEventListener('pointermove', (event) => { if(dragging) dragDistance += Math.abs(event.movementX); });
canvas.addEventListener('pointerup', (event) => { dragging=false; if(dragDistance > 7) return; const bounds = canvas.getBoundingClientRect(); pointer.set(((event.clientX-bounds.left)/bounds.width)*2-1, -((event.clientY-bounds.top)/bounds.height)*2+1); raycaster.setFromCamera(pointer,camera); const hit = raycaster.intersectObjects(interactiveMeshes,false)[0]; if(hit?.object.userData.action){ const key=hit.object.userData.action; triggerPress(hit.object, event); if(key === 'play') togglePlayback(); else if(key === 'previous') changeTrack(-1); else if(key === 'next') changeTrack(1); else if(key === 'meters') cycleMeter(); else if(key !== 'browse') status.textContent = actions[key][activeIndex[key]++ % actions[key].length]; }});
function resize(){ const rect=canvas.getBoundingClientRect(); renderer.setSize(rect.width,rect.height,false); camera.aspect=rect.width/rect.height; camera.updateProjectionMatrix(); const dpr=Math.min(window.devicePixelRatio,2); scopeCanvas.width=Math.round(rect.width*dpr); scopeCanvas.height=Math.round(rect.height*dpr); scopeContext.setTransform(dpr,0,0,dpr,0,0); }
window.addEventListener('resize',resize); resize();
function drawMirroredBars(time, width, height, playing, energy, r, g, b) {
  const baseline = height * .79;
  const top = height * .24;
  const usableHeight = baseline - top;
  const centreX = width * .5;
  const step = Math.min(width / 26, 31);
  const barWidth = Math.max(3, step * .54);
  scopeContext.strokeStyle = `rgba(${r}, ${g}, ${b}, .065)`;
  scopeContext.lineWidth = 1;
  for (let x = centreX % step; x <= width; x += step * 2) { scopeContext.beginPath(); scopeContext.moveTo(x, top); scopeContext.lineTo(x, baseline); scopeContext.stroke(); }
  for (let y = top; y <= baseline; y += usableHeight / 6) { scopeContext.beginPath(); scopeContext.moveTo(0, y); scopeContext.lineTo(width, y); scopeContext.stroke(); }
  const bandCount = barLevels.length;
  for (let index = 0; index < bandCount; index++) {
    let target;
    if (playing) {
      const start = Math.floor(Math.pow(index / bandCount, 1.9) * (frequencyData.length - 1));
      const end = Math.max(start + 1, Math.floor(Math.pow((index + 1) / bandCount, 1.9) * (frequencyData.length - 1)));
      let total = 0;
      for (let bin = start; bin <= end; bin++) total += frequencyData[bin] / 255;
      target = total / (end - start + 1);
    } else target = .08 + (Math.sin(time * .0011 + index * .61) + Math.sin(time * .00047 + index * 1.77) + 2) * .055;
    const rise = .34, fall = .055;
    barLevels[index] += (target - barLevels[index]) * (target > barLevels[index] ? rise : fall);
    barPeaks[index] = Math.max(barLevels[index], barPeaks[index] - .009);
    const barHeight = Math.max(3, barLevels[index] * usableHeight * (playing ? 1.28 : .9));
    const peakY = baseline - Math.min(usableHeight, barPeaks[index] * usableHeight * (playing ? 1.28 : .9));
    const leftX = centreX - (index + 1) * step + (step - barWidth) / 2;
    const rightX = centreX + index * step + (step - barWidth) / 2;
    const alpha = playing ? .13 + Math.min(.17, energy * .16) : .1;
    const fill = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    scopeContext.fillStyle = fill;
    scopeContext.fillRect(leftX, baseline - barHeight, barWidth, barHeight);
    scopeContext.fillRect(rightX, baseline - barHeight, barWidth, barHeight);
    scopeContext.fillStyle = `rgba(${r}, ${g}, ${b}, ${playing ? .42 : .2})`;
    scopeContext.fillRect(leftX, peakY, barWidth, 1.5);
    scopeContext.fillRect(rightX, peakY, barWidth, 1.5);
  }
}
function drawScope(time) {
  const width = scopeCanvas.clientWidth, height = scopeCanvas.clientHeight;
  if (!width || !height) return;
  scopeContext.clearRect(0, 0, width, height);
  const playing = !audio.paused && analyser;
  let energy = .18;
  if (playing) {
    analyser.getByteTimeDomainData(audioData); analyser.getByteFrequencyData(frequencyData);
    for (let i=0; i<18; i++) energy += frequencyData[i] / 255;
    energy /= 19;
    for (let i=0; i<scopeSamples; i++) {
      const sourceIndex = Math.floor(i / (scopeSamples - 1) * (audioData.length - 1));
      const target = (audioData[sourceIndex] - 128) / 128;
      smoothedScope[i] += (target - smoothedScope[i]) * .13;
    }
    scopeHistory.unshift(Array.from(smoothedScope));
    if (scopeHistory.length > 5) scopeHistory.pop();
  }
  const centreY = height * .52, amplitude = playing ? height * (.17 + energy * .18) : height * .19;
  const hueShift = playing ? Math.min(1, energy * 1.7) : .32 + Math.sin(time * .00024) * .14;
  const r = Math.round(scopeTint.r + (205 - scopeTint.r) * hueShift), g = Math.round(scopeTint.g + (255 - scopeTint.g) * hueShift), b = Math.round(scopeTint.b + (118 - scopeTint.b) * hueShift);
  if (meterMode === 'wbars') {
    drawMirroredBars(time, width, height, playing, energy, r, g, b);
    return;
  }
  scopeContext.strokeStyle = `rgba(${r}, ${g}, ${b}, .09)`; scopeContext.lineWidth = 1;
  for (let x = 0; x <= width; x += width / 12) { scopeContext.beginPath(); scopeContext.moveTo(x, height * .18); scopeContext.lineTo(x, height * .84); scopeContext.stroke(); }
  for (let y = height * .2; y <= height * .8; y += height / 10) { scopeContext.beginPath(); scopeContext.moveTo(0, y); scopeContext.lineTo(width, y); scopeContext.stroke(); }
  const drawTrace = (samples, alpha, scale = 1) => {
    scopeContext.beginPath();
    for (let i=0; i<scopeSamples; i++) {
      const progress = i / (scopeSamples - 1), x = progress * width;
      const idle = Math.sin(progress * Math.PI * (2.4 + Math.sin(time * .00015)) + time * .00078) * .63 + Math.sin(progress * Math.PI * 8 + time * .00039) * .18;
      const sample = playing ? samples[i] * 2.35 : idle;
      const y = centreY + sample * amplitude * scale;
      i ? scopeContext.lineTo(x, y) : scopeContext.moveTo(x, y);
    }
    scopeContext.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`; scopeContext.stroke();
  };
  scopeContext.lineWidth = 1.1;
  if (playing) scopeHistory.slice().reverse().forEach((trace, index) => drawTrace(trace, .045 + index * .035, 1 + index * .025));
  else { drawTrace(smoothedScope, .16, .68); drawTrace(smoothedScope, .1, -.44); }
  scopeContext.lineWidth = playing ? 2.1 : 1.45;
  scopeContext.shadowColor = `rgba(${r}, ${g}, ${b}, .9)`;
  scopeContext.shadowBlur = playing ? 19 + energy * 26 : 12;
  drawTrace(smoothedScope, playing ? .8 : .48);
  scopeContext.shadowBlur = 0;
}
function animate(time){
  if (lightingMode === 'disco' && !reducedMotion) {
    const orbit = time * .00072;
    const strobe = Math.pow(Math.max(0, Math.sin(time * .014)), 12);
    const crossLight = .18 + strobe * .82;
    discoLights.forEach((light, index) => {
      const phase = orbit + index * Math.PI / 2;
      light.position.set(Math.cos(phase) * 9, 2.8 + Math.sin(phase * 1.9) * 3.6, Math.sin(phase) * 8 + 5);
      light.intensity = 5 + crossLight * (index % 2 ? 68 : 54);
    });
    discoTargets[0].position.set(Math.sin(orbit * 1.8) * 2.1, -.35, 0);
    discoTargets[1].position.set(-Math.cos(orbit * 1.5) * 2.1, .4, 0);
    discoSpots[0].position.set(-9 + Math.sin(orbit) * 2, 10, 8);
    discoSpots[1].position.set(9 + Math.cos(orbit * 1.15) * 2, 8, 7);
    discoSpots[0].intensity = 4 + crossLight * 42;
    discoSpots[1].intensity = 4 + crossLight * 36;
  }
  pocket.rotation.y += (targetRotation-pocket.rotation.y)*.065; pocket.rotation.x = -.1 + Math.sin(time*.00045)*.015; pocket.position.y = Math.sin(time*.001)*.3;
  interactiveMeshes.forEach(mesh => { mesh.userData.press *= .78; mesh.position.y = mesh.userData.baseY - mesh.userData.press * .42; });
  dpadPress.amount *= .8; dpadGroup.rotation.x = Math.PI / 2 + dpadPress.y * dpadPress.amount * .13; dpadGroup.rotation.z = -dpadPress.x * dpadPress.amount * .13;
  drawScope(time); drawPlayerScreen(time); renderer.render(scene,camera); requestAnimationFrame(animate);
} requestAnimationFrame(animate);
