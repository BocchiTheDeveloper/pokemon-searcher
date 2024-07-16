document.getElementById('searchButton').addEventListener('click', function() {
    let pokemonInput = document.getElementById('pokemonInput').value.toLowerCase();
    const pokemonInfo = document.getElementById('pokemonInfo');

    if (pokemonInput) {
        if (pokemonInput === "nidoran") {
            pokemonInput = "nidoran-f";
        } else if (pokemonInput === "mr. mime" || pokemonInput === "mr mime") {
            pokemonInput = "mr-mime";
        }

        fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonInput}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('No Pokémon found');
                }
                return response.json();
            })
            .then(data => {
                pokemonInfo.innerHTML = `
                    <img src="${data.sprites.front_default}" alt="${data.name}">
                    <h2>${data.name}</h2>
                    <p>ID: ${data.id}</p>
                    <p>Height: ${data.height}</p>
                    <p>Weight: ${data.weight}</p>
                    <p>Type: ${data.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
                `;
            })
            .catch(error => {
                pokemonInfo.innerHTML = `<p>${error.message}</p>`;
            });
    } else {
        pokemonInfo.innerHTML = `<p>Please enter a Pokémon name or ID.</p>`;
    }
});
