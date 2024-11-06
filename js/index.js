// Initialize AOS
AOS.init({
    offset: 200,  // Increased offset for better trigger
    delay: 100,   // Add delay for smoother animations
    duration: 600 // Longer duration for smooth effects
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

// Define cursor positions
let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

// Set the speed of the cursor follower
const followerSpeed = 0.25;  // Slightly faster, so it follows more smoothly

// Mouse move listener
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Update cursor position using requestAnimationFrame for smoother animation
function updateCursor() {
    // Update main cursor position directly
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';

    // Smooth movement of the follower cursor
    // Adjust the movement rate to make the follower move faster but still smooth
    followerX += (mouseX - followerX) * followerSpeed;
    followerY += (mouseY - followerY) * followerSpeed;

    // Update the follower cursor position
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';

    // Recursively call for smooth updates
    requestAnimationFrame(updateCursor);
}

updateCursor(); // Initial call to start animation loop

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// WebGL Background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#webgl-background'),
    alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Create particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 5000;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: '#2A3FFB'
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

camera.position.z = 3;

// Animation
const animate = () => {
    requestAnimationFrame(animate);
    particlesMesh.rotation.y += 0.001;
    renderer.render(scene, camera);
}

animate();

// Resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// GSAP Animations
gsap.from('.hero-title', {
    duration: 1,
    y: 30,
    opacity: 0,
    delay: 0.5
});

gsap.from('.hero-subtitle', {
    duration: 1,
    y: 30,
    opacity: 0,
    delay: 0.8
});

gsap.from('.hero-cta', {
    duration: 1,
    y: 30,
    opacity: 0,
    delay: 1.1
});

gsap.from('.portfolio-item', {
    duration: 1.5,
    opacity: 0,
    y: 50,
    stagger: 0.2
});


// Stats Counter Animation
const stats = document.querySelectorAll('.stat-number');
stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    const increment = target / 200;

    function updateCount() {
        const count = parseInt(stat.innerText);
        if (count < target) {
            stat.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 10);
        } else {
            stat.innerText = target;
        }
    }

    updateCount();
});

const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            // Reset the item's styles for smooth transition
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';

            // Show all items when 'All' is selected
            if (filterValue === 'all') {
                item.classList.remove('hidden');
            } else {
                // Hide items that do not match the filter category
                if (!item.classList.contains(filterValue)) {
                    item.classList.add('hidden');
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                } else {
                    item.classList.remove('hidden');
                }
            }
        });
    });
});


if (window.innerWidth <= 768) {
    document.body.classList.add('no-cursor');
}
