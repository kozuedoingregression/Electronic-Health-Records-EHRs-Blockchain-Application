   setTimeout(function () {
        document.querySelector(".key").classList.add("blue");
    }, 1000);

    document.getElementById('loginbutton').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default behavior
    console.log("Button clicked");
    // Get the input value
    var inputValue = document.getElementById('keyvalue').value;

    // Encode the value to ensure it's passed correctly in the URL
    var encodedValue = encodeURIComponent(inputValue);

    // Redirect to a new page with the input value as a query parameter
    window.location.href = 'records.html?value=' + encodedValue;
    // Your button click logic goes here
});
