document.addEventListener("DOMContentLoaded", function () {
    const galleryButtons = document.querySelectorAll(".gallery-button");
    const galleryMediaItems = document.querySelectorAll(".gallery-media-item");
    const galleryText = document.getElementById("galleryText");
    const readMoreButton = document.getElementById("readMoreButton");
  
    let currentIndex = -1; // Initialize to an invalid index
    let isFullDescription = false;
  
    let fullDescriptions = [
      "Sailing has been an integral part of my life for the last 4 years. My sailing journey began in small dinghies at Shoreline Lake during a summer camp. However, I instantly fell in love with it: now, I’m in a high school sailing club in Redwood Shores with sailors from many different schools (including a Nueva sophomore, Max) where I get to sail Olympic-class International FJ’s. What’s not to love?",
      "Coding has shaped me in so many ways during the last five years. I began learning to code in Python, and since then I’ve come a long way. I now do competitive programming in Python (USACO) and Web Development using HTML, CSS, and JavaScript, the very coding languages that were put to work to make this website!",
      "One thing few people know about me, and almost nobody expects from me, is that I can speak Mandarin. I chose to learn Mandarin because it allows me to tap into one of the world's fastest-growing economies, opening up vast opportunities in business and career. Additionally, mastering Mandarin enhances my cultural competence, fostering stronger connections with a global community and providing a valuable skill in an increasingly interconnected world.",
      "I joined MVLA Service League of Boys (SLOBs) where I made and packed 50 sandwiches for malnourished people in and around Los Altos Hills. It was hours of work, but a fulfilling experience, knowing that I am able to help those less fortunate around me. It’s easy to forget the privileges we enjoy here, so it’s important that we maintain a sense of gratitude and giving in our lives.",
      "Music is how I de-stress. It’s creative and uses different parts of the mind and body than the rest of my day. It is also a very social activity - I get to play with my friends during our chamber ensemble at school. My favorite instrument, by far, is the piano, but I can also play the Alto Saxophone. I’ve been playing the piano for years, including at the Stanford jazz summer workshop."
    ];
  
    let shortDescriptions = [
      "Me rigging up a boat to sail (not yet wearing gear)...",
      "Me playing the beginning of Bach's Invention No. 13 in A minor - my favorite classical piece.",
      "Me before dropping off 50 PB&J's for distribution to the malnourished as a part of MVLA SLOBs",
      "My Mandarin Essay Contest submission. Results coming in late January!",
      "I regularly teach my brother coding - this time we recorded our first practice problem: FizzBuzz in JavaScript!"
    ];
  
    // Attach click event listeners to buttons
    galleryButtons.forEach((button, index) => {
      button.addEventListener("click", () => showMedia(index));
    });
  
    // Show media item and update description based on button click
    function showMedia(index) {
      currentIndex = index;
      updateDescription();
      showMediaItem();
    }
  
    // Update description content
    function updateDescription() {
      const shortDescription = `Description for Media ${currentIndex + 1}:\n${shortDescriptions[currentIndex]}`;
      const fullDescription = `Extended description for Media ${currentIndex + 1}:\n${fullDescriptions[currentIndex]}`;
  
      galleryText.textContent = isFullDescription ? fullDescription : shortDescription;
      readMoreButton.textContent = isFullDescription ? "Read Less" : "Read More...";
    }
  
    // Toggle between short and full descriptions
    readMoreButton.addEventListener("click", toggleDescription);
  
    function toggleDescription() {
      isFullDescription = !isFullDescription;
      updateDescription();
    }
  
    // Show the selected media item
    function showMediaItem() {
      // Hide all media items
      galleryMediaItems.forEach(item => item.style.display = 'none');
  
      const selectedMediaItem = galleryMediaItems[currentIndex];
  
      // Show the selected media item
      if (selectedMediaItem) {
        selectedMediaItem.style.display = 'block';
        scaleImage(); // Call the scaleImage function after updating the image source
      }
    }
  
    // Function to scale the image
    function scaleImage() {
      const selectedImage = document.getElementById("selectedImage");
      const imageContainer = document.querySelector(".image-container");
  
      if (selectedImage && imageContainer) {
        const scale = imageContainer.offsetWidth / selectedImage.naturalWidth;
        selectedImage.style.transform = `scale(${scale})`;
      }
    }
  
    // Initialize gallery on load
    updateDescription();
  });
  