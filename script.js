async function getJoke() {
    const jokeDisplay = document.getElementById('jokeDisplay');
    const jokeButton = document.getElementById('jokeButton');
    
    jokeDisplay.textContent = 'Loading...';
    jokeButton.disabled = true;

    try {
        // Fetch from JokeAPI (https://jokeapi.dev/)
        const response = await fetch('https://v2.jokeapi.dev/joke/Any');
        
        if (!response.ok) {
            throw new Error('Failed to fetch joke');
        }

        const data = await response.json();

        // Display joke
        if (data.type === 'single') {
            jokeDisplay.textContent = data.joke;
        } else if (data.type === 'twopart') {
            jokeDisplay.textContent = `${data.setup}\n\n${data.delivery}`;
        }

    } catch (error) {
        console.error('Error:', error);
        jokeDisplay.textContent = '❌ Oops! Failed to load a joke. Please try again!';
    } finally {
        jokeButton.disabled = false;
    }
}

// Get joke button reference
document.getElementById('jokeButton').addEventListener('click', getJoke);

// Load a joke on page load
window.addEventListener('load', getJoke);