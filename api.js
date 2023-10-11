const cont_pk = document.querySelector(".cont-pk")
const box = document.querySelectorAll(".box")
const fondo = document.querySelector(".fondo")
const detalles = document.querySelector(".detalles")

const f_sgt = document.querySelector(".flecha-sgt")
const f_ant = document.querySelector(".flecha-ant")


fondo.style.display = 'none'
detalles.style.display = 'none'

// vi_of y vi_limit valor offset y limite que este va a ir amuentando de 5 en 5
let vi_of = 0;
let vi_lmt = 5;

function cargarApi (apip){
    fetch(apip)
    .then((response) => response.json())
    .then((data) => {
        data.results.forEach((datos) => {
            const box = document.createElement('div');
            box.className = 'box';
            cont_pk.appendChild(box);

            //fetch imagen principal
            fetch(datos.url)
                .then((response) => response.json())
                .then((dimgs) => {
                    const dt_imgs = dimgs.sprites.front_default

                    const img = document.createElement('img');
                    img.src = dt_imgs;
                    box.appendChild(img);
                    img.className = 'imagen';

                })

            //fetch otros datos principal
            fetch(datos.url)
                .then((response) => response.json())
                .then((dimgs) => {

                    const name = document.createElement('h2');
                    name.textContent = dimgs.id + ". " + dimgs.name;
                    box.appendChild(name);
                    name.className = 'name';

                    const tipo = document.createElement('div')
                    tipo.className = 'tipo_cont_pk'
                    box.appendChild(tipo)

                    const type_a1 = dimgs.types
                    const ttl_li = document.createElement('p')
                    ttl_li.textContent = 'Type:'
                    tipo.appendChild(ttl_li);

                    type_a1.forEach(a1 => {
                        let type = a1.type.name;

                        const dt_type = document.createElement('li');
                        dt_type.textContent = type
                        tipo.appendChild(dt_type);

                    });
                })

            box.addEventListener("click", () => {
                fondo.style.display = 'block'
                detalles.style.display = 'flex'

                fetch(datos.url)
                    .then((response) => response.json())
                    .then((dimgs) => {
                        console.log(dimgs)
                        const dt_imgs1 = dimgs.sprites.front_default
                        const dt_imgs2 = dimgs.sprites.back_default

                        const imagenes = document.createElement('div')
                        imagenes.className = "img_cont"
                        detalles.appendChild(imagenes)

                        const img1 = document.createElement('img');
                        img1.src = dt_imgs1;
                        imagenes.appendChild(img1);
                        img1.className = 'imagen1';

                        const img2 = document.createElement('img');
                        img2.src = dt_imgs2;
                        imagenes.appendChild(img2);
                        img2.className = 'imagen1';
                    })

                const name = document.createElement('h2');
                name.textContent = datos.name;
                detalles.appendChild(name);
                name.className = 'name';

                fetch(datos.url)
                    .then((response) => response.json())
                    .then((dimgs) => {

                        //cont_pkenedor para la info
                        const info = document.createElement('div')
                        info.className = 'info_cont'
                        detalles.appendChild(info)

                        //cont_pkenedor tipo
                        const tipo = document.createElement('div')
                        tipo.className = 'tipo_cont_pk'
                        info.appendChild(tipo)

                        const type_a1 = dimgs.types
                        const ttl_li = document.createElement('p')
                        ttl_li.textContent = 'Type:'
                        tipo.appendChild(ttl_li);

                        type_a1.forEach(a1 => {
                            let type = a1.type.name;

                            const dt_type = document.createElement('li');
                            dt_type.textContent = type
                            tipo.appendChild(dt_type);

                        });

                        //cont_pkenedor height
                        const height = document.createElement('div')
                        height.className = 'height_cont_pk'
                        info.appendChild(height)

                        const ttl_hg = document.createElement('p')
                        ttl_hg.textContent = 'Height:'
                        height.appendChild(ttl_hg);

                        const dt_height = document.createElement('li');
                        dt_height.textContent = dimgs.height
                        height.appendChild(dt_height);

                        //contenedor weight
                        const weight = document.createElement('div')
                        weight.className = 'weight_cont_pk'
                        info.appendChild(weight)

                        const ttl_wg = document.createElement('p')
                        ttl_wg.textContent = 'Weight:'
                        weight.appendChild(ttl_wg);

                        const dt_weight = document.createElement('li');
                        dt_weight.textContent = dimgs.weight
                        weight.appendChild(dt_weight);

                        //contenedor Base experience
                        const b_exp = document.createElement('div')
                        b_exp.className = 'b_exp'
                        info.appendChild(b_exp)

                        const ttl_bxp = document.createElement('p')
                        ttl_bxp.textContent = 'Base Experience:'
                        b_exp.appendChild(ttl_bxp);

                        const dt_bxp = document.createElement('li');
                        dt_bxp.textContent = dimgs.base_experience
                        b_exp.appendChild(dt_bxp);
                    })
            })

            fondo.addEventListener("click", () => {
                fondo.style.display = 'none'
                detalles.style.display = 'none'

                detalles.innerHTML = "";
            })
        })
    })

}

document.addEventListener("DOMContentLoaded",()=>{
    let apip = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=5"
    cargarApi(apip);
})

f_sgt.addEventListener("click", () => {
    vi_of += 5
    apip = "https://pokeapi.co/api/v2/pokemon?offset=" + vi_of + "&limit=" + vi_lmt;

    console.log(vi_of)

    cont_pk.innerHTML = "";

    cargarApi(apip)
})

f_ant.addEventListener("click", () => {
    vi_of -= 5
    if (vi_of < 0) {
        vi_of = 0
        return
    }
    apip = "https://pokeapi.co/api/v2/pokemon?offset=" + vi_of + "&limit=" + vi_lmt;

    console.log(vi_of)
    console.log(apip)

    cont_pk.innerHTML = "";

    cargarApi(apip)
})
