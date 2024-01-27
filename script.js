document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('playBtn');
  const genreContainer = document.getElementById('genres');
  const name3 = document.getElementById('container');
 
  const button2=document.getElementById('fav');
  let selectedGenreId; // Variable to store the selected genre ID
let newfav=[]
  genreContainer.addEventListener('click', async function () {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=2a1701d9cf8f6dda53b573498c552d05`;
    const response = await fetch(url);
    const data = await response.json();
    displaydeets(data.genres);
  });

  function displaydeets(genres) {
    genres.forEach(element => {
      const option = document.createElement('option');
      option.value = element.id;
      option.textContent = element.name;
      genreContainer.appendChild(option);
      

    });
  }

  

  button.addEventListener('click', async function () {
   const text =genreContainer.value
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=2a1701d9cf8f6dda53b573498c552d05&with_genres=${text}`;
    const response = await fetch(url);
    const data = await response.json();
    displaydets(data);
  });

  function displaydets(b) {
    const movies = b.results;

    let final = '';

    movies.forEach(movie => {
     final+=` <div class="movieInfo" style="display: flex; flex-direction: row; width: 80%; margin-left: 130px; margin-bottom: 30px; margin-top: 30px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); background-color: #110437; padding: 20px; position: relative;">
  <div class="favv" style="position: absolute; top: 3;right:10px; ">
    <i class="fas fa-heart" style="color:white"; ></i>
  </div>
  <div class="moviePoster">
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" style="width: 200px; height: 300px; box-shadow: 0 2px 4px pink;">
  </div>
  <div class="movieText" style="padding: 10px; font-size: bolder; margin: 30px;">
    <p style="font-size: 40px; font-weight: bold;">${movie.title}</p>
    <p>About: ${movie.overview}</p>
    <p style="color: red;">Release Date: ${movie.release_date}</p>
  </div>
</div>`


    });
    newfav.push(final);

    name3.innerHTML = final;
    name3.style.display = 'block';
    
    const heartIcons = document.querySelectorAll('.favv i');
    heartIcons.forEach((icon,index) => {
      icon.addEventListener('click', function () {
        toggleHeartColor(icon,movies[index]);
        
      });
    });
    
    function toggleHeartColor(icon, movie) {
      // Check if the color is set or not
      const currentColor = getComputedStyle(icon).color;
      const ic = movie;
      if (currentColor === 'rgb(255, 255, 255)') {
        icon.style.color = 'red';
        addtofav(ic);
      } else {
        icon.style.color = 'rgb(255, 255, 255)';
        removefromfav(ic);
      }
    }
    
   
      function removefromfav(ic) {
        // Find the index of the movie in the newfav array
        const indexToRemove = newfav.findIndex(movie => movie.id === ic.id);
      
        // If the movie is found, remove it from the array
        if (indexToRemove !== -1) {
          newfav.splice(indexToRemove, 1);
      
          // Update the display of favorite movies
          updateFavoriteDisplay();
        }
      }
      
      function updateFavoriteDisplay() {
        const favdiv = document.getElementById('favvv');
        favdiv.innerHTML = ''; // Clear the existing content
      
        newfav.forEach(movie => {
          const final = `<div class="movieInfo" style="display: flex; flex-direction: row; width: 80%; margin-left: 130px; margin-bottom: 30px; margin-top: 30px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); background-color: #110437; padding: 20px; position: relative;">
            <div class="favv" style="position: absolute; top: 3;right:10px; ">
              <i class="fas fa-heart" style="color:white"; ></i>
            </div>
            <div class="moviePoster">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" style="width: 200px; height: 300px; box-shadow: 0 2px 4px pink;">
            </div>
            <div class="movieText" style="padding: 10px; font-size: bolder; margin: 30px;">
              <p style="font-size: 40px; font-weight: bold;">${movie.title}</p>
              <p>About: ${movie.overview}</p>
              <p style="color: red;">Release Date: ${movie.release_date}</p>
            </div>
          </div>`;
      
          favdiv.insertAdjacentHTML('beforeend', final);
        });
      
        favdiv.style.display = newfav.length > 0 ? 'block' : 'none';
      }
    }
    const favdiv=document.getElementById('favvv');

    function addtofav(ic)
    {
      
       final=` <div class="movieInfo" style="display: flex; flex-direction: row; width: 80%; margin-left: 130px; margin-bottom: 30px; margin-top: 30px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); background-color: #110437; padding: 20px; position: relative;">
       <div class="favv" style="position: absolute; top: 3;right:10px; ">
         <i class="fas fa-heart" style="color:white"; ></i>
       </div>
       <div class="moviePoster">
         <img src="https://image.tmdb.org/t/p/w500${ic.poster_path}" style="width: 200px; height: 300px; box-shadow: 0 2px 4px pink;">
       </div>
       <div class="movieText" style="padding: 10px; font-size: bolder; margin: 30px;">
         <p style="font-size: 40px; font-weight: bold;">${ic.title}</p>
         <p>About: ${ic.overview}</p>
         <p style="color: red;">Release Date: ${ic.release_date}</p>
       </div>
     </div>`  
     favdiv.insertAdjacentHTML('beforeend', final);
favdiv.style.display = 'block';

    }

    button2.addEventListener('click',function()
    {
      name3.style.display='none';
     
    })
    button.addEventListener('click',function()
    {
      favdiv.style.display='none';
    
    })
      });    
