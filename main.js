document.addEventListener('DOMContentLoaded', () => {
    const stack = document.querySelector('.stack');
    const originalImages = Array.from(stack.children); // Get the initial images
    const cloneLimit = 50; // Maximum clones to prevent excessive growth

    // Function to clone images
    const cloneImages = () => {
        originalImages.forEach(image => {
            const clone = image.cloneNode(true); // Clone the image
            stack.appendChild(clone); // Append the clone to the stack
        });
    };

    // Initialize by cloning images
    cloneImages();

    // Intersection Observer to detect when images are out of view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                // Clone new images when one goes out of view
                cloneImages();

                // Optional: Limit the number of images in the stack
                if (stack.children.length > cloneLimit) {
                    stack.removeChild(stack.firstChild); // Remove the oldest image
                }
            }
        });
    });

    // Observe each image in the stack
    originalImages.forEach(image => observer.observe(image));
});
