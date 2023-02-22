let planets = [];
let solarSystemContainer = document.getElementById('solar-system-container');

// SÖKFUNKTION
let headerSearch = document.getElementById('header-search');
headerSearch.addEventListener('input', e => {
    const value = e.target.value.toLowerCase()
    console.log(value);
    planets.forEach(planet => {
        const isVisible = planet.name.includes(value);
        console.log(isVisible)
        planet.classList.toggle("hide", !isVisible);

    })
})



async function getSolaris() {
    let data = await fetch('https://majazocom.github.io/Data/solaris.json');
    planets = await data.json();
    renderSolarisToUI()
}

function renderSolarisToUI() {
    
    planets.map(planet => {
        var solarSystem = document.createElement('section');
        solarSystem.classList.add('solaris');
        solarSystemContainer.appendChild(solarSystem);
        solarSystem.innerHTML += `
        <h2>${planet.name}</h2>
       `

        solarSystem.addEventListener('click', () => {
            openOverlay(planet);
        });

        return {name: planet.name, latinName: planet.latinName}

    });
};

getSolaris()


function openOverlay(planet) {
    console.log(planet.name);
    let overlayEl = document.querySelector('.overlay');
    let closebtn = document.createElement('button');
    closebtn.classList.add('close-btn');
    closebtn.innerHTML = 'X';
    closebtn.addEventListener('click', () => {
        overlayEl.style.display = 'none';
    });
    overlayEl.style.display = 'block';
 
    overlayEl.innerHTML = `
    <section class="modal-heading">
        <h2>${planet.name}</h2>
        <p class="modal-heading-h3">${planet.latinName}</p>
    </section>
    
    <p class="modal-paragraph">${planet.desc}</p>
    <br>
    <article class="modal-short-info">
        <aside>
            <section>
                <h4>OMKRETS</h4>
                <p class="modal-paragraph">${planet.circumference}</p>
            </section>
            <br>
            <h4>MAX TEMERATUR</h4>
            <p class="modal-paragraph">${planet.temp.day}</p>
            </section>
    
            <br>
            <section>
                <h4>MÅNAR</h4>
                <p class="modal-paragraph, overlay-moons">${planet.moons.map((moon) => `${moon}`).join(" | ")}</p>
            </section>
        </aside>
    
        <aside>
            <section>
                <h4>KM FRÅN SOLEN</h4>
                <p class="modal-paragraph">${planet.distance}</p>
            </section>
            <br>
            <h4>MIN TEMERATUR</h4>
            <p class="modal-paragraph">${planet.temp.night}</p>
            </section>
            <br>
        </aside>
    </article>
    <section class="modal-btns">
       <button id="modal-btn-back">FÖREGÅENDE PLANET</button>
       <button id="modal-btn-next">NÄSTA PLANET</button>
     <section>
    `;

    overlayEl.appendChild(closebtn);
}

// function openModal(planet) {
//     solarSystem.innerHTML += `
//     <dialog class="modal" id="modalSun">
//     <button class="modal-close-btn"></button>
//     <section class="modal-heading">
//         <h2>${planet.name}</h2>
//         <p class="modal-heading-h3">${planet.latinName}</p>
//     </section>
    
//     <p class="modal-paragraph">${planet.desc}</p>
//     <br>
//     <article class="modal-short-info">
//         <aside>
//             <section>
//                 <h4>OMKRETS</h4>
//                 <p class="modal-paragraph">${planet.circumference}</p>
//             </section>
//             <br>
//             <h4>MAX TEMERATUR</h4>
//             <p class="modal-paragraph">${planet.temp.day}</p>
//             </section>
    
//             <br>
//             <section>
//                 <h4>MÅNAR</h4>
//                 <p class="modal-paragraph">${planet.moons}</p>
//             </section>
//         </aside>
    
//         <aside>
//             <section>
//                 <h4>KM FRÅN SOLEN</h4>
//                 <p class="modal-paragraph">${planet.distance}</p>
//             </section>
//             <br>
//             <h4>MIN TEMERATUR</h4>
//             <p class="modal-paragraph">${planet.night}</p>
//             </section>
//             <br>
//         </aside>
//     </article>
//     <section class="modal-btns">
//         <button id="modal-btn-back">FÖREGÅENDE PLANET</button>
//         <button id="modal-btn-next">NÄSTA PLANET</button>
//     </section>
//     </dialog>
//     `
// }
