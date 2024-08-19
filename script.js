window.onload = function () {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingNumber = document.getElementById('loading-number');
    const websiteNameScreen = document.getElementById('website-name-screen');
    const welcomeScreen = document.getElementById('welcome-screen');
    const websiteContent = document.getElementById('website-content');

    let loadCounter = 0;
    let filesFullyLoaded = false;
    let counterFinished = false;

    // Function to start loading counter animation
    function loadingCounter() {
        const counterInterval = setInterval(() => {
            if (loadCounter < 100) {
                loadCounter += 1; 
                loadingNumber.textContent = `${loadCounter}%`;

                // Check if counter has finished and files are loaded
                if (loadCounter === 100) {
                    counterFinished = true;
                    clearInterval(counterInterval);

                    if (filesFullyLoaded) {
                        // Show the second screen after a short delay
                        setTimeout(showSecondScreen, 1000);
                    }
                }
            }
        }, 50); // Animation speed of the loading counter
    }

    // Function to check if all files (CSS, images, etc.) are loaded
    function checkFilesLoaded() {
        const images = document.images;
        const totalImages = images.length;
        let imagesLoaded = 0;

        if (totalImages === 0) {
            filesFullyLoaded = true;
        }

        for (let i = 0; i < totalImages; i++) {
            if (images[i].complete) {
                imagesLoaded++;
            } else {
                images[i].addEventListener('load', () => {
                    imagesLoaded++;
                    if (imagesLoaded === totalImages) {
                        filesFullyLoaded = true;
                        if (counterFinished) {
                            setTimeout(showSecondScreen, 1000);
                        }
                    }
                });
                images[i].addEventListener('error', () => {
                    imagesLoaded++;
                    if (imagesLoaded === totalImages) {
                        filesFullyLoaded = true;
                        if (counterFinished) {
                            setTimeout(showSecondScreen, 1000);
                        }
                    }
                });
            }
        }

        // Check if all resources are loaded
        if (document.readyState === 'complete' && imagesLoaded === totalImages) {
            filesFullyLoaded = true;
            if (counterFinished) {
                setTimeout(showSecondScreen, 1000);
            }
        }
    }

    // Function to show the second screen (Website Name)
    function showSecondScreen() {
        gsap.to(loadingScreen, { opacity: 0, duration: 1, onComplete: () => loadingScreen.classList.add('hidden') });
        gsap.fromTo(websiteNameScreen, { opacity: 0 }, { opacity: 1, duration: 1, onStart: () => websiteNameScreen.classList.remove('hidden') });

        const tl = gsap.timeline();
        tl.to(websiteNameScreen, { opacity: 0, duration: 1, delay: 2 })
          .to(welcomeScreen, { opacity: 1, duration: 1, onStart: () => welcomeScreen.classList.remove('hidden') })
          .to(welcomeScreen, { opacity: 0, duration: 1, delay: 2 })
          .to(websiteNameScreen, { opacity: 1, duration: 1, onStart: () => websiteNameScreen.classList.remove('hidden') })
          .to(websiteNameScreen, { opacity: 0, duration: 1, delay: 2, onComplete: showWebsiteContent });
    }

    // Function to reveal the actual website content
    function showWebsiteContent() {
        gsap.to(websiteNameScreen, { display: 'none', duration: 0 });
        gsap.to(websiteContent, { display: 'block', opacity: 1, duration: 1, onStart: () => {
            websiteContent.classList.remove('hidden');
            websiteContent.style.display = 'block';
        }});
    }

    // Start the loading counter
    loadingCounter();

    // Begin checking if all files have loaded
    checkFilesLoaded();
};
