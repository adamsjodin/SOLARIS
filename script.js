
let planets = [];
let solarSystemContainer = document.getElementById('solar-system-container');
let errorMessage = document.querySelector('.error-message')
let searchPlanet = document.getElementById('search-planet');


// HÄMTAR API:et
async function getSolaris() {
    try {
        let data = await fetch('https://majazocom.github.io/Data/solaris.json');
        planets = await data.json();
        renderSolarisToUI(planets)
    } catch (error) {
        console.error(error);
    }
}
getSolaris()

//Sökfunktionen. Misslyckades med att lägga in ett felmeddelande när inte en planet finns. 
searchPlanet.addEventListener('input', e => {
    let value = e.target.value.toLowerCase()
    let planetElements = document.querySelectorAll(".solaris h2")
    planetElements.forEach(planet => {
        var isVisible = planet.innerText.toLowerCase().includes(value);
        planet.classList.toggle("hide", !isVisible);
    })
})

//HÄMTAR planeterna till startsidan
function renderSolarisToUI(planets) {
    planets.forEach(planet => {
        var solarSystem = document.createElement('section');
        solarSystem.classList.add('solaris');
        solarSystemContainer.appendChild(solarSystem);

        solarSystem.innerHTML += `
        <h2>${planet.name}</h2>
       `
            if (planet.name === 'Solen') {
                const sun = document.querySelectorAll('h2')[0];
                sun.classList.add('solar-system--sun');
            }  else if (planet.name === 'Merkurius') {
                const mercury = document.querySelectorAll('h2')[1];
                mercury.classList.add('solar-system--mercury');
            }  else if (planet.name === 'Venus') {
                const venus = document.querySelectorAll('h2')[2];
                venus.classList.add('solar-system--venus');
            }  else if (planet.name === 'Jorden') {
                const earth = document.querySelectorAll('h2')[3];
                earth.classList.add('solar-system--earth');
            } else if (planet.name === 'Mars') {
                const mars = document.querySelectorAll('h2')[4];
                mars.classList.add('solar-system--mars');
            } else if (planet.name === 'Jupiter') {
                const jupiter = document.querySelectorAll('h2')[5];
                jupiter.classList.add('solar-system--jupiter');
            } else if (planet.name === 'Saturnus') {
                const saturn = document.querySelectorAll('h2')[6];
                saturn.classList.add('solar-system--saturn');
            } else if (planet.name === 'Uranus') {
                const uranus = document.querySelectorAll('h2')[7];
                uranus.classList.add('solar-system--uranus');
            } else if (planet.name === 'Neptunus') {
                const neptune = document.querySelectorAll('h2')[8];
                neptune.classList.add('solar-system--neptune');
            } 

            //Öppnar overlayen
            solarSystem.addEventListener('click', () => {
                openOverlay(planet);
            });

    });
};

//En POPUP där all information om planeterna finns
function openOverlay(planet) {
    let overlayEl = document.querySelector('.overlay');
    let closebtn = document.createElement('button');
    closebtn.classList.add('overlay-close-btn');
    closebtn.innerHTML = 'X';
    closebtn.addEventListener('click', () => {
        overlayEl.style.display = 'none';
    });

    overlayEl.style.display = 'block';

    overlayEl.innerHTML = `
    <section class="overlay-heading">
        <h2>${planet.name}</h2>
        <p class="overlay-heading-h3">${planet.latinName}</p>
    </section>
    
    <p class="overlay-paragraph">${planet.desc}</p>
    <br>
    <article class="overlay-short-info">
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
    <section class="overlay-btns">
       <button class="btn-back">FÖREGÅENDE PLANET</button>
       <button class="btn-next">NÄSTA PLANET</button>
     <section>
    `;
    overlayEl.appendChild(closebtn);

    //AKTIVERAR KNAPPARNA I POPUPen så man kan bläddra bland planeterna
    let planetIndex = planets.findIndex(p => p.id === planet.id);

    let nextBtn = document.querySelectorAll('button')[1];
        nextBtn.classList.add('overlay-btn-style')
        nextBtn.addEventListener('click', () => {
            openOverlay(planets[planetIndex + 1]);
        })

    let backBtn = document.querySelectorAll('button')[0];
        backBtn.classList.add('overlay-btn-style')
        backBtn.addEventListener('click', () => {
            openOverlay(planets[planetIndex - 1]);
        })
}


