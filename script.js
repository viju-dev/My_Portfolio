//image slider functionality

document.addEventListener("DOMContentLoaded", function () {
    // Get all galleries
    var galleries = document.querySelectorAll('.gallery');

    // Iterate over each gallery and add the slider functionality
    galleries.forEach(function (gallery) {
        var currentIndex = 0;

        // Get all images in the gallery
        var images = gallery.querySelectorAll('img');

        // Function to show the current image
        function showImage(index) {
            images.forEach(function (image, i) {
                if (i === index) {
                    image.style.display = 'block';
                } else {
                    image.style.display = 'none';
                }
            });
        }

        // Showing the initial image
        showImage(currentIndex);

        // Event listener for onClick
        gallery.addEventListener('click', function () {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        });

        
    });
});


//toggle the menu and change the icon functionality
var mobileMenu = document.getElementById("mobile-menu");

mobileMenu.addEventListener("click", function() {
    var nav = document.querySelector(".main-nav");
    nav.classList.toggle("open");

    // Toggle the icon between hamburger and cross
    var bars = document.querySelectorAll(".bar");
    bars.forEach(function(bar) {
        bar.classList.toggle("bar-cross");
    });
});



// to trigger the download using the Google Drive API
 document.getElementById("download-resume").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default behavior of the link

    // fileId contains the actual file ID from your Google Drive
    var fileID = '';
    var downloadLink = 'https://drive.google.com/uc?export=download&id=1Dl5lGz-SlaE2A8V47t_dGl8GtPt8QuBF';
    // var downloadLink = 'https://drive.google.com/uc?id=' + fileID;

     var link = document.createElement('a');
     link.href = downloadLink;
     link.target = '_blank'; // Open in a new tab
 
     // Simulate a click to trigger the download
     link.click();
}); 


// contact-from submission functionality
    document.getElementById("contact-form").addEventListener("submit", function (event) {
        event.preventDefault();

        // Get form data
        var formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value
        };

        // Send data to Google Apps Script
        //https://forums.appgyver.com/t/connection-to-google-appscript/10344/2
        //https://stackoverflow.com/questions/53433938/how-do-i-allow-a-cors-requests-in-my-google-script
        fetch('https://script.google.com/macros/s/AKfycbx7O3m2xwvjOQSoFzlXGFxDEC0GzFqTYCmr7bk1ypCvk9fQef6HYBui8tqWfsA4f_BInw/exec', {
            redirect: "follow",
            //. When you make a request using fetch, and the server responds with a redirect (e.g., HTTP status code 301 or 302), the browser, by default, does not automatically follow the redirect for cross-origin requests due to security considerations.
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
                //Changing the Content-Type header to 'text/plain;charset=utf-8' can sometimes help bypass certain CORS restrictions. This content type is considered less sensitive and is often allowed in cross-origin requests.
                //When dealing with CORS issues, experimenting with different content types, headers, or using a simple content type like 'text/plain' can sometimes be a viable workaround.
                //However, keep in mind that the actual content type you use should align with the data you're sending and the expectations of the server (in this case, your Google Apps Script). It's good practice to ensure that the content type accurately reflects the nature of the data being sent.
            },
            body: JSON.stringify(formData)
        })  
        .then(response =>{
            // response.text();
            // USVString (DOMString) or USVString (text)
            response.json()
            console.log(response)
            if(response.status==200){
                document.getElementById("contact-form").reset(); 
            }
        } )
        .then(data => {
            // Handling the response if needed
            // console.log(data);
            
        })
        .catch(error => {
            // Handling errors
            console.error('Error:', error);
           
        });
        
    });
    //  Send data to Google Apps Script through the proxy server like https://cors-anywhere.herokuapp.com


