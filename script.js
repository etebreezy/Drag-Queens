// Pseudo Code:
// On page load, make an API call to display queens the first season 
// user chooses a season from the dropdown
// make a request to the API to get the ueen for a given season
// display the queens for each season
// create name spacing object


const app = {};

// This would make our API call
app.getQueens = (seasonNumber) => {
    // use Ajax to reach out to an API
    $.ajax({
        url: `https://www.nokeynoshade.party/api/seasons/${seasonNumber}/queens`,
        method: 'GET',
        dataType: 'json',

        // after the API request is done then we will:
    }).then((response) => {
        // the instructions to be run once the API has been returned to me
        // console.log(response);
        app.displayQueens(response);
    })
}

// Display an array of objects on the page
app.displayQueens = (queens) => {
    // console.log(queens);

    // get rid of all the current shown queens:
    $('.queen-container').empty();
    // loop over the queen array:
    queens.forEach((queen) => {
        // console.log(queen);
        let imageSource = '';
        if (queen.image_url && queen.name !== 'Katya Zamolodchikova') {
            imageSource = queen.image_url;
        } else {
            imageSource = 'https://www.flare.com/wp-content/uploads/2020/05/TVMOVIES_DragRace.jpg';
        }

        // build HTML for each queen from our array
        const htmlToAppend = `
        <div class='queen-card'>
            <h3>${queen.name}<h3>
            <div class='image-container'> 
                <img class='queen-image' src=${imageSource} alt='${queen.name}' />
            </div>
            <h4>Season: ${queen.seasons[0].seasonNumber} </h4>
        </div> 
            `
        // put it on the page
        $('.queen-container').append(htmlToAppend);
        // console.log(htmlToAppend)
    })
}

// start here method

app.init = () => {
    // console.log('init')

    // make our API call on the page load:
    app.getQueens('1');
    $('select').on('change', function() {
        console.log('selected')
        const selected = $('option:selected').val();
        app.getQueens(selected);
    })
}

$(document).ready(() => {
    app.init();
});



