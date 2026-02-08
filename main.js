window.addEventListener("DOMContentLoaded", () => {

    gsap.registerPlugin(ScrollTrigger);

    const header = document.querySelector("header");

    // function to toggle mobile nav 
    const toggleMobileNav = () => {
        document.getElementById("mobileMenu").classList.toggle("show");
    }

    window.toggleMobileNav = toggleMobileNav;

    const runInitialAnimations = () => {
        const onLoadTl = gsap.timeline({ defaults: { ease: "power.out" } });

        onLoadTl
        // animate header border with exxpansion
        .to(
            "header",
            {
                "--border-width": "100%",
                duration: 3,
            },
            // third augument- position parameter(starting all animations at the same time)
            0
        )
        // slide nav and sidebar items
        .from(
            "desktop-nav a, .social-sidebar a",
            {
                y: -100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
            },
            0
        )
        // animate sidebar border
        .to(
            ".social-sidebar",
            {
                "--border-height": "100%",
                duration: 10,
            }, 
            0
        )
        // fade in the hero heading
        .to(
            ".hero-content h1",
            {
                delay: 0.5,
                duration: 1.2,
                color: "var(--sienna)",
                "-webkit-text-stroke": "0px var(--sienna)",
            },
            0
        )
        // slide in each line of the heading from the right 
        .from(
            ".hero-content .line",
            {
                x: 100,
                delay: 1,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
            },
            0
        )
        // reveal the bottle wrapper
        .to(
            "hero-bottle-wrapper",
            {
                opacity: 1,
                scale: 1,
                delay: 1.5,
                duration: 1.3,
                ease: "power3.out",
            },
            0
        )
        // pop-in stamp image
        .to(
            "hero-stamp",
            {
                opacity: 1,
                scale: 1,
                delay: 2,
                duration: 0.2,
                ease: "back.out(3)",
            },
            0
        )
        // bounce effect for the stamp
        .to(
            ".hero-stamp",
            {
                y: "+=5",
                x: "-=3",
                repeat: 2,
                yoyo: true,
                duration: 0.05,
                ease: "power1.inOut"
            },
            0
        )
    }

    runInitialAnimations()
});