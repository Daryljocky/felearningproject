const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')
const container = document.querySelector('.container')

populateUI();

let ticketPrice = +movieSelect.value;

function setMoiveData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

}

function populateUI() {

    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0 ) {
        seats.forEach(
            (seat, index) => {
                if (selectedSeats.indexOf(index) > -1 ) {
                    seat.classList.add('selected');
                }
            }
        );
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}




// Movie select event
movieSelect.addEventListener(
    'change',
    e => {
        ticketPrice = +e.target.value;
        setMoiveData(e.target.selectedIndex, e.target.value)
    }

);